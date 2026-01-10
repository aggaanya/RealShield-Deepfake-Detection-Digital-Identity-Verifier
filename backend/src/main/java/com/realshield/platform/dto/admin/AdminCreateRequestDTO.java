package com.realshield.platform.dto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


//every dto must have no argument constructor, so JSON first craetes an empty object
//and then sets all the fields using setters from the JSON
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreateRequestDTO {
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;
    @Size(min = 8)
    private String password;
}
