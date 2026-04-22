package com.lab.dao.impl;

import com.lab.dao.UserDao;
import com.lab.entity.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.HashMap;
import java.util.Map;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insertUser(User user) {
        return sqlSessionTemplate.insert("com.lab.dao.UserDao.insertUser", user);
    }

    @Override
    public User findUserByEmail(String email) {
        return sqlSessionTemplate.selectOne("com.lab.dao.UserDao.findUserByEmail", email);
    }

    @Override
    public User findUserByEmailAndPassword(String email, String password) {
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);
        params.put("password", password);
        return sqlSessionTemplate.selectOne("com.lab.dao.UserDao.findUserByEmailAndPassword", params);
    }

    @Override
    public int checkEmailExists(String email) {
        return sqlSessionTemplate.selectOne("com.lab.dao.UserDao.checkEmailExists", email);
    }

    @Override
    public User findUserByUsername(String username) {
        return sqlSessionTemplate.selectOne("com.lab.dao.UserDao.findUserByUsername", username);
    }
}