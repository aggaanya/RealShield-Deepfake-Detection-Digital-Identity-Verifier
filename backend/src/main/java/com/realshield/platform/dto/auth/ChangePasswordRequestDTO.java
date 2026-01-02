package com.realshield.platform.dto.auth;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequestDTO {

    @NotBlank
    private String oldPassword;

    @NotBlank(message = "enter a password")
    private String newPassword;

    @NotBlank(message = "enter a password")
    private String confirmedPassword;
}
