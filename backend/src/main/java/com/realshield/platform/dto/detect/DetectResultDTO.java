package com.realshield.platform.dto.detect;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class DetectResultDTO {

    private String fileName;
    private String mediaType; // IMAGE / VIDEO / AUDIO
    private String result;    // FAKE / REAL
    private double confidence;


}
