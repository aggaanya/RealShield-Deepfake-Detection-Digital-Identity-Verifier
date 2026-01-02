package com.realshield.platform.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//role is a backend security concepts does not have to be shown on the UI

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //the ID is how the user will uniquely identify each user from the backend, and the user will never see this, as this is the backend process
    //this is the primary key
    private Long id;

    @NotBlank
    //this annotation tells spring that this field is mandatory, without this field the request will be rejected
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "password is required")
    @JsonIgnore
    private String password;

    //even though our UI does not show the role, the backend still needs to have it
    //as this will control what a user can access
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

   private String address;

   private String phoneNumber;

   @Column(nullable = false)
   private boolean active = true;

   @Column(nullable = false)
   //new user will have emailVerified as false by default
    private boolean emailVerified = false;

}
