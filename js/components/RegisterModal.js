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
    template: `
        <div class="modal-overlay" :class="{ show: visible }" @click.self="close">
            <div class="modal-container">
                <span class="modal-close" @click="close">&times;</span>
                <h2>创建账号</h2>
                <input type="text" v-model="username" placeholder="用户名">
                <input type="email" v-model="email" placeholder="电子邮箱">
                <input type="password" v-model="password" placeholder="密码（至少6位）">
                <input type="password" v-model="confirmPassword" placeholder="确认密码" @keyup.enter="handleRegister">
                <div class="error-msg" :class="{ show: errorMsg }">{{ errorMsg }}</div>
                <div class="success-msg" :class="{ show: successMsg }">{{ successMsg }}</div>
                <button @click="handleRegister" :disabled="loading">{{ loading ? '注册中...' : '注 册' }}</button>
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

            this.loading = true;
            this.errorMsg = '';

            try {
                // 检查邮箱是否已存在
                const checkRes = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(this.email)}`);
                const existing = await checkRes.json();

                if (existing.length > 0) {
                    this.errorMsg = '该邮箱已被注册';
                    this.loading = false;
                    return;
                }

                // 创建新用户
                const newUser = {
                    id: Date.now(),
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    createdAt: new Date().toISOString()
                };

                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });

                if (response.ok) {
                    const savedUser = await response.json();
                    this.successMsg = '注册成功！正在跳转...';

                    setTimeout(() => {
                        localStorage.setItem('currentUser', JSON.stringify(savedUser));
                        this.close();
                        alert(`注册成功！欢迎 ${this.username}！`);
                        this.resetForm();
                    }, 1000);
                } else {
                    this.errorMsg = '注册失败，请重试';
                }
            } catch (error) {
                console.error('注册错误:', error);
                this.errorMsg = '服务器连接失败，请确保 json-server 已启动';
            } finally {
                this.loading = false;
            }
        }
    }
};