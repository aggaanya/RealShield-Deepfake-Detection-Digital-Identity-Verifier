package com.realshield.platform.dto.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


//this class have only one field that's email, this is because when the client hit the api for the forget password
//than the client will send the email through this DTO get the token


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgetPasswordRequestDTO {

    @Email
    @NotBlank(message = "email is required")
    private String email;
}
