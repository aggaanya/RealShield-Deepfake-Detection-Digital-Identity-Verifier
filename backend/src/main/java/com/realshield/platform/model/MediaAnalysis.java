package com.realshield.platform.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(length = 64)
    private String fileHash;

    // Detect results
    private String detectResult;        // REAL / FAKE
    private Double detectConfidence;    // %

    // Verify results
    private String verifyType;          // SOURCE / METADATA / SIGNATURE
    private String verifyStatus;        // VERIFIED / WARNING / NOT VERIFIED
    private String verifyDetails;

    private LocalDateTime createdAt;
}
