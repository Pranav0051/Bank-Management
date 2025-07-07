package com.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailServices {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmployeeCredentials(String toEmail, String loginId,String password){
        SimpleMailMessage massage = new SimpleMailMessage();
        massage.setFrom("securebank1.services@gmail.com");
        massage.setTo(toEmail);
        massage.setSubject("Your Employee Login Credentials");
        massage.setText(
                "Dear Employee,\n\n"+
                        "Here are Your login credentials:\n"+
                        "Login ID: "+loginId+"\n"+
                        "Password: "+password+ "\n"+
                        "Please log in and change your password after first login.\n\n"+
                        "Best regards,\nBank Admin Department"
        );
        javaMailSender.send(massage);
    }
}
