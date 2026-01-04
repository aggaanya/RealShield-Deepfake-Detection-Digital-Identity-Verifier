package com.realshield.platform.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardStatsDTO {

    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long adminUsers;
    private long emailVerifiedUsers;
    private long emailNotVerifiedUsers;
}
