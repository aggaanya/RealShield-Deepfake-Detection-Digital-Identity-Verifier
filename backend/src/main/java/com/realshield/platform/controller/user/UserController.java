package com.realshield.platform.controller.user;

import com.realshield.platform.dto.ApiResponse;
import com.realshield.platform.dto.auth.VerifyOtpRequestDTO;
import com.realshield.platform.dto.user.*;
import com.realshield.platform.model.UserActivity;
import com.realshield.platform.service.user.UserActivityService;
import com.realshield.platform.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserActivityService userActivityService;
    public UserController(UserService userService, UserActivityService userActivityService) {
        this.userService = userService;
        this.userActivityService = userActivityService;
    }

    @PutMapping("/me/password")
    //this is the endpoint to change user password, by entering the
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestParam String email, @RequestBody ChangePasswordDTO dto) {
        userService.changePassword(email, dto);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User password changed successfully")
                        .data(null)
                        .build()
        );
    }

    @GetMapping("/me/activity")
    public ResponseEntity<ApiResponse<List<UserActivity>>> getUserActivity(
            @RequestParam String email) {

        List<UserActivity> activities = userActivityService.getUserActivity(email);

        return ResponseEntity.ok(
                ApiResponse.<List<UserActivity>>builder()
                        .success(true)
                        .message("User activity fetched successfully")
                        .data(activities)
                        .build()
        );
    }


    @PostMapping("/me/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestBody VerifyOtpRequestDTO dto) {

        userService.verificationOtp(dto.getOtp());

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Email verified successfully")
                        .data(null)
                        .build()
        );
    }



    //this is the endpoint to change user email
    @PutMapping("/me/email")
    public ResponseEntity<ApiResponse<Void>> changeEmail(@RequestParam String email, @RequestBody ChangeEmailDTO dto) {
        userService.changeEmail(email, dto);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User email changed successfully")
                        .data(null)
                        .build()
        );
    }

    //update user profile
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<Void>> updateProfile(@RequestParam String email, @RequestBody UpdateUserDTO dto) {
        userService.updateProfile(email, dto);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User profile updated successfully")
                        .data(null)
                        .build()
        );
    }

    //return user profile
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getProfile(@RequestParam String email) {
        UserProfileDTO userProfileDTO = userService.getProfile(email);
        return ResponseEntity.ok(ApiResponse.<UserProfileDTO>builder().success(true).message("User profile fetched successfully").data(userProfileDTO).build());
    }

    @PostMapping("/send-verification-otp")
    public ResponseEntity<ApiResponse<Object>> sendVerificationOtp(@RequestParam String email) {
        userService.generateEmailVerificationOtp(email);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Verification OTP sent successfully")
                        .data(null)
                        .build()
        );
    }

    //delete user profile
    @DeleteMapping("/me")
    //we are using Void here because we are not returning any data, only performing an action,
    //does not return any data in the response body
    public ResponseEntity<ApiResponse<Void>> deleteProfile(@RequestParam String email) {
        userService.deleteAccount(email);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User profile deactivated successfully")
                        .data(null)
                        .build()
        );
    }

    @PostMapping("/me/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        userService.logout();
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).message("User logged out successfully").data(null).build());
    }
}
