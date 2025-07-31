<template>
    <meta charset="utf-8" lang="zh-CN">
    <meta name="keywords" content="锟斤拷P,配布站,伴奏,工程">
    <meta name="description" content="锟斤拷P的配布站，用以下载伴奏和工程文件。">

    <BackToMain />

    <div class="wrapper">
        <h1 class="title">Pandora's<br>Parallel Box</h1>
        <div class="tips">请准确地输入所需歌曲的完整名字，选择文件类型，然后点击搜索并下载按钮。</div>

        <SearchInterface 
            @search="handleSearch"
            ref="searchInterfaceRef"
        />


        <!-- Toast通知 -->
        <Toast 
            :show="showToast"
            :message="toastMessage"
            :type="toastType"
            :progress="downloadProgress"
            @close="showToast = false"
        />

        <License />
    </div>

    <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInterface from './components/SearchInterface.vue'
import BackToMain from './components/BackToMain.vue'
import Footer from './components/Footer.vue'
import License from './components/License.vue'
import Toast from './components/Toast.vue'

const loading = ref(false)
const toastMessage = ref('')
const showToast = ref(false)
const toastType = ref<'info' | 'success' | 'error' | 'warning'>('info')
const downloadProgress = ref<number | null>(null)
const searchInterfaceRef = ref()

async function handleSearch(keyword: string, fileType: string) {
  loading.value = true
  searchInterfaceRef.value?.setLoading(true)

  try {
    showToast.value = false
    toastMessage.value = ''
    downloadProgress.value = null
    
    const apiUrl = import.meta.env.PROD 
      ? 'https://api.烫烫烫的锟斤拷.top/api/search'
      : '/api/search'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        fileType
      })
    })

    if (response.ok) {
      const data = await response.json()
      
      // 显示准备下载
      toastMessage.value = '准备下载...'
      toastType.value = 'info'
      showToast.value = true
      
      const fileName = data.filename
      const fileSize = data.fileSize
      
      try {
        const downloadResponse = await fetch(data.downloadUrl)
        if (!downloadResponse.ok) throw new Error('下载失败')
        
        if (!downloadResponse.body) throw new Error('响应体为空')
        
        // 显示下载进度
        toastMessage.value = '正在下载...'
        downloadProgress.value = 0
        
        const reader = downloadResponse.body.getReader()
        const chunks: Uint8Array[] = []
        let receivedLength = 0
        
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break
          
          chunks.push(value)
          receivedLength += value.length
          
          // 更新进度
          if (fileSize) {
            downloadProgress.value = (receivedLength / fileSize) * 100
          }
        }
        
        // 合并chunks创建blob
        const blob = new Blob(chunks)
        const url = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        // 显示成功
        toastMessage.value = '下载完成！'
        toastType.value = 'success'
        downloadProgress.value = null
        setTimeout(() => {
          showToast.value = false
        }, 2000)
        
      } catch (downloadError) {
        toastMessage.value = '下载失败，请重试'
        toastType.value = 'error'
        downloadProgress.value = null
        setTimeout(() => {
          showToast.value = false
        }, 3000)
      }
    } else {
      const error = await response.text()
      toastMessage.value = error || '未找到文件，请检查拼写是否正确'
      toastType.value = 'error'
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 4000)
    }
  } catch (error) {
    console.error('Error searching:', error)
    toastMessage.value = '搜索失败，请稍后重试'
    toastType.value = 'error'
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 4000)
  } finally {
    loading.value = false
    searchInterfaceRef.value?.setLoading(false)
  }
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