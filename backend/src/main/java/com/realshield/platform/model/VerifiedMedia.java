package com.realshield.platform.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class VerifiedMedia {

    @Id
    @GeneratedValue
    private Long id;

    private String fileName;
    private String hash;
    private LocalDateTime verifiedAt;
}
