package com.realshield.platform.service.user;

import com.realshield.platform.dto.user.UserActivityDTO;
import com.realshield.platform.exception.UserNotFoundException;
import com.realshield.platform.model.User;
import com.realshield.platform.model.UserActivity;
import com.realshield.platform.model.UserActivityAction;
import com.realshield.platform.repository.UserActivityRepository;
import com.realshield.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserActivityService {

    //this is the constructor injection
    private final UserActivityRepository userActivityRepository;
    private final UserRepository userRepository;
    public UserActivityService(UserActivityRepository userActivityRepository, UserRepository userRepository) {
        this.userActivityRepository = userActivityRepository;
        this.userRepository = userRepository;
    }

    public void logActivity(String email, UserActivityAction action, String ipAddress) {
        User user = userRepository.findByEmail(email).orElse(null);
        UserActivity activity = UserActivity.builder().email(email).action(action).ipAddress(ipAddress).timestamp(LocalDateTime.now()).user(user).build();
        userActivityRepository.save(activity);
    }

    public List<UserActivityDTO> getUserActivity(String email) {
        List<UserActivity> activities = userActivityRepository.findByEmailOrderByTimestampDesc(email);

        return activities.stream().map(activity -> {
            UserActivityDTO dto = new UserActivityDTO();
            dto.setAction(activity.getAction().name());
            dto.setEmail(activity.getEmail());
            dto.setIpAddress(activity.getIpAddress());
            dto.setTimestamp(activity.getTimestamp());
            return dto;
        }).toList();
    }
}
