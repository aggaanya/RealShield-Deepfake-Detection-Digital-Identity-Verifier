package com.realshield.platform.service.user;


import com.realshield.platform.*;
import com.realshield.platform.dto.user.ChangeEmailDTO;
import com.realshield.platform.dto.user.ChangePasswordDTO;
import com.realshield.platform.dto.user.UpdateUserDTO;
import com.realshield.platform.dto.user.UserProfileDTO;
import com.realshield.platform.model.EmailVerificationOtp;
import com.realshield.platform.model.PasswordResetOtp;
import com.realshield.platform.model.User;
import com.realshield.platform.model.UserActivity;
import com.realshield.platform.repository.EmailVerificationOtpRepository;
import com.realshield.platform.repository.PasswordResetOtpRepository;
import com.realshield.platform.repository.UserActivityRepository;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailVerificationOtpRepository otpRepository;

    @Autowired
    private EmailService emailService;


    @Autowired
    private UserActivityRepository activityRepository;

    @Autowired
    private PasswordResetOtpRepository passwordResetOtpRepository;

    public void logout() {
        // Currently no JWT/session to invalidate
        // This method is kept for future token/session invalidation
    }


    //this is the helper method will generate a random 6 digit otp
    private String generateRandomOtp(){
        return String.valueOf(100000 + new java.util.Random().nextInt(900000));
    }


    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        PasswordResetOtp otp = PasswordResetOtp.builder()
                .email(email)
                .otp(generateRandomOtp())
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .attempts(0)
                .used(false)
                .build();

        passwordResetOtpRepository.save(otp);

        emailService.sendOtpEmail(email, otp.getOtp());
    }

    //fetching the user through there email, verifying the old password, encoding the new password and saving it to the database
    public void changePassword(String email, ChangePasswordDTO dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("user not found"));

        // ✅ FIX: invert the condition
        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        logActivity(email, "Password changed successfully", "system");
    }


    public List<UserActivity> getUserActivity(String email){
        return activityRepository.findByEmailOrderByTimestampDesc(email);
    }

    public void logActivity(String email, String action, String ipAddress){
        UserActivity activity = UserActivity.builder()
                .email(email)
                .action(action)
                .ipAddress(ipAddress)
                .timestamp(LocalDateTime.now())
                .build();
        activityRepository.save(activity);
    }



    //this is the logic for the OTP generation and mapping to the entity
    @Transactional
    public void generateEmailVerificationOtp(String email) {

        // ✅ delete existing OTP if any
        otpRepository.deleteByEmail(email);

        EmailVerificationOtp otp = EmailVerificationOtp.builder()
                .email(email.toLowerCase())
                .otp(generateRandomOtp())
                .attempts(0)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .verified(false)
                .build();

        otpRepository.save(otp);

    }


    public void verificationOtp(String inputOtp) {

        EmailVerificationOtp otp = otpRepository
                .findByOtp(inputOtp)
                .orElseThrow(() -> new OtpNotFoundException("OTP not found"));

        if (otp.isVerified()) {
            throw new OtpAlreadyVerifiedException("OTP is already verified");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpExpiredException("OTP has expired");
        }

        if (otp.getAttempts() >= 5) {
            throw new OtpAttemptsExceededException("Maximum OTP attempts exceeded");
        }

        // OTP mismatch no longer needed since we searched by OTP
        otp.setVerified(true);
        otpRepository.save(otp);

        String email = otp.getEmail(); // 🔥 SOURCE OF TRUTH

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setEmailVerified(true);
        userRepository.save(user);
    }



    public UserProfileDTO getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("user not found"));

        return UserProfileDTO.builder().id(user.getId()).email(user.getEmail()).name(user.getName()).build();
    }

    //this is the logic where we will update the user profile
    public void updateProfile(String email, UpdateUserDTO dto) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("user not found"));

        if (dto.getName() != null) {
            user.setName(dto.getName());
        }

        if (dto.getPhoneNumber() != null) {
            user.setPhoneNumber(dto.getPhoneNumber());
        }

        if (dto.getAddress() != null) {
            user.setAddress(dto.getAddress());
        }

        if (dto.getAddress() != null) {
            user.setAddress(dto.getAddress());
            userRepository.save(user);
        }
        userRepository.save(user);
    }

    //this is the logic to delete user account, fetching the user through there email
    public void deleteAccount(String email) {

        //fetching th user from the database, and if not present throwing an exception
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("user not found"));

        //user have already deactivated there account
        if (!user.isActive()) {
            throw new RuntimeException("user account is already deactivated");
        }
        userRepository.delete(user);
    }
    //fetching the user through these email, verifying the password, checking if new email is unique and updating the email
    //and very import making the emailVerified to True
    public void changeEmail(String currentEmail, ChangeEmailDTO dto){
        //fetching the user from the database, with the current email and if not present throwing an exception
        //dto consist of the newEmail and password
        User user = userRepository.findByEmail(currentEmail).orElseThrow(()-> new RuntimeException("user not found"));

        //verifying the password that the user have provided is correct
        if (passwordEncoder.matches(user.getPassword(), dto.getPassword())){
            throw new RuntimeException("password is incorrect");
        }
        //checking if the new email is unique, hence email must be unique and not be found in the database
        if (userRepository.findByEmail(dto.getNewEmail()).isPresent()){
            throw new RuntimeException("email is already in use");
        }

        //updating the email and setting email verified to false
        user.setEmail(dto.getNewEmail());
        user.setEmailVerified(false);
        userRepository.save(user);
    }
}