package com.realshield.platform.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetPasswordRequestDTO {

    @NotBlank
    private String token;

    @NotBlank
    @Size(min = 8, max = 30)
    private String newPassword;

    @NotBlank
    private String confirmPassword;
}
