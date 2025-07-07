package com.demo.service;

import com.demo.model.User;

import java.util.List;

public interface userServices {
    void save(User u);
    User findByUid(int uid);
    void deleteByUid(int uid);
    List<User> findAll();
    User FindByUserName(String userName);
    void deleteByUserName(String username);
    void updateUser(User user);

    boolean existByUserName(String username);
    boolean existByEmail(String mail);
}
