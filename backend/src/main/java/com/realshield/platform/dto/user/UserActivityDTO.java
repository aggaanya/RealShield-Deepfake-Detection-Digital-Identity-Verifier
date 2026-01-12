package com.realshield.platform.dto.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityDTO {
    private String action;
    private String email;
    private String ipAddress;
    private LocalDateTime timestamp;
}
