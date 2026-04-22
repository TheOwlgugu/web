package com.lab.service;

import com.lab.entity.User;

/**
 * 用户服务接口
 */
public interface UserService {

    /**
     * 用户注册
     * @param user 用户信息
     * @return 注册是否成功
     * @throws Exception 业务异常
     */
    boolean register(User user) throws Exception;

    /**
     * 用户登录验证
     * @param email 邮箱
     * @param password 密码
     * @return 验证通过返回用户对象，否则返回null
     */
    User login(String email, String password);

    /**
     * 检查邮箱是否已被注册
     * @param email 邮箱
     * @return 是否已存在
     */
    boolean isEmailExists(String email);

    /**
     * 根据邮箱获取用户信息
     * @param email 邮箱
     * @return 用户对象
     */
    User getUserByEmail(String email);
}