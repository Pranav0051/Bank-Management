package com.demo.dao;

import com.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userDao extends JpaRepository<User,Integer> {
    User FindByUserName(String userName);
    void deleteByUserName(String username);

    boolean existByUserName(String username);
    boolean existByEmail(String mail);

    User findByUid(int uid);

    void deleteByUid(int uid);
}
