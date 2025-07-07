package com.demo.service;

import com.demo.model.Employee;

import java.util.List;

public interface employeeService {
     void save(Employee e);
     Employee findByLoginId(String loginId);
     List<Employee> findAll();
     void deleteByLoginId(String loginId);
     void updateEmployee(Employee e);
     boolean existsByLoginId(String loginId);
     boolean existsByEmail(String email);
}
