package com.realshield.platform.service.admin;


import com.realshield.platform.dto.admin.AdminCreateRequestDTO;
import com.realshield.platform.dto.admin.AdminLoginRequestDTO;
import com.realshield.platform.dto.admin.AdminUserResponseDTO;
import com.realshield.platform.dto.admin.UserStatusUpdateRequestDTO;
import com.realshield.platform.model.Role;
import com.realshield.platform.model.User;
import com.realshield.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.stream.Collectors;


//here the logic for the APIS like admin authentication, management will be implemented
@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateUserStatus(Long userId, UserStatusUpdateRequestDTO requestDTO){
        //finding the user by ID
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        //updating the active status
        user.setActive(requestDTO.isActive());
        //saving the updated user
        userRepository.save(user);
    }


    public List<AdminUserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new AdminUserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.isActive(),
                        user.isEmailVerified()
                ))
                .collect(Collectors.toList());
    }

    //if the admin wants to log in
    public void login(AdminLoginRequestDTO adminLoginRequestDTO) {
        //logic for admin login will be implemented here

        //here finding the Admin by email
        User admin = userRepository.findByEmail(adminLoginRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN && admin.getRole() != Role.SUPER_ADMIN) {
            throw new RuntimeException("User is not an admin");
        }

        if(!admin.isActive()){
            throw new RuntimeException("Admin account is inactive");
        }

        //checking the password
        if(!passwordEncoder.matches(adminLoginRequestDTO.getPassword(), admin.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        //jwt token generation logic can be added here for session management
    }
    public void createAdmin(AdminCreateRequestDTO request) {
        //logic for creating admin will be implemented here
        User admin = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(admin);
    }
}
