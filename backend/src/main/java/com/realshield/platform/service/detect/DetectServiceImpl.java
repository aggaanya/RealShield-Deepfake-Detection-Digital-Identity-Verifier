package com.realshield.platform.service.detect;

import com.realshield.platform.dto.detect.DetectResultDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.realshield.platform.utils.FileValidationUtil.*;

@Service
public class DetectServiceImpl implements DetectService {

    @Override
    public DetectResultDTO detectImage(MultipartFile file) {
        validateImage(file);
        return buildResult(file, "IMAGE");
    }

    @Override
    public DetectResultDTO detectVideo(MultipartFile file) {
        validateVideo(file);
        return buildResult(file, "VIDEO");
    }

    @Override
    public DetectResultDTO detectAudio(MultipartFile file) {
        validateAudio(file);
        return buildResult(file, "AUDIO");
    }

    // 🔍 ADD DEBUG HERE
    private DetectResultDTO buildResult(MultipartFile file, String mediaType) {

        System.out.println("DEBUG: File received = " + file.getOriginalFilename());
        System.out.println("DEBUG: Content-Type = " + file.getContentType());
        System.out.println("DEBUG: MediaType = " + mediaType);

        return new DetectResultDTO(
                file.getOriginalFilename(),
                mediaType,
                "FAKE",
                91.5
        );
    }
}
