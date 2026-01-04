package com.realshield.platform.service.admin;


import com.realshield.platform.dto.admin.*;
import com.realshield.platform.model.AuditLog;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.AuditLogRepository;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.specification.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


//here the logic for the APIS like admin authentication, management will be implemented
@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditLogRepository auditLogRepository;


    private void logAdminAction(
            String adminEmail,
            String action,
            String entityType,
            Long entityId
    ){
        auditLogRepository.save(
                AuditLog.builder()
                        .adminEmail(adminEmail)
                        .action(action)
                        .entityType(entityType)
                        .entityId(entityId)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    public void updateUserStatus(Long userId, UserStatusUpdateRequestDTO requestDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(requestDTO.isActive());
        userRepository.save(user);

        logAdminAction(
                "admin@gmail.com",   // later from JWT
                requestDTO.isActive() ? "UNBLOCK_USER" : "BLOCK_USER",
                "USER",
                userId
        );
    }



    public void logout() {
        // Currently no session / JWT to invalidate
        // This method is intentionally kept for future JWT/token invalidation
    }


    public void changeAdminPassword(AdminChangePasswordRequestDTO request) {

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        User admin = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {
            throw new RuntimeException("User is not an admin");
        }

        if (!admin.isActive()) {
            throw new RuntimeException("Admin account is inactive");
        }

        if (!passwordEncoder.matches(request.getOldPassword(), admin.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(admin);
    }



    public AdminDashboardStatsDTO getDashboardStats() {

        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByActive(true);
        long inactiveUsers = userRepository.countByActive(false);
        long adminUsers = userRepository.countByRole(Role.ADMIN);
        long emailVerifiedUsers = userRepository.countByEmailVerified(true);
        long emailNotVerifiedUsers = userRepository.countByEmailVerified(false);

        return new AdminDashboardStatsDTO(
                totalUsers,
                activeUsers,
                inactiveUsers,
                adminUsers,
                emailVerifiedUsers,
                emailNotVerifiedUsers
        );
    }



    public Page<AdminUserResponseDTO> searchUsers(
            String email,
            String name,
            Boolean active,
            Role role,
            int page,
            int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Specification<User> spec = UserSpecification.hasEmail(email)
                .and(UserSpecification.hasName(name))
                .and(UserSpecification.isActive(active))
                .and(UserSpecification.hasRole(role));

        return userRepository.findAll(spec, pageable).map(user -> new AdminUserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                user.isEmailVerified()
        ));
    }


    public Page<AdminUserResponseDTO> getAllUsersPaginated(
            int page,
            int size,
            String sortBy,
            String sortDir
    ){
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return userRepository.findAll(pageable).map(user -> new AdminUserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                user.isEmailVerified()
        ));
    }


    public void deleteUser(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found"));

        if (!user.isActive()){
            throw new RuntimeException("User is already inactive");
        }
        user.setActive(false);
        userRepository.save(user);
    }


    //fetching user details by ID
    public AdminUserResponseDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return new AdminUserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                user.isEmailVerified()
        );
    }



    public List<AdminUserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new AdminUserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.isActive(),
                        user.isEmailVerified()
                ))
                .collect(Collectors.toList());
    }

    //if the admin wants to log in
    public void login(AdminLoginRequestDTO adminLoginRequestDTO) {
        //logic for admin login will be implemented here

        //here finding the Admin by email
        User admin = userRepository.findByEmail(adminLoginRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {
            throw new RuntimeException("User is not an admin");
        }

        if(!admin.isActive()){
            throw new RuntimeException("Admin account is inactive");
        }

        //checking the password
        if(!passwordEncoder.matches(adminLoginRequestDTO.getPassword(), admin.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        //jwt token generation logic can be added here for session management
    }
    public void createAdmin(AdminCreateRequestDTO request) {
        //logic for creating admin will be implemented here
        User admin = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(admin);
    }
}
