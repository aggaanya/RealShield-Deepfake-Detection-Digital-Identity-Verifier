package com.realshield.platform.service.verify;


import com.realshield.platform.dto.verify.VerifyResultDTO;
import org.springframework.web.multipart.MultipartFile;

public interface VerifyService {

    VerifyResultDTO verifySource(MultipartFile file);

    VerifyResultDTO verifySignature(MultipartFile file);

    VerifyResultDTO verifyMetadata(MultipartFile file);
}
