package com.realshield.platform.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRequestDTO {
    @Email
    @NotBlank(message = "email is required")
    private String email;

    @Size(message = "passwords is required", min = 8, max = 20)
    @NotBlank
    private String password;
}
