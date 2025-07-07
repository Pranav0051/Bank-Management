package com.demo.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class UserDTOResponse {
    private String firstName;
    private String lastName;
    private String email;
    private long phone;
    private String address;
    private String userName;
    private String password;
    private String photoBase64;

    public UserDTOResponse(User user){
        this.firstName=user.getFirstName();
        this.lastName=user.getLastName();
        this.userName=user.getUsername();
        this.password=user.getPassword();
        this.email=user.getEmail();
        this.phone=user.getPhone();
        this.address=user.getAddress();
        this.photoBase64= Base64.getEncoder().encodeToString(user.getPhoto());
    }
}
