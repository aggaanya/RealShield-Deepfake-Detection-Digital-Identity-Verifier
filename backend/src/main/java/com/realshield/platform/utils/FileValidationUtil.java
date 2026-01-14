package com.realshield.platform.utils;


import com.realshield.platform.exception.InvalidFileTypeException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public class FileValidationUtil {

    private static final Set<String> IMAGE_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
    );

    private static final Set<String> VIDEO_TYPES = Set.of(
            "video/mp4",
            "video/mpeg",
            "video/quicktime"
    );

    private static final Set<String> AUDIO_TYPES = Set.of(
            "audio/mpeg",
            "audio/wav",
            "audio/x-wav"
    );

    // 🖼️ IMAGE VALIDATION
    public static void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileTypeException("Image file is missing");
        }

        String contentType = file.getContentType();

        if (contentType == null || !IMAGE_TYPES.contains(contentType)) {
            throw new InvalidFileTypeException("Only image files are allowed");
        }
    }

    // 🎥 VIDEO VALIDATION
    public static void validateVideo(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileTypeException("Video file is missing");
        }

        String contentType = file.getContentType();

        if (contentType == null || !VIDEO_TYPES.contains(contentType)) {
            throw new InvalidFileTypeException("Only video files are allowed");
        }
    }

    // 🎧 AUDIO VALIDATION
    public static void validateAudio(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileTypeException("Audio file is missing");
        }

        String contentType = file.getContentType();

        if (contentType == null || !AUDIO_TYPES.contains(contentType)) {
            throw new InvalidFileTypeException("Only audio files are allowed");
        }
    }
}
