package com.realshield.platform.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AuditLogResponseDTO {

    private Long id;
    private String adminEmail;
    private String action;
    private String entityType;
    private Long entityId;
    private LocalDateTime createdAt;
}
