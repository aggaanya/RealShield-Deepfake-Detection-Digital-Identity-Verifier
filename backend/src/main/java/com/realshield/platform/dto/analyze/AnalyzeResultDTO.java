package com.realshield.platform.dto.analyze;

import com.realshield.platform.dto.detect.DetectResultDTO;
import com.realshield.platform.dto.verify.VerifyResultDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalyzeResultDTO {

    private DetectResultDTO detectResult;
    private VerifyResultDTO verifyResult;
}
