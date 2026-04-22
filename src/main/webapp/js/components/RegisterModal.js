// 注册模态框组件 - 连接SSM后端
const RegisterModal = {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMsg: '',
            successMsg: '',
            loading: false
        };
    },
    const response = await fetch('http://localhost:8081/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        })
    });
    template: `
        <div class="modal-overlay" :class="{ show: visible }" @click.self="close">
            <div class="modal-container">
                <span class="modal-close" @click="close">&times;</span>
                <h2>创建账号</h2>
                <input type="text" v-model="username" placeholder="用户名">
                <input type="email" v-model="email" placeholder="电子邮箱">
                <input type="password" v-model="password" placeholder="密码">
                <input type="password" v-model="confirmPassword" placeholder="确认密码" @keyup.enter="handleRegister">
                <div class="error-msg" :class="{ show: errorMsg }">{{ errorMsg }}</div>
                <div class="success-msg" :class="{ show: successMsg }">{{ successMsg }}</div>
                <button @click="handleRegister" :disabled="loading">
                    {{ loading ? '注册中...' : '注 册' }}
                </button>
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
            this.username = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.errorMsg = '';
            this.successMsg = '';
            this.loading = false;
        },
        async handleRegister() {
            // 前端校验
            if (!this.username || !this.email || !this.password) {
                this.errorMsg = '请填写所有字段';
                this.successMsg = '';
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.errorMsg = '两次输入的密码不一致';
                this.successMsg = '';
                return;
            }

            if (this.password.length < 6) {
                this.errorMsg = '密码长度至少6位';
                this.successMsg = '';
                return;
            }

            // 邮箱格式校验
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                this.errorMsg = '邮箱格式不正确';
                this.successMsg = '';
                return;
            }

            this.loading = true;
            this.errorMsg = '';
            this.successMsg = '';

            try {
                // 调用后端注册API
                const response = await fetch('http://localhost:8081/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmPassword
                    })
                });

                const result = await response.json();

                if (result.code === 200) {
                    this.successMsg = result.message || '注册成功！';

                    setTimeout(() => {
                        this.close();
                        alert(`注册成功！请使用 ${this.email} 登录`);
                        this.resetForm();
                    }, 1000);
                } else {
                    this.errorMsg = result.message || '注册失败';
                }
            } catch (error) {
                console.error('注册请求失败:', error);
                this.errorMsg = '网络错误，请确保后端服务已启动';
            } finally {
                this.loading = false;
            }
        }
    }
};