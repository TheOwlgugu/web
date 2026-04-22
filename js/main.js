// Vue 主入口文件
const { createApp } = Vue;

// 创建 Vue 应用
const app = createApp({
    data() {
        return {
            showLoginModal: false,
            showRegisterModal: false
        };
    },
    methods: {
        // 马上学习按钮事件处理
        handleLearnNow(moduleName) {
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

console.log('Vue 应用已启动，组件化架构运行正常！');