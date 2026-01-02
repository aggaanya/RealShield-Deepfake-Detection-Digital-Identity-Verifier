package com.realshield.platform.service.auth;

import com.realshield.platform.dto.auth.*;
import com.realshield.platform.exception.EmailAlreadyExistsException;
import com.realshield.platform.exception.InvalidResetTokenException;
import com.realshield.platform.exception.PasswordMismatchException;
import com.realshield.platform.model.PasswordResetToken;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.PasswordResetTokenRepository;
import com.realshield.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

//Service class contain, the business logic
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthResponseDTO getCurrent(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("user not found"));
        return AuthResponseDTO.builder().email(user.getEmail()).id(user.getId()).build();
    }
    public void logout(Long userId){
        //jwt
    }
    public void resetPassword(String token, ResetPasswordRequestDTO dto) {

        // 1. Validate password confirmation
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }

        // 2. Fetch reset token using method parameter
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidResetTokenException("Invalid or expired reset token"));

        // 3. Check expiry
        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new InvalidResetTokenException("Reset token has expired");
        }

        // 4. Prevent reuse (important)
        if (resetToken.isUsed()) {
            throw new InvalidResetTokenException("Reset token already used");
        }

        // 5. Fetch user (email-based – recommended)
        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 6. Update password
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        // 7. Invalidate token
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }


    public ChangePasswordResponseDTO changePassword(Long id, ChangePasswordRequestDTO requestDTO) {
        //loading the user from the database, this is the user which is in the database
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

        //verifying the old password
        if (!passwordEncoder.matches(requestDTO.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("old password is incorrect");
        }

        //checking the new password and the confirmed password
        if (!requestDTO.getConfirmedPassword().equals(requestDTO.getNewPassword())) {
            throw new RuntimeException("password does not matches");
        }

        //preventing the re-usage of the old password
        if (passwordEncoder.matches(requestDTO.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("new password is same to the old password");
        }


        //encoding and saving the password into the database
        user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));
        userRepository.save(user);

        //returning and mapping to the DTO
        return ChangePasswordResponseDTO.builder().id(user.getId()).message("password changed").email(user.getEmail()).build();
    }

    public void forgetPassword(ForgetPasswordRequestDTO forgetPasswordRequestDTO) {
        userRepository.findByEmail(forgetPasswordRequestDTO.getEmail())
                .ifPresent(user -> {
                    //Generate reset token
                    String resetToken = UUID.randomUUID().toString();

                    //log token instead of emailing
                    System.out.println(
                            "Password reset token for " + user.getEmail() + ": " + resetToken
                    );

                    // - save token in DB
                    // - send email
                });

        // IMPORTANT:
        // Do NOTHING if user not found
        // Same response for security
    }

    public AuthResponseDTO signup(SignupRequestDTO signupRequestDTO) {
        if (userRepository.findByEmail(signupRequestDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered");
        }
        if (!signupRequestDTO.getPassword().equals(signupRequestDTO.getConfirmedPassword())) {
            throw new RuntimeException("passwords does not match");
        }

        User user = new User();
        user.setEmail(signupRequestDTO.getEmail());
        user.setName(signupRequestDTO.getName());
        user.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);
        return AuthResponseDTO.builder().id(user.getId()).email(user.getEmail()).build();
    }


    //this function checks whether the email exists checks the password is correct, if anything wrong login fails and if everything is correct login is successful
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {

        //this line of code cheks if email exists or not
        User user = userRepository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("invalid credentials"));

        //if the email exists than checks for the password
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("invalid email or password");
        }
        return AuthResponseDTO.builder().id(user.getId()).email(user.getEmail()).build();
        //jwt
    }

}
