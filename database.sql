-- 创建数据库
CREATE DATABASE IF NOT EXISTS ssm_lab
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ssm_lab;

-- 创建用户表
CREATE TABLE `user` (
                        `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
                        `username` VARCHAR(50) NOT NULL COMMENT '用户名',
                        `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '电子邮箱',
                        `password` VARCHAR(255) NOT NULL COMMENT '密码(加密存储)',
                        `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                        `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 插入测试数据
INSERT INTO `user` (`username`, `email`, `password`)
VALUES ('测试用户', 'test@example.com', '123456');
-- 注意：生产环境密码应使用BCrypt等加密方式