package com.realshield.platform.controller.admin;

import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.*;
import com.realshield.platform.service.admin.AdminManagementService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manage")
public class AdminManagementController {

    private final AdminManagementService adminManagementService;

    public AdminManagementController(AdminManagementService adminManagementService) {
        this.adminManagementService = adminManagementService;
    }

    @PostMapping("/{adminId}/reset-password")
    public ResponseEntity<ApiResponse<Void>> forceResetAdminPassword(@PathVariable Long adminId, @RequestBody AdminForceResetPasswordRequestDTO request) {

        // TODO: replace with JWT extraction
        Long superAdminId = 1L;

        adminManagementService.forceResetAdminPassword(superAdminId, adminId, request.getNewPassword());
        return ResponseEntity.ok(ApiResponse.success("Admin password reset successfully", null));
    }

    @PutMapping("/{adminId}/role")
    public ResponseEntity<ApiResponse<Void>> updateAdminRole(@PathVariable Long adminId, @RequestBody AdminRoleUpdateRequestDTO request) {
        // TODO: replace with JWT-based superAdminId
        Long superAdminId = 1L;

        adminManagementService.updateAdminRole(superAdminId, adminId, request.getRole());

        return ResponseEntity.ok(ApiResponse.success("Admin role updated successfully", null));
    }


    @GetMapping("/{adminId}")
    public ResponseEntity<ApiResponse<AdminResponseDTO>> getAdminById(@PathVariable Long adminId){
        AdminResponseDTO admin = adminManagementService.getAdminById(adminId);
        return ResponseEntity.ok(ApiResponse.success("Admin fetched successfully", admin));
    }

    //for fetching the data and No data modification
    @GetMapping("/admin")
    //@RequestParam(required = false) Boolean active -> this is optional hence required == false, active value can be false, true and null
    //@RequestParam(defaultValue = "0") int page --> page number (0 based indexing) default 0
    //@RequestParam(defaultValue = "10") int size --> how many record per page
    //@RequestParam(defaultValue = "id") String sortBy --> field name ot sort by default is id
    //@RequestParam(defaultValue = "asc") String sortDir sort direction asc and desc
    //GET /admin/manage/admins?page=1&size=5&sortBy=email&sortDir=desc
    public ResponseEntity<ApiResponse<Page<AdminResponseDTO>>> getAlAdmin(@RequestParam(required = false) Boolean active,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy, @RequestParam(defaultValue = "asc") String sortDir){
        Page<AdminResponseDTO> admin = adminManagementService.getAllAdmin(active, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("admin fetched successfully"));
    }
    @PutMapping("{adminId}/status")
    public ResponseEntity<String> updateAdminStatus(@RequestParam Long superAdminId, @PathVariable Long adminId, @RequestBody AdminStatusUpdateRequestDTO request){
        adminManagementService.updateAdminStatus(superAdminId, adminId, request.isActive());
        return ResponseEntity.ok("admin status updated successfully");
    }


    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Void>> create(@RequestBody AdminCreateRequestDTO requestDTO){
        // SUPER_ADMIN identity comes from JWT (not request)
        /*
         * TODO (JWT REQUIRED):
         * - Extract superAdminId from JWT
         * - Only SUPER_ADMIN allowed
         */

        //this have to  get changed by JWT
        Long superAdminId = 1L;
        adminManagementService.createAdmin(superAdminId, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Admin account created successfully", null));
    }
}
