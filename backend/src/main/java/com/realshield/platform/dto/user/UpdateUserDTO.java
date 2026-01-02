package com.realshield.platform.dto.user;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserDTO {
    private String name;
    private String phoneNumber;
    private String address;
}
