package com.realshield.platform.dto.admin;

import com.realshield.platform.model.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminRoleUpdateRequestDTO {
    private Role role;
}
