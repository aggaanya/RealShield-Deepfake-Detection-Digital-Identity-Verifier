package com.realshield.platform.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

//we are creating the separate entity to log user activities, user can have many activities
//Activities grow over a time, and should not be mixed with User table


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_activities")
public class UserActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    //which user performed the action
    private String email;

    @Column(nullable = false)
    //what action was performed
    private String action;

    @Column(nullable = false)
    //from which ip address
    private String ipAddress;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
