package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.*;
import com.realshield.platform.service.admin.AdminAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//thi sis the controller class in which will be consisting of the apis, which admin will use to manage authentication and users
@RestController
@RequestMapping("/admin/auth")
public class AdminAuthenticationController {

    @Autowired
    private AdminAuthenticationService adminAuthenticationService;

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        /*
         * TODO (JWT REQUIRED):
         * - Extract adminId from JWT
         * - Invalidate JWT / refresh token
         */
        adminAuthenticationService.logout();
        return ResponseEntity.ok(ApiResponse.success("Admin logged out successfully", null));
    }

    @PutMapping("/me/change_password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@Valid @RequestBody AdminChangePasswordRequestDTO request, HttpServletRequest httpRequest) {
        /*
         * TODO (JWT REQUIRED):
         * - Extract adminId from JWT
         */
        Long adminId = 1L; // TEMP until JWT

        adminAuthenticationService.changeAdminPassword(adminId, request);

        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(@Valid @RequestBody AdminLoginRequestDTO requestDTO, HttpServletRequest request){
        String ipAddress = request.getRemoteAddr();
        adminAuthenticationService.login(requestDTO, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Admin login successful", null));
    }


}
