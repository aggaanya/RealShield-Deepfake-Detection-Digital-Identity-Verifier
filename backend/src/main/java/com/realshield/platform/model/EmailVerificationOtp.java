package com.realshield.platform.model;


//this is the model for the OTP as part of email verification process
//this is the model, which will generate the OTP, store OTP with expiry
//limit the retry, verify the otp, and last make the email verified true
//hence we have to build the separate model for the otp system


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "email_verification_otp")
public class EmailVerificationOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @Column(nullable = false)
    //which email is being verified
    private String email;

    @Column(nullable = false, length = 6)
    @NotBlank
    @Size(min = 6, max = 6)
    @Pattern(regexp = "\\d{6}", message = "OTP must be 6 digits")
    //this is the 6 digit otp, use for verification
    private String otp;

    @NotNull
    @FutureOrPresent
    @JsonFormat
    @Column(name = "expiry_time", nullable = false)
    //the expiry time for the otp
    private LocalDateTime expiryTime;

    @Column(nullable = false)
    //number of attempts made to verify the otp
    private int attempts;

    @Column(nullable = false)
    //prevents reuse of otp once verified
    private boolean verified;
}
