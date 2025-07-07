package com.demo.service;

import com.demo.dao.employeeDao;
import com.demo.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class employeeServiceDetailsImpl implements UserDetailsService {
    @Autowired
    private employeeDao employeeDao;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        Employee employee =employeeDao.findByLoginId(loginId);
        if(employee!=null){
            return User.builder()
                    .username(employee.getLoginId())
                    .password(employee.getPassword())
                    .authorities(Collections.emptyList())
                    .build();
        }
        throw new UsernameNotFoundException("User not found with loginId: "+loginId);
    }
}
