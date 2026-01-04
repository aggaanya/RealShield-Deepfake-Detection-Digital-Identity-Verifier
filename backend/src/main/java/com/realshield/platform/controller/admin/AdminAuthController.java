package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.*;
import com.realshield.platform.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//thi sis the controller class in which will be consisting of the apis, which admin will use to manage authentication and users
@RestController
@RequestMapping("/admin/auth")
public class AdminAuthController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        adminService.logout();
        return ResponseEntity.ok(
                ApiResponse.success("Admin logged out successfully", null)
        );
    }


    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @RequestBody AdminChangePasswordRequestDTO request
    ) {
        adminService.changeAdminPassword(request);
        return ResponseEntity.ok(
                ApiResponse.success("Password changed successfully", null)
        );
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody AdminLoginRequestDTO requestDTO){
        adminService.login(requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Admin login successful", null)
        );
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<String>> createAdmin(@RequestBody AdminCreateRequestDTO requestDTO){
        adminService.createAdmin(requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Admin account created successfully", null)
        );
    }
}
