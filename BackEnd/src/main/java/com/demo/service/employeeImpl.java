package com.demo.service;

import com.demo.dao.employeeDao;
import com.demo.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.security.config.Elements.PASSWORD_ENCODER;

@Service
public class employeeImpl implements employeeService {

    private static final PasswordEncoder passwordEncoder =new BCryptPasswordEncoder();

    @Autowired
    private employeeDao employeedao;

    @Override
    public void save(Employee e) {
        e.setPassword(passwordEncoder.encode(e.getPassword()));
        employeedao.save(e);
    }

    @Override
    public Employee findByLoginId(String loginId) {
        return employeedao.findByLoginId(loginId);
    }

    @Override
    public List<Employee> findAll() {
        return employeedao.findAll();
    }

    @Override
    public void deleteByLoginId(String loginId) {
        employeedao.deleteByLoginId(loginId);
    }

    @Override
    public void updateEmployee(Employee e) {
            employeedao.save(e);
    }

    @Override
    public boolean existsByLoginId(String loginId) {
        return employeedao.existsByLoginId(loginId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return employeedao.existsByEmail(email);
    }
}
