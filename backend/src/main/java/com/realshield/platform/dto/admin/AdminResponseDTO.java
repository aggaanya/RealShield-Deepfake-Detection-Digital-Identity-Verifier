package com.realshield.platform.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminResponseDTO {
    private Long id;
    private String name;
    private String email;
    private boolean active;
    private boolean emailVerified;
}
