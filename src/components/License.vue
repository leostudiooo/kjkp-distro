<template>
    <details open>
        <summary>
            <h3>使用规约</h3>
        </summary>
        <div class="content">
            <p>在这里分发的内容可以在 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank" rel="license noopener noreferrer">知识共享 署名—非商业性使用—相同方式共享 4.0 (CC BY-NC-SA 4.0)</a> 许可下使用。</p>
            <p>可以使用 <a href="https://sdercolin.github.io/utaformatix3/" target="_blank" rel="noopener noreferrer">UtaFormatix</a> 转换工程为想要的格式。</p>
        </div>
    </details>
</template>

<style scoped>
details {
    padding-bottom: 1em;
}
summary {
    cursor: pointer;
}

summary h3 {
    display: inline;
}

.content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    text-align: justify;
}

details[open] .content {
    max-height: 1000px; /* 需要大于实际内容高度 */
    transition: max-height 0.3s ease-in-out;
}
</style>