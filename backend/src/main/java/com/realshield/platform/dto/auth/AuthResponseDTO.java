package com.realshield.platform.dto.auth;

import com.realshield.platform.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//we can not return the api response directly do the client
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private Long id;
    private String email;
    private Role role;
    private String message;
}
