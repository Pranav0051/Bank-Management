package com.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int uid;
    private long accountNo;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private long phone;
    private String address;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] photo;


}
