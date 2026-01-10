package com.realshield.platform.dto.admin;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminForceResetPasswordRequestDTO {

    @NotBlank
    @Size(min = 8, message = "password must be at least 8 characters")
    private String newPassword;
}
