package com.realshield.platform.dto.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendEmailOtpRequestDTO {
    @Email(message = "invalid email format")
    @NotBlank(message = "email is required")
    private String email;
}
