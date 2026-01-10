package com.realshield.platform.service.admin;


import com.realshield.platform.dto.admin.AdminCreateRequestDTO;
import com.realshield.platform.dto.admin.AdminResponseDTO;
import com.realshield.platform.model.Role;
import org.springframework.data.domain.Page;

//it is consisting of the functions in which an ADMIN manages other admin
public interface AdminManagementInterface {
    void createAdmin(Long superAdminId, AdminCreateRequestDTO request);
    void updateAdminStatus(Long superAdminId, Long adminId, boolean active);
    Page<AdminResponseDTO> getAllAdmin(Boolean active , int page, int size, String sortBy, String sortDir);
    AdminResponseDTO getAdminById(Long adminId);
    void deleteByID(Long superAdminId, Long adminId);
    void updateAdminRole(Long superAdminId, Long AdminId, Role newRole);
    void forceResetAdminPassword(Long superAdminId, Long adminId, String newPassword);
}
