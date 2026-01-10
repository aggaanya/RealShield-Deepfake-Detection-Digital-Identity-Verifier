package com.realshield.platform.controller.auth;


import com.realshield.platform.dto.*;
import com.realshield.platform.dto.auth.*;
import com.realshield.platform.exception.UnauthorizedException;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.UserRepository;
import com.realshield.platform.service.auth.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/send-verification-otp")
    public ResponseEntity<ApiResponse<Void>> sendEmailVerificationOtp(@Valid @RequestBody SendEmailOtpRequestDTO requestDTO, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        authService.sendEmailVerificationOtp(requestDTO.getEmail(), ipAddress);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).message("Email verification OTP sent successfully").data(null).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build()
        );
    }

    //controller only handel the HTTP concerns, extracting IP from the request, passes the data to the service layer and returns the clear response
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyOtpRequestDTO dto, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        authService.verifyEmail(dto.getEmail(), dto.getOtp(), ipAddress);
            return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).message("Email verified successfully").build());
    }

    //if client hit the signup api
    @PostMapping("/signup")
    //RequestBody maps the JSON into the DTO
    public ResponseEntity<ApiResponse<AuthResponseDTO>> signup(@Valid @RequestBody SignupRequestDTO requestDTO, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        AuthResponseDTO authResponse = authService.signup(requestDTO, ipAddress);
        ApiResponse<AuthResponseDTO> response = ApiResponse.<AuthResponseDTO>builder().success(true).message("user registered successfully").data(authResponse).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        //jwt
        Long userId = 1L;
        authService.logout(userId);
        ApiResponse<Void> response = ApiResponse.<Void>builder().success(true).message("logout successfully").data(null).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.ok(response);
    }

    //this is the api which tells who i am
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> getCurrentUser(@RequestHeader("X-USER-ID") Long userId, HttpServletRequest request) {
        AuthResponseDTO authResponseDTO = authService.getCurrent(userId);
        ApiResponse<AuthResponseDTO> response = ApiResponse.<AuthResponseDTO>builder().success(true).message("User details fetched successfully").data(authResponseDTO).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.ok(response);
    }

    //when the client hit the api, to send the token back
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestParam String token, @Valid @RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO, HttpServletRequest request) {
        authService.resetPassword(token, resetPasswordRequestDTO, request.getRemoteAddr());
        ApiResponse<Void> response = ApiResponse.<Void>builder().success(true).message("Password has been reset successfully").data(null).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.ok(response);
    }

    //this is the pai which will be hit 1st
    @PostMapping("/forget-password")
    public ResponseEntity<ApiResponse<Void>> forgetPassword(@Valid @RequestBody ForgetPasswordRequestDTO forgetPasswordRequestDTO, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        authService.forgetPassword(forgetPasswordRequestDTO, ipAddress);
        ApiResponse<Void> response = ApiResponse.<Void>builder().success(true).data(null).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).message("if the email exists, a password reset link has been sent.").build();
        return ResponseEntity.ok(response);
    }


    // TEMPORARY (will be removed after JWT)
    @PostMapping("/me/password")
    public ResponseEntity<ApiResponse<ChangePasswordResponseDTO>> changePassword(@RequestParam Long userId, @Valid @RequestBody ChangePasswordRequestDTO requestDTO, HttpServletRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UnauthorizedException("User not found"));
        ChangePasswordResponseDTO response = authService.changePassword(user, requestDTO);
        return ResponseEntity.ok(ApiResponse.<ChangePasswordResponseDTO>builder().success(true).message("Password changed successfully").data(response).path(request.getRequestURI()).build());
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO requestDTO, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        AuthResponseDTO authResponse = authService.login(requestDTO, ipAddress);
        ApiResponse<AuthResponseDTO> response = ApiResponse.<AuthResponseDTO>builder().success(true).message("user login successfully").data(authResponse).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.ok(response);
    }
}
