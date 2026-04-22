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
                <button @click="handleLogin" :disabled="loading">{{ loading ? '登录中...' : '登 录' }}</button>
                <div class="demo-hint">测试账号: test@example.com / 123456</div>
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

            try {
                // 查询用户
                const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(this.email)}`);
                const users = await response.json();

                if (users.length > 0 && users[0].password === this.password) {
                    this.successMsg = '登录成功！';
                    localStorage.setItem('currentUser', JSON.stringify(users[0]));
                    setTimeout(() => {
                        this.close();
                        alert(`欢迎回来，${users[0].username}！`);
                        this.resetForm();
                    }, 800);
                } else {
                    this.errorMsg = '邮箱或密码错误';
                }
            } catch (error) {
                console.error('登录错误:', error);
                this.errorMsg = '服务器连接失败，请确保 json-server 已启动';
            } finally {
                this.loading = false;
            }
        }
    }
};