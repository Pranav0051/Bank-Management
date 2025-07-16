package com.demo.model;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eid;

    private  String firstname;
    private String lastname;
    private long phone;
    private String email;
    private String password;
    private String address;

    @Column(name = "login_id")
    private String loginId;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] photo;
}
