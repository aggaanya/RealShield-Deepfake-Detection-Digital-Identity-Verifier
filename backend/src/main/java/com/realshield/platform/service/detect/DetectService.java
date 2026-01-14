package com.realshield.platform.service.detect;
import org.springframework.web.multipart.MultipartFile;
import com.realshield.platform.dto.detect.DetectResultDTO;

public interface DetectService {

    //detecting the image files only
    DetectResultDTO detectImage(MultipartFile file);

    //Detect deepfake in VIDEO files only
    DetectResultDTO detectVideo(MultipartFile file);

    //Detect deepfake in AUDIO files only
    DetectResultDTO detectAudio(MultipartFile file);
}
