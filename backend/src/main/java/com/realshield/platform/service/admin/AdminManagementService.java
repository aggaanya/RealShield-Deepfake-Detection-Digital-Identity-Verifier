package com.realshield.platform.service.admin;

import com.realshield.platform.dto.admin.AdminCreateRequestDTO;
import com.realshield.platform.dto.admin.AdminResponseDTO;
import com.realshield.platform.exception.*;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminManagementService implements AdminManagementInterface{
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;



    private final AdminAuditService adminAuditService;

    public AdminManagementService(UserRepository userRepository, PasswordEncoder passwordEncoder, AdminAuditService adminAuditService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminAuditService = adminAuditService;
    }

    @Override
    public void forceResetAdminPassword(Long superAdminId, Long adminId, String newPassword) {
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(()-> new AdminNotFoundException("super admin not found"));
        if (superAdmin.getRole() != Role.SUPER_ADMIN){
            throw new AccessDeniedExceptions("only super admin is allowed to reset the admin password");
        }
        User admin = userRepository.findById(adminId).orElseThrow(()->new AdminNotFoundException("admin account not found"));
        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {
            throw new AccessDeniedExceptions("target user is not an admin");
        }
        if (superAdmin.getId().equals(adminId)){
            throw new AccessDeniedExceptions("super admin cannot reset own password");
        }
        admin.setPassword(newPassword);
        userRepository.save(admin);
        adminAuditService.logAdminAction(superAdmin.getEmail(), "FORCE_RESET_ADMIN_PASSWORD", "ADMIN", adminId);
    }

    @Override
    public void updateAdminRole(Long superAdminId, Long adminId, Role newRole) {
        //fetching the super admin id
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(()-> new AdminNotFoundException("super admin not found"));
        if (superAdmin.getRole() != Role.SUPER_ADMIN){
            throw new AccessDeniedExceptions("only super admin can change the role");
        }
        User admin = userRepository.findById(adminId).orElseThrow(()-> new AdminNotFoundException("admin account not found"));

        if (superAdmin.getId().equals(admin.getId())){
            throw new AccessDeniedExceptions("super admin can not change own role");
        }
        if (!admin.isActive()){
            throw new AccessDeniedExceptions("Admin account is disabled");
        }
        if (superAdmin.getRole() == newRole){
            throw new IllegalArgumentException("admin already has this role");
        }
        admin.setRole(newRole);
        userRepository.save(admin);

        adminAuditService.logAdminAction( superAdmin.getEmail(),
                "CHANGE_ADMIN_ROLE",
                "ADMIN",
                adminId);
    }

    @Override
    public void deleteByID(Long superAdminId, Long adminId) {
        //fetching the super admin even exists or not in the database
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(()-> new AdminNotFoundException("super admin not found"));
        //if the id exits in the database than check for the the role
        if (superAdmin.getRole() != Role.SUPER_ADMIN){
            throw new AdminNotFoundException("admin is not an admin");
        }
        if (!superAdmin.isActive()){
            throw new AccountDisabledException("account is disable");
        }
        User admin = userRepository.findById(adminId).orElseThrow(()-> new AccountDisabledException("admin not found"));

        if (superAdmin.getId().equals(adminId)){
            throw new AccessDeniedExceptions("super admin cannot delete himself");
        }
        if (admin.getRole() != Role.ADMIN){
            throw new AccessDeniedExceptions("target user is not an admin");
        }
        if (!admin.isActive()){
            throw new AccessDeniedExceptions("admin account is already disabled");
        }
        adminAuditService.logAdminAction(superAdmin.getEmail(), "DELETE_ADMIN", "ADMIN", adminId);
    }

    //this logic fetches the details of a single admin using their id//it ensures that the user is actually an admin not the normal user
    //it returns safe DTO dat
    @Override
    public AdminResponseDTO getAdminById(Long adminId) {
        User admin = userRepository.findById(adminId).orElseThrow(()-> new AdminNotFoundException("admin not found"));
        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN){
            throw new InvalidCredentialsException("user is not an admin");
        }
        return new AdminResponseDTO(admin.getId(), admin.getName(), admin.getEmail(), admin.isActive(), admin.isEmailVerified());
    }

    //fetches the admin user from the database, supports the filtering, sorting and pagination and returns data in a safe DTO format
    @Override
    public Page<AdminResponseDTO> getAllAdmin(Boolean active, int page, int size, String sortBy, String sortDir) {
        //sorting in a decreasing manner
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending():Sort.by(sortBy).ascending();
        //how much data on which page and how to sort?
        Pageable pageable = PageRequest.of(page, size, sort);
        //SQL WHERE role = 'ADMIN' OR role = 'SUPER_ADMIN', this means that only admin can be selected
        Specification<User> spec = Specification.where(UserSpecification.hasRole(Role.ADMIN).or(UserSpecification.hasRole(Role.SUPER_ADMIN)));
        //if the client passes true, than all the active users will be returned or the active is false, than all the non-active users will be returned
        //and if the client does not pass null than no filter applied all the users will be returned
        if(active != null){spec = spec.and(UserSpecification.isActive(active));}
        return userRepository.findAll(spec, pageable).map(admin-> new AdminResponseDTO(admin.getId(), admin.getName(), admin.getEmail(), admin.isActive(), admin.isEmailVerified()));
    }

    @Override
    public void updateAdminStatus(Long superAdminId, Long adminId, boolean active) {
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(()-> new InvalidCredentialsException("super admin not found"));

        if(superAdmin.getRole() != Role.SUPER_ADMIN){
            throw new AccessDeniedExceptions("only super admin can manage admins");
        }

        User admin = userRepository.findById(adminId).orElseThrow(()-> new InvalidCredentialsException("admin not found"));

        if(admin.getRole() != Role.ADMIN){
            throw new AccessDeniedExceptions("target user is no an admin");
        }

        if(superAdmin.getId().equals(adminId)){
            throw new AccessDeniedExceptions("super admin can not block himself");
        }
        admin.setActive(active);
        userRepository.save(admin);
        adminAuditService.logAdminAction(superAdmin.getEmail(), active ? "UNBLOCKED_ADMIN": "BLOCKED_ADMIN", "ADMIN", adminId);
    }


    //logic for creating admin will be implemented here
    @Override
    public void createAdmin(Long superAdminId, AdminCreateRequestDTO request) {

        //checking if the id exist or not in the database
        User superAdmin = userRepository.findById(superAdminId).orElseThrow(()-> new InvalidCredentialsException("super admin not found"));

        //chacking the role of the id given
        if(superAdmin.getRole() != Role.SUPER_ADMIN){
            throw new AccessDeniedExceptions("only super admin can create the admin");
        }

        if(userRepository.existsByEmail(request.getEmail())){throw new EmailAlreadyExistsException("admin with this email already exists");}

        User admin = User.builder().email(request.getEmail()).name(request.getName()).password(passwordEncoder.encode(request.getPassword())).role(Role.ADMIN).active(true).emailVerified(true).build();

        userRepository.save(admin);

        adminAuditService.logAdminAction(superAdmin.getEmail(), "CREATED_ADMIN", "ADMIN", admin.getId());

    }
}
