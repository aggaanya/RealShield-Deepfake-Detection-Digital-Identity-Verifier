package com.realshield.platform.repository;

import com.realshield.platform.model.User;
import com.realshield.platform.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    List<UserActivity> findByEmailOrderByTimestampDesc(String email);

}
