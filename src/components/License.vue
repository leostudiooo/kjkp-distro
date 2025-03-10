<template>
    <details>
        <summary>
            <h3>使用规约</h3>
        </summary>
        <div class="content">
            <p>本站分发的内容可以自由下载和使用。以任何形式使用本站内容时，都请注明出处（除非在文件中另有说明），并以相同形式共享。不得将下载的内容用于商业用途。使用规范细则请参考 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank" rel="license noopener noreferrer">CreativeCommons 署名—非商业性使用—相同方式共享 4.0</a> 许可协议，请务必仔细阅读并遵守。</p>
        </div>
    </details>
</template>

<style scoped>
details {
    padding-top: 1em;
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