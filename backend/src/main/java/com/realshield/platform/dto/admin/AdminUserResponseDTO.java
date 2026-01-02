package com.realshield.platform.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private boolean active;
    private boolean emailVerified;
}
