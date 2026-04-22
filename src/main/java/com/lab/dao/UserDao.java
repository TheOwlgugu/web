package com.lab.dao;

import com.lab.entity.User;
import org.apache.ibatis.annotations.Param;

/**
 * 用户数据访问接口
 */
public interface UserDao {

    /**
     * 插入用户（注册）
     * @param user 用户对象
     * @return 影响行数
     */
    int insertUser(User user);

    /**
     * 根据邮箱查询用户
     * @param email 邮箱
     * @return 用户对象
     */
    User findUserByEmail(String email);

    /**
     * 根据邮箱和密码查询用户（登录验证）
     * @param email 邮箱
     * @param password 密码
     * @return 用户对象
     */
    User findUserByEmailAndPassword(@Param("email") String email,
                                    @Param("password") String password);

    /**
     * 检查邮箱是否已存在
     * @param email 邮箱
     * @return 存在数量
     */
    int checkEmailExists(String email);

    /**
     * 根据用户名查询用户
     * @param username 用户名
     * @return 用户对象
     */
    User findUserByUsername(String username);
}