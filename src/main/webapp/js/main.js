// Vue 主入口文件 - 集成后端登录状态
const { createApp } = Vue;

// 创建 Vue 应用
const app = createApp({
    data() {
        return {
            showLoginModal: false,
            showRegisterModal: false,
            isLoggedIn: false,
            userInfo: null
        };
    },
    mounted() {
        // 检查登录状态
        this.checkLoginStatus();
    },
    methods: {
        // 检查登录状态
        async checkLoginStatus() {
            try {
                const response = await fetch('http://localhost:8080/api/user/check', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.code === 200 && result.data?.loggedIn) {
                    this.isLoggedIn = true;
                    this.userInfo = result.data;
                } else {
                    this.isLoggedIn = false;
                    this.userInfo = null;
                }
            } catch (error) {
                console.error('检查登录状态失败:', error);
                // 降级到localStorage
                this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (this.isLoggedIn) {
                    const userInfoStr = localStorage.getItem('userInfo');
                    if (userInfoStr) {
                        this.userInfo = JSON.parse(userInfoStr);
                    }
                }
            }
        },

        // 登录成功处理
        handleLoginSuccess(userData) {
            this.isLoggedIn = true;
            this.userInfo = userData;
            this.showLoginModal = false;
        },

        // 登出
        async handleLogout() {
            try {
                await fetch('http://localhost:8080/api/user/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (error) {
                console.error('登出请求失败:', error);
            }

            this.isLoggedIn = false;
            this.userInfo = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            alert('已安全退出登录');
        },

        // 马上学习按钮事件处理
        handleLearnNow(moduleName) {
            if (!this.isLoggedIn) {
                if (confirm('请先登录后再开始学习！')) {
                    this.showLoginModal = true;
                }
                return;
            }
            const msg = moduleName ? `开启「${moduleName}」学习之旅！` : '开启学习之旅！';
            alert(`✨ ${msg}\n\n云端编程实验室，边学边练，快速成长！`);
        },

        // 了解详情按钮事件处理
        handleLearnMore(moduleName) {
            alert(`📖 「${moduleName}」模块介绍\n\n该模块提供完整的在线编程环境，支持实时编译、代码保存、项目分享等功能。`);
        }
    }
});

// 注册所有组件
app.component('app-header', AppHeader);
app.component('app-hero', AppHero);
app.component('app-lab-section', LabSection);
app.component('app-features', Features);
app.component('app-footer', AppFooter);
app.component('login-modal', LoginModal);
app.component('register-modal', RegisterModal);

// 挂载应用
app.mount('#app');

console.log('Vue 应用已启动，已集成SSM后端API');