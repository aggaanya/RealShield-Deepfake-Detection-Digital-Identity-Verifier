package com.realshield.platform.service.auth;

import com.realshield.platform.dto.auth.*;
import com.realshield.platform.exception.*;
import com.realshield.platform.model.*;
import com.realshield.platform.repository.EmailVerificationOtpRepository;
import com.realshield.platform.repository.PasswordResetTokenRepository;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.service.user.UserActivityService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

//Service class contain, the business logic
@Service
public class AuthService {
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 15;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserActivityService userActivityService;
    private final EmailVerificationOtpRepository emailVerificationOtpRepository;
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, PasswordResetTokenRepository passwordResetTokenRepository, UserActivityService userActivityService, EmailVerificationOtpRepository emailVerificationOtpRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userActivityService = userActivityService;
        this.emailVerificationOtpRepository = emailVerificationOtpRepository;
    }
    public AuthResponseDTO getCurrent(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UnauthorizedException("user not found"));
        return AuthResponseDTO.builder().email(user.getEmail()).role(user.getRole()).build();
    }
    public ChangePasswordResponseDTO changePassword(User user, ChangePasswordRequestDTO requestDTO) {
        if (!passwordEncoder.matches(requestDTO.getOldPassword(), user.getPassword())) {
            throw new InvalidOldPasswordException("Old password is incorrect");
        }
        if (!requestDTO.getNewPassword().equals(requestDTO.getConfirmedPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }
        if (passwordEncoder.matches(requestDTO.getNewPassword(), user.getPassword())) {
            throw new PasswordReuseException("New password must be different from old password");
        }
        user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));
        userRepository.save(user);
        return ChangePasswordResponseDTO.builder().email(user.getEmail()).message("Password changed successfully").build();
    }
    public void logout(Long userId) {
        //jwt
    }
    //when the client hit the api to reset_password,the BACKEND does not trust the REQUEST,hence the token validity is checked from the Database
    //token is saved in forget_password api call
    //when the client hit the api to reset_password,the BACKEND does not trust the REQUEST,hence the token validity is checked from the Database
    //token is saved in forget_password api call
    public void resetPassword(String token, ResetPasswordRequestDTO dto, String ipAddress) {
        //checking the confirmed password and the password does it even matches
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }
        // Fetch reset token using method parameter
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(() -> new InvalidResetTokenException("Invalid or expired reset token"));
        //checking the time validity of the password
        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new InvalidResetTokenException("Reset token has expired");
        }
        //token is only for one time use
        if (resetToken.isUsed()) {
            throw new InvalidResetTokenException("Reset token already used");
        }
        //Fetch user
        User user = userRepository.findByEmail(resetToken.getEmail()).orElseThrow(() -> new UserNotFoundException("User not found"));
        //Update password
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
        userActivityService.logActivity(user.getEmail(), UserActivityAction.PASSWORD_RESET_SUCCESS, ipAddress);
    }
    //this method handel forgot password logic, it does not do anything and PREPARE AND STORE THE RESET TOKEN
    public void forgetPassword(ForgetPasswordRequestDTO dto, String ipAddress) {
        //it reads the email from the request DTO and find the email of the user from the database
        userRepository.findByEmail(dto.getEmail())
                .ifPresent(user -> {
                    passwordResetTokenRepository.deleteByEmail(user.getEmail());
                    //generates the random string
                    String token = UUID.randomUUID().toString();
                    //as the token is created the token is mapped ot the respective email
                    PasswordResetToken resetToken = PasswordResetToken.builder().token(token).email(user.getEmail()).expiryTime(LocalDateTime.now().plusMinutes(15)).used(false).build();
                    passwordResetTokenRepository.save(resetToken);
                    //printing the token on to the console
                    System.out.println("Password reset token for " + user.getEmail() + ": " + token);
                    userActivityService.logActivity(user.getEmail(), UserActivityAction.PASSWORD_RESET_REQUESTED, ipAddress);});
        // Same response regardless of user existence
    }
    //this function checks whether the email exists checks the password is correct, if anything wrong login fails and if everything is correct login is successful
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO, String ipAddress) {
        //email exists or not
        User user = userRepository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new InvalidCredentialsException("invalid credentials"));
        //check if the account is locked
        if (user.getAccountLockedUntil() != null && user.getAccountLockedUntil().isAfter(LocalDateTime.now())) {
            throw new AccountLockedException("account is locked until:" + user.getAccountLockedUntil());
        }
        if (!user.isEmailVerified()) {
            throw new EmailNotVerifiedException("email not verified");
        }
        if (!user.isActive()) {
            throw new AccountDisabledException("account is disabled");
        }
        //if the email exists than checks for the password
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            //is the user is not able to login than set the fields
            int attempts = user.getFailedLoginAttempts() + 1;
            user.setFailedLoginAttempts(attempts);
            if (attempts >= MAX_FAILED_ATTEMPTS) {
                user.setAccountLockedUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
                user.setFailedLoginAttempts(0);
            }
            userRepository.save(user);
            userActivityService.logActivity(user.getEmail(), UserActivityAction.LOGIN_FAILED, ipAddress);
            throw new InvalidCredentialsException("invalid email or password");
        }
        user.setFailedLoginAttempts(0);
        user.setAccountLockedUntil(null);
        userRepository.save(user);

        //if the user is verified, then save that activity too
        userActivityService.logActivity(user.getEmail(), UserActivityAction.LOGIN_SUCCESS, ipAddress);
        return AuthResponseDTO.builder().id(user.getId()).role(user.getRole()).email(user.getEmail()).build();
        //jwt
    }
    public void sendEmailVerificationOtp(String email, String ipAddress) {
        //fetching the user exists in the database or not, if not throw exception
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        //if the user is already verified that means user jave already hit the api of verifyEmail
        if (user.isEmailVerified()) {
            throw new EmailAlreadyVerifiedException("Email already verified");
        }

        //Before creating a new OTP, remove any old OTP that belongs to this email.
        //if old otp is not there than no exception error will occur
        emailVerificationOtpRepository.deleteByEmail(email);
        //generating the otp
        SecureRandom random = new SecureRandom();
        String otp = String.valueOf(100000 + random.nextInt(900000));
        //mapping the otp with the respective email of the user, when the user signup is function evoke and do the mapping of the email and the otp
        EmailVerificationOtp emailOtp = EmailVerificationOtp.builder().email(email).otp(otp).expiryTime(LocalDateTime.now().plusMinutes(10)).verified(false).attempts(0).build();
        //saving the otp with the respective email of the user in the database
        emailVerificationOtpRepository.save(emailOtp);
        System.out.println("EMAIL OTP for " + email + " : " + otp);
        userActivityService.logActivity(email, UserActivityAction.OTP_SENT, ipAddress);
    }
    public void verifyEmail(String email, String inputOtp, String ipAddress) {
        //here we are checking has the otp for thi email generated,if the row of this table does not exist than exception will be thrown
        //this table gets created automatically when the application get started
        EmailVerificationOtp emailOtp = emailVerificationOtpRepository.findByEmail(email).orElseThrow(() -> new OtpNotFoundException("OTP not found"));
        //through is user can never use the otp again, as the OTP is only use for once
        if(emailOtp.isVerified()){
            throw new OtpAlreadyUsedException("OTP already used");
        }
        if (emailOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpExpiredException("OTP expired");
        }
        if (emailOtp.getAttempts() >= 5) {
            throw new TooManyOtpAttemptsException("Too many attempts");
        }

        if (!emailOtp.getOtp().equals(inputOtp)) {
            emailOtp.setAttempts(emailOtp.getAttempts() + 1);
            emailVerificationOtpRepository.save(emailOtp);
            throw new InvalidOtpException("Invalid OTP");
        }
        emailOtp.setAttempts(0);
        User user = userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("user not found"));
        if (user.isEmailVerified()) {
            throw new EmailAlreadyVerifiedException("Email already verified");
        }

        user.setEmailVerified(true);
        user.setActive(true);
        userRepository.save(user);
        userActivityService.logActivity(email, UserActivityAction.EMAIL_VERIFIED, ipAddress);
        //after all the verification and operation we have to delete the otp from the database as it will keep on growing the database
        emailVerificationOtpRepository.delete(emailOtp);
    }
    public AuthResponseDTO signup(SignupRequestDTO signupRequestDTO, String ipAddress) {
        //here we ae checking if the user hav not already registered through the same mail
        //if the user have the email already registered than it must n the database
        if (userRepository.findByEmail(signupRequestDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        //confirmed password must be same to the get password
        if (!signupRequestDTO.getPassword().equals(signupRequestDTO.getConfirmedPassword())) {
            throw new PasswordMismatchException("passwords does not match");
        }
        //setting the field which coming from the client into the proper format
        User user = User.builder().role(Role.USER).name(signupRequestDTO.getName()).email(signupRequestDTO.getEmail()).password(passwordEncoder.encode(signupRequestDTO.getPassword())).active(false).emailVerified(false).failedLoginAttempts(0).build();
        userRepository.save(user);
        sendEmailVerificationOtp(user.getEmail(), ipAddress);
        //returning the response into the response DTO
        return AuthResponseDTO.builder().email(user.getEmail()).message("Signup successful. Please verify your email.").build();
    }

}
