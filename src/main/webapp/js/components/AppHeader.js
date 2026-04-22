// 头部组件（包含 Logo 和 登录/注册按钮）
const AppHeader = {
    template: `
        <div class="hero-section">
            <div class="hero-top-bar">
                <div class="brand-logo">云端编程</div>
                <div class="auth-links" v-if="!isLoggedIn">
                    <a class="login-link" @click.prevent="$emit('show-login')">登录</a>
                    <a class="register-link" @click.prevent="$emit('show-register')">注册</a>
                </div>
                <div class="user-info" v-else>
                    <span class="welcome-msg">欢迎，{{ userInfo?.username || '用户' }}</span>
                    <a class="logout-link" @click.prevent="$emit('logout')">退出</a>
                </div>
            </div>
        </div>
    `,
    props: {
        isLoggedIn: {
            type: Boolean,
            default: false
        },
        userInfo: {
            type: Object,
            default: null
        }
    }
};