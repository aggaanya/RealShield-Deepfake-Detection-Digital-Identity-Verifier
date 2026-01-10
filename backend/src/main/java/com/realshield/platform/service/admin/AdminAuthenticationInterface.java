package com.realshield.platform.service.admin;

import com.realshield.platform.dto.admin.*;



public interface AdminAuthenticationInterface {

     void logout();

     void changeAdminPassword(Long adminId, AdminChangePasswordRequestDTO request);

     void login(AdminLoginRequestDTO adminLoginRequestDTO, String ipAddress);
}
