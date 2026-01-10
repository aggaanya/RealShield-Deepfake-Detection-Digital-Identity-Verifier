package com.realshield.platform.service.admin;

import com.realshield.platform.dto.admin.AdminDashboardStatsDTO;
import com.realshield.platform.model.Role;
import com.realshield.platform.repository.UserRepository;
import org.springframework.stereotype.Service;


//this is the AdminDashboardService in which the logic for the api dashboard api is implements
//This service is responsible for fetching and calculating
//user statistics required by the admin dashboard.

@Service
public class AdminDashboardService implements AdminDashboardInterface{

    private final UserRepository userRepository;

    public AdminDashboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AdminDashboardStatsDTO getDashboardStats() {
        //counting the number of users in the database
        long totalUsers = userRepository.count();
        //counting the active users
        long activeUsers = userRepository.countByActive(true);
        //counting the inactive users
        long inactiveUsers = userRepository.countByActive(false);
        //counting the admin and superAdmin users
        long adminUsers = userRepository.countByRole(Role.ADMIN) + userRepository.countByRole(Role.SUPER_ADMIN);
        //counting the email verified users
        long emailVerifiedUsers = userRepository.countByEmailVerified(true);
        //counting the email not users
        long emailNotVerifiedUsers = userRepository.countByEmailVerified(false);
        return new AdminDashboardStatsDTO(totalUsers, activeUsers, inactiveUsers, adminUsers, emailVerifiedUsers, emailNotVerifiedUsers);
    }
}
