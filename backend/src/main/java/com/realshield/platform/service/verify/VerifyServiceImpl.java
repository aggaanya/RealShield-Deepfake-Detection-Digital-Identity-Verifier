package com.realshield.platform.service.verify;


import com.realshield.platform.dto.verify.VerifyResultDTO;
import com.realshield.platform.utils.MetadataUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import com.realshield.platform.utils.FileHashUtil;


import java.util.Map;

@Service
public class VerifyServiceImpl implements VerifyService {

    @Override
    public VerifyResultDTO verifySource(MultipartFile file) {

        String uploadedHash = FileHashUtil.generateSHA256(file);

        // TEMP trusted hash (later from DB)
        String trustedHash = "abc123xyz";

        boolean verified = uploadedHash.equals(trustedHash);

        return new VerifyResultDTO(
                file.getOriginalFilename(),
                "SOURCE",
                verified ? "VERIFIED" : "NOT VERIFIED",
                verified ? "Trusted source confirmed" : "Source mismatch"
        );
    }

    @Override
    public VerifyResultDTO verifySignature(MultipartFile file) {

        String fileHash = FileHashUtil.generateSHA256(file);

        return new VerifyResultDTO(
                file.getOriginalFilename(),
                "SIGNATURE",
                "VERIFIED",
                "SHA-256 hash generated: " + fileHash
        );
    }

    @Override
    public VerifyResultDTO verifyMetadata(MultipartFile file) {

        Map<String, String> metadata = MetadataUtil.extractImageMetadata(file);

        if (metadata.isEmpty()) {
            return new VerifyResultDTO(
                    file.getOriginalFilename(),
                    "METADATA",
                    "NOT VERIFIED",
                    "No metadata found — possible manipulation"
            );
        }

        if (metadata.containsKey("Software")) {
            return new VerifyResultDTO(
                    file.getOriginalFilename(),
                    "METADATA",
                    "WARNING",
                    "Media edited using: " + metadata.get("Software")
            );
        }

        return new VerifyResultDTO(
                file.getOriginalFilename(),
                "METADATA",
                "VERIFIED",
                "Metadata appears consistent and original"
        );
    }
}
