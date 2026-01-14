package com.realshield.platform.dto.verify;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyResultDTO {

    private String fileName;
    private String verificationType; // SOURCE / METADATA / SIGNATURE
    private String status;           // VERIFIED / NOT VERIFIED
    private String details;          // explanation
}
