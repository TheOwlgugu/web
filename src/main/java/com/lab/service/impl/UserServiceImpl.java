package com.lab.service.impl;

import com.lab.dao.UserDao;
import com.lab.entity.User;
import com.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean register(User user) throws Exception {
        if (user == null) {
            throw new IllegalArgumentException("用户信息不能为空");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("邮箱不能为空");
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new IllegalArgumentException("密码长度不能少于6位");
        }
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }

        if (isEmailExists(user.getEmail())) {
            System.out.println("注册失败，邮箱已存在: " + user.getEmail());
            throw new Exception("该邮箱已被注册");
        }

        int result = userDao.insertUser(user);

        if (result > 0) {
            System.out.println("用户注册成功: " + user.getEmail());
            return true;
        }

        System.out.println("用户注册失败: " + user.getEmail());
        return false;
    }

    @Override
    public User login(String email, String password) {
        if (email == null || email.trim().isEmpty()) {
            System.out.println("登录失败，邮箱为空");
            return null;
        }
        if (password == null || password.trim().isEmpty()) {
            System.out.println("登录失败，密码为空");
            return null;
        }

        User user = userDao.findUserByEmailAndPassword(email, password);

        if (user != null) {
            System.out.println("用户登录成功: " + email);
        } else {
            System.out.println("用户登录失败，邮箱或密码错误: " + email);
        }

        return user;
    }

    @Override
    public boolean isEmailExists(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return userDao.checkEmailExists(email) > 0;
    }

    @Override
    public User getUserByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return null;
        }
        return userDao.findUserByEmail(email);
    }
}