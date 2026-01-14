package com.realshield.platform.controller.analyze;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.analyze.AnalyzeResultDTO;
import com.realshield.platform.dto.detect.DetectResultDTO;
import com.realshield.platform.dto.verify.VerifyResultDTO;
import com.realshield.platform.model.MediaAnalysis;
import com.realshield.platform.repository.MediaAnalysisRepository;
import com.realshield.platform.service.detect.DetectService;
import com.realshield.platform.service.verify.VerifyService;
import com.realshield.platform.utils.FileHashUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/analyze")
public class AnalyzeController {

    private final DetectService detectService;
    private final VerifyService verifyService;
    private final MediaAnalysisRepository mediaAnalysisRepository;

    public AnalyzeController(DetectService detectService, VerifyService verifyService, MediaAnalysisRepository mediaAnalysisRepository) {
        this.detectService = detectService;
        this.verifyService = verifyService;
        this.mediaAnalysisRepository = mediaAnalysisRepository;
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AnalyzeResultDTO>> analyzeImage(@RequestPart("file") MultipartFile file, HttpServletRequest request) {

        //Detect
        DetectResultDTO detectResult = detectService.detectImage(file);

        //If FAKE → save & return
        if ("FAKE".equalsIgnoreCase(detectResult.getResult())) {

            MediaAnalysis analysis = MediaAnalysis.builder()
                    .fileName(file.getOriginalFilename())
                    .fileHash(FileHashUtil.generateSHA256(file))
                    .detectResult(detectResult.getResult())
                    .detectConfidence(detectResult.getConfidence())
                    .createdAt(LocalDateTime.now())
                    .build();

            mediaAnalysisRepository.save(analysis);

            return ResponseEntity.ok(
                    ApiResponse.success(
                            "Image detected as FAKE. Verification skipped.",
                            new AnalyzeResultDTO(detectResult, null),
                            request.getRequestURI()
                    )
            );
        }

        //If REAL → verify
        VerifyResultDTO verifyResult = verifyService.verifySource(file);

        //Save REAL + VERIFIED result
        MediaAnalysis analysis = MediaAnalysis.builder()
                .fileName(file.getOriginalFilename())
                .fileHash(FileHashUtil.generateSHA256(file))
                .detectResult(detectResult.getResult())
                .detectConfidence(detectResult.getConfidence())
                .verifyType(verifyResult.getVerificationType())
                .verifyStatus(verifyResult.getStatus())
                .verifyDetails(verifyResult.getDetails())
                .createdAt(LocalDateTime.now())
                .build();

        mediaAnalysisRepository.save(analysis);

        //Return response
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Image analyzed, verified, and stored successfully",
                        new AnalyzeResultDTO(detectResult, verifyResult),
                        request.getRequestURI()
                )
        );
    }
}
