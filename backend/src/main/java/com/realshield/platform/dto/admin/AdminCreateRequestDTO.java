package com.realshield.platform.dto.admin;

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
    private String name;
    private String email;
    private String password;
}
