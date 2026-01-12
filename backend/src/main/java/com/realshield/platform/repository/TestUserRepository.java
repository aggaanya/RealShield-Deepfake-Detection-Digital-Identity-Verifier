package com.realshield.platform.repository;

import com.realshield.platform.model.TestUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestUserRepository extends JpaRepository<TestUser, Long> {
}
