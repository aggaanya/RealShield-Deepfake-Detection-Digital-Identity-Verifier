package com.realshield.platform.controller.verify;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.verify.VerifyResultDTO;
import com.realshield.platform.service.verify.VerifyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/verify")
public class VerifyController {

    private final VerifyService verifyService;

    public VerifyController(VerifyService verifyService) {
        this.verifyService = verifyService;
    }

    // 🛡 SOURCE VERIFICATION
    @PostMapping(
            value = "/source",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<VerifyResultDTO>> verifySource(
            @RequestPart("file") MultipartFile file,
            HttpServletRequest request
    ) {
        VerifyResultDTO result = verifyService.verifySource(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Source verification completed",
                        result,
                        request.getRequestURI()
                )
        );
    }

    // 🧾 METADATA ANALYSIS
    @PostMapping(
            value = "/metadata",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<VerifyResultDTO>> verifyMetadata(
            @RequestPart("file") MultipartFile file,
            HttpServletRequest request
    ) {
        VerifyResultDTO result = verifyService.verifyMetadata(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Metadata analysis completed",
                        result,
                        request.getRequestURI()
                )
        );
    }

    // 🔐 DIGITAL SIGNATURE VERIFICATION
    @PostMapping(
            value = "/signature",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<VerifyResultDTO>> verifySignature(
            @RequestPart("file") MultipartFile file,
            HttpServletRequest request
    ) {
        VerifyResultDTO result = verifyService.verifySignature(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Digital signature verification completed",
                        result,
                        request.getRequestURI()
                )
        );
    }
}
