package com.realshield.platform.controller.admin;

import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AdminDashboardStatsDTO;
import com.realshield.platform.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminDashboardStatsDTO>> getDashboardStats() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Dashboard stats fetched successfully",
                        adminService.getDashboardStats()
                )
        );
    }
}
