package com.realshield.platform.controller.detect;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.detect.DetectResultDTO;
import com.realshield.platform.service.detect.DetectService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/detect")
public class DetectController {

    private final DetectService detectService;

    public DetectController(DetectService detectService) {
        this.detectService = detectService;
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DetectResultDTO>> detectImage(@RequestPart("file") MultipartFile file, HttpServletRequest request) {
        DetectResultDTO result = detectService.detectImage(file);
        return ResponseEntity.ok(ApiResponse.success("Image deepfake detection completed", result, request.getRequestURI()));
    }


    @PostMapping(value = "/video", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DetectResultDTO>> detectVideo(
            @RequestPart("file") MultipartFile file,
            HttpServletRequest request
    ) {
        System.out.println("VIDEO RECEIVED: " + file.getOriginalFilename());
        System.out.println("CONTENT TYPE: " + file.getContentType());

        DetectResultDTO result = detectService.detectVideo(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Video deepfake detection completed",
                        result,
                        request.getRequestURI()
                )
        );
    }



    @PostMapping(value = "/audio", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DetectResultDTO>> detectAudio(@RequestPart("file") MultipartFile file, HttpServletRequest request) {
        DetectResultDTO result = detectService.detectAudio(file);
        return ResponseEntity.ok(ApiResponse.success("Audio deepfake detection completed", result, request.getRequestURI()));
    }

}
