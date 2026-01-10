package com.realshield.platform.service.admin;

import com.realshield.platform.dto.admin.AdminUserResponseDTO;
import com.realshield.platform.dto.user.UserStatusUpdateRequestDTO;
import com.realshield.platform.model.Role;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdminUserManagementInterface {
    //block/unblock the user by checking the lifecycle of the user
    void updateUserStatus(Long userId, UserStatusUpdateRequestDTO requestDTO);

    //admin searching the user, filtering the user through the email id, name, active and role, using the pagination
    Page<AdminUserResponseDTO> searchUsers(String email, String name, Boolean active, Role role, int page, int size);

    //admin viewing all the user on a page
    Page<AdminUserResponseDTO> getAllUsersPaginated(int page, int size, String sortBy, String sortDir);

    void deleteUser(Long userId);

    AdminUserResponseDTO getUserById(Long userId);

    List<AdminUserResponseDTO> getAllUsers();
}
