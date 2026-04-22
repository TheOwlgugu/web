// 登录模态框组件 - 连接SSM后端
const LoginModal = {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
            successMsg: '',
            loading: false
        };
    },
    template: `
        <div class="modal-overlay" :class="{ show: visible }" @click.self="close">
            <div class="modal-container">
                <span class="modal-close" @click="close">&times;</span>
                <h2>欢迎回来</h2>
                <input type="email" v-model="email" placeholder="电子邮箱" @keyup.enter="handleLogin">
                <input type="password" v-model="password" placeholder="密码" @keyup.enter="handleLogin">
                <div class="error-msg" :class="{ show: errorMsg }">{{ errorMsg }}</div>
                <div class="success-msg" :class="{ show: successMsg }">{{ successMsg }}</div>
                <button @click="handleLogin" :disabled="loading">
                    {{ loading ? '登录中...' : '登 录' }}
                </button>
                <div class="demo-hint">演示账号: test@example.com / 123456</div>
            </div>
        </div>
    `,
    watch: {
        visible(newVal) {
            if (!newVal) {
                this.resetForm();
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        resetForm() {
            this.email = '';
            this.password = '';
            this.errorMsg = '';
            this.successMsg = '';
            this.loading = false;
        },
        async handleLogin() {
            if (!this.email || !this.password) {
                this.errorMsg = '请填写邮箱和密码';
                this.successMsg = '';
                return;
            }

            this.loading = true;
            this.errorMsg = '';
            this.successMsg = '';

            try {
                // 调用后端登录API
                const response = await fetch('http://localhost:8081/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',  // 携带cookie
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                const result = await response.json();

                if (result.code === 200) {
                    this.successMsg = result.message || '登录成功！';
                    // 保存登录状态到localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    if (result.data) {
                        localStorage.setItem('userInfo', JSON.stringify(result.data));
                    }

                    setTimeout(() => {
                        this.close();
                        alert(`欢迎回来，${result.data?.username || '用户'}！`);
                        this.resetForm();
                        // 触发登录成功事件，更新UI
                        this.$emit('login-success', result.data);
                    }, 800);
                } else {
                    this.errorMsg = result.message || '登录失败';
                }
            } catch (error) {
                console.error('登录请求失败:', error);
                this.errorMsg = '网络错误，请确保后端服务已启动';
            } finally {
                this.loading = false;
            }
        }
    }
};