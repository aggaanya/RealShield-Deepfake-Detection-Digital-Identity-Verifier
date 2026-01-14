package com.realshield.platform.utils;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.Directory;
import com.drew.metadata.Tag;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MetadataUtil {

    public static Map<String, String> extractImageMetadata(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {

            Metadata metadata = ImageMetadataReader.readMetadata(inputStream);
            Map<String, String> data = new HashMap<>();

            for (Directory directory : metadata.getDirectories()) {
                for (Tag tag : directory.getTags()) {
                    data.put(tag.getTagName(), tag.getDescription());
                }
            }
            return data;

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract metadata");
        }
    }
}
