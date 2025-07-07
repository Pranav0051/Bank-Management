package com.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserDTO {
    private  String firstName;
    private String lastName;
    private String email;
    private  long phone;
    private String address;
    private String userName;
    private String password;

    private MultipartFile photo;
}
