<template>
    <meta charset="utf-8" lang="zh-CN">
    <meta name="keywords" content="锟斤拷P,配布站,伴奏,工程">
    <meta name="description" content="锟斤拷P的配布站，用以下载伴奏和工程文件。">

    <BackToMain />

    <div class="wrapper">
        <h1 class="title">Pandora's<br>Parallel Box</h1>
        <div class="tips">请准确地输入所需歌曲的完整名字，选择文件类型，然后点击搜索并下载按钮。</div>

        <SearchBar :projectInfo="projectInfo" @notFound="notFound = $event" @download="downloadFile" />

        <p v-if="notFound" class="error-message">
            似乎没有找到文件。<br>
            请检查拼写是否正确且完整、是否已经选择文件类型。
            如果确实没有你想要的文件，请<a href="mailto:me@烫烫烫的锟斤拷.top?subject=%E9%85%8D%E5%B8%83%E7%AB%99%E6%96%87%E4%BB%B6%E7%BC%BA%E5%A4%B1%E9%97%AE%E9%A2%98">发邮件</a>告诉我。可能不能及时回复，请谅解。
        </p>

        <License />
    </div>

    <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectsJson from './projects.json'
import SearchBar from './components/SearchBar.vue'
import BackToMain from './components/BackToMain.vue'
import Footer from './components/Footer.vue'
import License from './components/License.vue'

const notFound = ref(false)
const projectInfo = ProjectsJson.projectInfo

function downloadFile(fileUrl: string, fileName: string) {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

document.title = "Paradox | 锟斤拷的配布站"
</script>

<style>
@import './styles/theme.css';

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}

.wrapper {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

.title {
    font-weight: bolder;
    font-size: 4em;
    line-height: normal;
    margin-bottom: 1rem;
}

.tips {
    line-height: 1.6;
    margin-bottom: 2rem;
}

.error-message {
    margin-top: 1em;
}

.footer {
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 5%;
    width: 100%;
}
</style>