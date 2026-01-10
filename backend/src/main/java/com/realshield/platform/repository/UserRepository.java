package com.realshield.platform.repository;

import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

//find the user during login
//check if email already exist

public interface UserRepository extends JpaRepository<User, Long> , JpaSpecificationExecutor<User> {
    //login means that the user have already created the account, hence the Database must be containing the email

    //interface is declaring the methods not defining the body
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findById(Long id);

    long countByActive(boolean active);

    long countByRole(Role role);

    long countByEmailVerified(boolean emailVerified);



}
//JpaSpecificationExecutor enables dynamic filtering