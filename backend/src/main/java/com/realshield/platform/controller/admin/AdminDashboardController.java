package com.realshield.platform.controller.admin;

import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AdminDashboardStatsDTO;
import com.realshield.platform.service.admin.AdminAuthenticationService;
import com.realshield.platform.service.admin.AdminDashboardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminDashboardStatsDTO>> getAdminDashboardStats(HttpServletRequest request) {
        /*
         * TODO (JWT REQUIRED):
         * - Extract role from JWT
         * - Allow only ADMIN / SUPER_ADMIN
         * - Block USER access
         */
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats fetched successfully", adminDashboardService.getDashboardStats()));
    }
}
