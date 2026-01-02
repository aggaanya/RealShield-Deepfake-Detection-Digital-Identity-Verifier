package com.realshield.platform.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//DTO is what user sends
//entity what database stores

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDTO {

    @NotBlank(message = "name is required")
    private String name;

    @Email
    @NotBlank(message = "email is required")
    private String email;

    @Size(message = "passwords is required", min = 8, max = 20)
    @NotBlank
    private String password;

    @Size(message = "confirmed password is required", min = 6, max = 20)
    @NotBlank
    private String confirmedPassword;
}
