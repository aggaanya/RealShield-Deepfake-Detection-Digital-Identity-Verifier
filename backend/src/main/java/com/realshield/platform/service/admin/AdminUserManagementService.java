package com.realshield.platform.service.admin;


//this is the service class which will have the logic for the ADMIn managing the user

import com.realshield.platform.dto.admin.AdminUserResponseDTO;
import com.realshield.platform.dto.user.UserStatusUpdateRequestDTO;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminUserManagementService implements AdminUserManagementInterface{

    private final UserRepository userRepository;
    private final AdminAuditService adminAuditService;

    public AdminUserManagementService(UserRepository userRepository, AdminAuditService adminAuditService) {
        this.userRepository = userRepository;
        this.adminAuditService = adminAuditService;
    }

    @Override
    public void updateUserStatus(Long userId, UserStatusUpdateRequestDTO requestDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(requestDTO.isActive());
        userRepository.save(user);

        adminAuditService.logAdminAction("admin@gmail.com",   // later from JWT
                requestDTO.isActive() ? "UNBLOCK_USER" : "BLOCK_USER", "USER", userId);
    }
    @Override
    public Page<AdminUserResponseDTO> searchUsers(String email, String name, Boolean active, Role role, int page, int size){
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
}
