package com.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EmployeeDTO {

    private int eid;

    private  String firstname;
    private String lastname;
    private long phone;
    private String email;
    private String password;
    private String address;

    private String loginId;

    private MultipartFile photo;


}
