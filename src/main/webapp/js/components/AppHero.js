// 主视觉组件（标题、副标题、马上学习按钮）
const AppHero = {
    template: `
        <div class="hero-section" style="padding-top: 0;">
            <h1 class="hero-title">云端编程，浏览器里边学边练</h1>
            <p class="hero-sub">软件定义一切，网络连接时空，学习软件技术，创造未来世界。</p>
            <button class="btn-primary-custom" @click="$emit('learn-now')">马上学习</button>
        </div>
    `
};