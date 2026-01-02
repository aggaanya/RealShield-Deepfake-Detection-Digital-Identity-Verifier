package com.realshield.platform.repository;

import com.realshield.platform.model.EmailVerificationOtp;
import com.realshield.platform.model.PasswordResetOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface EmailVerificationOtpRepository extends JpaRepository<EmailVerificationOtp, Long> {
    //this fetches the latest otp for the given email
    Optional<EmailVerificationOtp> findByOtp(String email);
    @Modifying
    Optional<EmailVerificationOtp> deleteByEmail(String email);
    Optional<PasswordResetOtp> findTopByEmailOrderByExpiryTimeDesc(String email);
}
