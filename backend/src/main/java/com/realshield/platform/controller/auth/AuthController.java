package com.realshield.platform.controller.auth;


import com.realshield.platform.dto.*;
import com.realshield.platform.dto.auth.*;
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

    @Autowired
    private AuthService authService;



    //if client hit the signup api
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> signup(@Valid @RequestBody SignupRequestDTO requestDTO, HttpServletRequest request) {
        AuthResponseDTO authResponse = authService.signup(requestDTO);
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

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> getCurrentUser(HttpServletRequest request) {
        //jwt
        Long userId = 1L;
        AuthResponseDTO authResponseDTO = authService.getCurrent(userId);

        ApiResponse<AuthResponseDTO> response = ApiResponse.<AuthResponseDTO>builder().success(true).message("User details fetched successfully").data(authResponseDTO).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @RequestParam String token,
            @Valid @RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO,
            HttpServletRequest request) {

        authService.resetPassword(token, resetPasswordRequestDTO);

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .success(true)
                .message("Password has been reset successfully")
                .data(null)
                .error(null)
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.ok(response);
    }


    @PostMapping("/forget-password")
    public ResponseEntity<ApiResponse<Void>> forgetPassword(@Valid @RequestBody ForgetPasswordRequestDTO forgetPasswordRequestDTO, HttpServletRequest request) {
        authService.forgetPassword(forgetPasswordRequestDTO);
        ApiResponse<Void> response = ApiResponse.<Void>builder().success(true).data(null).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).message("if the email exists, a password reset link has been sent.").build();
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO requestDTO, HttpServletRequest request) {
        AuthResponseDTO authResponse = authService.login(requestDTO);
        ApiResponse<AuthResponseDTO> response = ApiResponse.<AuthResponseDTO>builder().success(true).message("user login successfully").data(authResponse).error(null).timestamp(LocalDateTime.now()).path(request.getRequestURI()).build();
        return ResponseEntity.ok(response);
    }
}
