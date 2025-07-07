package com.demo.dao;

import com.demo.model.Employee;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface employeeDao extends JpaRepository<Employee,Long>
{
    Employee findByLoginId(String eid);
    void deleteByLoginId(String loginId);
    boolean existsByEmail(String email);
    boolean existsByLoginId(String loginId);
}
