// 可复用的实验室模块组件（高级Web编程实验室 / 双屏学习）
const LabSection = {
    props: {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        imgSrc: {
            type: String,
            default: ''
        }
    },
    template: `
        <div class="content-block">
            <h2 class="block-title">{{ title }}</h2>
            <p class="block-desc">{{ desc }}</p>
            <div class="image-placeholder">
                <img :src="imgSrc" :alt="title" class="lab-img" @error="handleImageError">
            </div>
            <a class="link-btn" @click.prevent="$emit('learn-more', title)">
                了解详情 <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `,
    methods: {
        handleImageError(e) {
            // 图片加载失败时使用占位图
            e.target.src = 'https://picsum.photos/600/300?random=' + Math.random();
        }
    }
};