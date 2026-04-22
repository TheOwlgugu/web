// 课程特色组件
const Features = {
    template: `
        <div class="features-section">
            <h2 class="block-title" style="margin-bottom: 1.5rem;">课程特色</h2>

            <div class="feature-item">
                <div class="feature-title">丰富的教学服务</div>
                <div class="feature-desc">特色教学服务功能，各种配套教学服务，在线学习从未如此轻松。</div>
                <a class="feature-link" @click.prevent="$emit('learn-now', '丰富的教学服务')">
                    马上学习 <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="feature-item">
                <div class="feature-title">多元的学习方式</div>
                <div class="feature-desc">知识提炼、答疑解惑、实时互动、开发有特色的教学服务方式。</div>
                <a class="feature-link" @click.prevent="$emit('learn-now', '多元的学习方式')">
                    马上学习 <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="feature-item">
                <div class="feature-title">高品质的学习体验</div>
                <div class="feature-desc">多屏合一，随时学习，随时在线，学习记录一目了然，知识充电不再受限。</div>
                <a class="feature-link" @click.prevent="$emit('learn-now', '高品质的学习体验')">
                    马上学习 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `
};