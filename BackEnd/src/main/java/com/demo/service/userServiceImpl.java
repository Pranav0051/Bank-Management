package com.demo.service;

import com.demo.dao.userDao;
import com.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userServiceImpl implements userServices{

    @Autowired
    private userDao userDao;

    @Override
    public void save(User u) {
        userDao.save(u);
    }

    @Override
    public User findByUid(int uid) {
        return userDao.findByUid(uid);
    }

    @Override
    public void deleteByUid(int uid) {
        userDao.deleteByUid(uid);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User FindByUserName(String userName) {
        return userDao.FindByUserName(userName);
    }

    @Override
    public void deleteByUserName(String username) {
         userDao.deleteByUserName(username);

    }

    @Override
    public void updateUser(User user) {
        userDao.save(user);
    }

    @Override
    public boolean existByUserName(String username) {
        return userDao.existByUserName(username);
    }

    @Override
    public boolean existByEmail(String email) {
        return userDao.existByEmail(email);
    }

}
