package com.realshield.platform.service.admin;


import com.realshield.platform.dto.admin.*;
import com.realshield.platform.exception.*;
import com.realshield.platform.model.*;
import com.realshield.platform.repository.AuditLogRepository;
import com.realshield.platform.repository.UserActivityRepository;
import com.realshield.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


//this is the admin authentication service class which will have only the admin login(), logout(), and changePassword()
//logics only

//here the logic for the APIS like admin authentication, management will be implemented
@Service
public class AdminAuthenticationService implements AdminAuthenticationInterface{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserActivityRepository userActivityRepository;


    public AdminAuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserActivityRepository userActivityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userActivityRepository = userActivityRepository;
    }

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 15;




    public void logout() {
        /*
         * TODO (JWT):
         * - Invalidate JWT
         * - Or add token to blacklist
         * - Or clear refresh token
         */
    }

    public void changeAdminPassword(Long adminId, AdminChangePasswordRequestDTO request) {

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {throw new PasswordMismatchException("New password and confirm password do not match");}

        User admin = userRepository.findById(adminId).orElseThrow(() -> new AccessDeniedExceptions("Admin not found"));

        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {throw new AccessDeniedExceptions("User is not an admin");}

        if (!admin.isActive()) {
            throw new AccountDisabledException("Admin account is inactive");
        }

        if(passwordEncoder.matches(request.getNewPassword(), admin.getPassword())){
            throw new InvalidCredentialsException("new password can not be same to the old password");
        }
        if (!passwordEncoder.matches(request.getOldPassword(), admin.getPassword())) {
            throw new InvalidCredentialsException("Old password is incorrect");
        }

        admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userActivityRepository.save(UserActivity.builder().user(admin).email(admin.getEmail()).action(UserActivityAction.PASSWORD_CHANGED).timestamp(LocalDateTime.now()).build());
        userRepository.save(admin);
    }

    //if the admin wants to log in
    public void login(AdminLoginRequestDTO adminLoginRequestDTO, String ipAddress) {
        //here finding the Admin by email from the database
        User admin = userRepository.findByEmail(adminLoginRequestDTO.getEmail()).orElseThrow(() -> new InvalidCredentialsException("Admin not found"));

        if (admin.getAccountLockedUntil() != null && admin.getAccountLockedUntil().isAfter(LocalDateTime.now())) {throw new AccountLockedException("Account locked until: " + admin.getAccountLockedUntil());}

        //only the super admin or the admin can log in no one else
        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {
            throw new AccessDeniedExceptions("Access denied");
        }

        //if the account is not active, then admin can nit login
        if(!admin.isActive()){throw new AccountDisabledException("Admin account is inactive");}

        //checking the password
        if(!passwordEncoder.matches(adminLoginRequestDTO.getPassword(), admin.getPassword())){
            int attempts = admin.getFailedLoginAttempts() + 1;
            admin.setFailedLoginAttempts(attempts);
            if(attempts >= MAX_FAILED_ATTEMPTS){
                admin.setAccountLockedUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
                admin.setFailedLoginAttempts(0);
            }
            userRepository.save(admin);

            userActivityRepository.save(UserActivity.builder()
                    .user(admin)
                    .email(admin.getEmail())
                    .action(UserActivityAction.LOGIN_FAILED)
                    .ipAddress(ipAddress)
                    .timestamp(LocalDateTime.now())
                    .build());
            throw new InvalidCredentialsException("Invalid password or email");
        }
        admin.setAccountLockedUntil(null);
        admin.setFailedLoginAttempts(0);
        userRepository.save(admin);

        userActivityRepository.save(UserActivity.builder()
                .user(admin).email(admin.getEmail()).action(UserActivityAction.LOGIN_SUCCESS).ipAddress(ipAddress).timestamp(LocalDateTime.now()).build());
        //
        // TODO (JWT):
        // generate admin JWT with role claim

        // TODO (optional but recommended):
        // log admin login activity
    }


}
