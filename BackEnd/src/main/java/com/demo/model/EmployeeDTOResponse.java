package com.demo.model;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;
@Getter
@Setter
public class EmployeeDTOResponse {
    private int eid;
    private String firstname;
    private String lastname;
    private long phone;
    private String email;
    private String address;
    private String loginId;
    private String photoBase64; // << this is the key for image display

    public EmployeeDTOResponse(Employee employee) {
        this.eid = employee.getEid();
        this.firstname = employee.getFirstname();
        this.lastname = employee.getLastname();
        this.phone = employee.getPhone();
        this.email = employee.getEmail();
        this.address = employee.getAddress();
        this.loginId = employee.getLoginId();
        this.photoBase64 = Base64.getEncoder().encodeToString(employee.getPhoto());
    }

    // Getters and optionally setters
}
