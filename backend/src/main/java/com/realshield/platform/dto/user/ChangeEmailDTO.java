package com.realshield.platform.dto.user;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangeEmailDTO {
    //here are changing the email of the user, hence the user must remember his password

    private String newEmail;
    private String password;
}
