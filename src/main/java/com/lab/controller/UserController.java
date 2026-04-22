package com.lab.controller;

import com.lab.entity.ResponseResult;
import com.lab.entity.User;
import com.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String test() {
        return "Hello, backend is working!";
    }

    @PostMapping("/login")
    public ResponseResult<Map<String, Object>> login(@RequestBody Map<String, String> loginInfo,
                                                     HttpSession session) {
        String email = loginInfo.get("email");
        String password = loginInfo.get("password");

        System.out.println("收到登录请求: email=" + email);

        if (email == null || email.trim().isEmpty()) {
            return ResponseResult.error("邮箱不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseResult.error("密码不能为空");
        }

        try {
            User user = userService.login(email, password);

            if (user != null) {
                session.setAttribute("loginUser", user);

                Map<String, Object> data = new HashMap<>();
                data.put("userId", user.getId());
                data.put("username", user.getUsername());
                data.put("email", user.getEmail());

                System.out.println("登录成功: " + email);
                return ResponseResult.success("登录成功", data);
            } else {
                System.out.println("登录失败，邮箱或密码错误: " + email);
                return ResponseResult.error("邮箱或密码错误");
            }
        } catch (Exception e) {
            System.out.println("登录异常: " + e.getMessage());
            return ResponseResult.error("登录失败，请稍后重试");
        }
    }

    @PostMapping("/register")
    public ResponseResult<Map<String, Object>> register(@RequestBody Map<String, String> registerInfo) {
        String username = registerInfo.get("username");
        String email = registerInfo.get("email");
        String password = registerInfo.get("password");
        String confirmPassword = registerInfo.get("confirmPassword");

        System.out.println("收到注册请求: email=" + email + ", username=" + username);

        if (username == null || username.trim().isEmpty()) {
            return ResponseResult.error("用户名不能为空");
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseResult.error("邮箱不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseResult.error("密码不能为空");
        }
        if (!password.equals(confirmPassword)) {
            return ResponseResult.error("两次输入的密码不一致");
        }
        if (password.length() < 6) {
            return ResponseResult.error("密码长度不能少于6位");
        }

        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseResult.error("邮箱格式不正确");
        }

        try {
            if (userService.isEmailExists(email)) {
                System.out.println("注册失败，邮箱已存在: " + email);
                return ResponseResult.error("该邮箱已被注册");
            }

            User user = new User();
            user.setUsername(username.trim());
            user.setEmail(email.trim());
            user.setPassword(password);

            boolean success = userService.register(user);

            if (success) {
                Map<String, Object> data = new HashMap<>();
                data.put("email", email);
                data.put("username", username);

                System.out.println("注册成功: " + email);
                return ResponseResult.success("注册成功", data);
            } else {
                return ResponseResult.error("注册失败，请稍后重试");
            }
        } catch (Exception e) {
            System.out.println("注册异常: " + e.getMessage());
            return ResponseResult.error(e.getMessage());
        }
    }

    @GetMapping("/check")
    public ResponseResult<Map<String, Object>> checkLogin(HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");

        if (loginUser != null) {
            Map<String, Object> data = new HashMap<>();
            data.put("loggedIn", true);
            data.put("username", loginUser.getUsername());
            data.put("email", loginUser.getEmail());
            return ResponseResult.success(data);
        } else {
            Map<String, Object> data = new HashMap<>();
            data.put("loggedIn", false);
            return ResponseResult.success(data);
        }
    }

    @PostMapping("/logout")
    public ResponseResult<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseResult.success("登出成功", null);
    }
}