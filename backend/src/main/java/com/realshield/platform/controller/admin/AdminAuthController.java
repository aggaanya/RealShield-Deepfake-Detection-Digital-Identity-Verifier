package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AdminCreateRequestDTO;
import com.realshield.platform.dto.admin.AdminLoginRequestDTO;
import com.realshield.platform.dto.admin.AdminUserResponseDTO;
import com.realshield.platform.dto.admin.UserStatusUpdateRequestDTO;
import com.realshield.platform.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/auth")
public class AdminAuthController {

    @Autowired
    private AdminService adminService;

    public ResponseEntity<ApiResponse<String>> updateUserStatus(@PathVariable Long userId, @RequestBody UserStatusUpdateRequestDTO requestDTO) {
        adminService.updateUserStatus(userId, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", null));
    }
    //this api returns the list of the users to the admin
    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminUserResponseDTO>>> getAllUsers(){
        List<AdminUserResponseDTO> admins = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Fetched all admins successfully", admins)
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
