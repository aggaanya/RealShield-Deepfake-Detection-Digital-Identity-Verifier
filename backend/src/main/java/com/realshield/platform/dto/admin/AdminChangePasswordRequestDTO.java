package com.realshield.platform.dto.admin;


import lombok.Data;

@Data
public class AdminChangePasswordRequestDTO {
    private String email;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
