package com.realshield.platform.controller.admin;


import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.admin.AdminUserResponseDTO;
import com.realshield.platform.dto.user.UserStatusUpdateRequestDTO;
import com.realshield.platform.model.Role;

import com.realshield.platform.service.admin.AdminUserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//this is the controller class in which will be consisting of the apis, which admin will use to manage users
@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserManagementService adminUserManagementService;

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<AdminUserResponseDTO>>> searchUser(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Role roleEnum = null;
        if (role != null) {
            try {
                roleEnum = Role.valueOf(role.toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Invalid role value: " + role);
            }
        }
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Users fetched successfully",
                        adminUserManagementService.searchUsers(email, name, active, roleEnum, page, size)
                ));
    }



    @GetMapping("/paginated")
    public ResponseEntity<ApiResponse<Page<AdminUserResponseDTO>>> getUsersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Users fetched successfully",
                        adminUserManagementService.getAllUsersPaginated(page, size, sortBy, sortDir)));
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long userId){
        adminUserManagementService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null)
        );
    }

    //the api which returns the user details by user id to the admin
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<AdminUserResponseDTO>> getUserById(@PathVariable Long userId) {
        AdminUserResponseDTO userResponseDTO = adminUserManagementService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success("Fetched user details successfully", userResponseDTO));
    }


    //this api returns the user details by user id to the admin
    public ResponseEntity<ApiResponse<String>> updateUserStatus(@PathVariable Long userId, @RequestBody UserStatusUpdateRequestDTO requestDTO) {
        adminUserManagementService.updateUserStatus(userId, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", null));
    }


    //this api returns the list of the users to the admin
    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminUserResponseDTO>>> getAllUsers(){
        List<AdminUserResponseDTO> admins = adminUserManagementService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Fetched all admins successfully", admins));
    }
}
