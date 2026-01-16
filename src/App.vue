<template>
    <meta charset="utf-8" lang="zh-CN">
    <meta name="keywords" content="锟斤拷P,配布站,伴奏,工程">
    <meta name="description" content="锟斤拷P的配布站，用以下载伴奏和工程文件。">

    <BackToMain />
    
    <div class="wrapper">
      <div class="box-container">
        <!-- Box Metaphor Elements -->
        <div class="box-corner box-corner-tl"></div>
        <div class="box-corner box-corner-tr"></div>
        <div class="box-corner box-corner-bl"></div>
        <div class="box-corner box-corner-br"></div>
        <div class="box-label">KJKP-DISTRO / P-BOX</div>
        <div class="box-handle"></div>
        <div class="box-handle box-handle-right"></div>
        <div class="box-sticker">FRAGILE</div>
        <div class="box-hazard"></div>

        <BigTitle />
        <!-- <License /> -->
        <SearchInterface 
              @search="handleSearch"
              @error="handleError"
              ref="searchInterfaceRef"
          />

        <div class="box-tech-label">
          KJKP PROJECT DISTRIBUTION UNIT // SERIAL No. 0x烫烫烫 <br>
          STATUS: OPERATIONAL | TEMP: OPTIMAL
        </div>
      </div>

        <!-- Toast通知 -->
        <Toast 
            :show="showToast"
            :message="toastMessage"
            :type="toastType"
            :progress="downloadProgress"
            @close="showToast = false"
        />

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
import BigTitle from './components/BigTitle.vue'

const loading = ref(false)
const toastMessage = ref('')
const showToast = ref(false)
const toastType = ref<'info' | 'success' | 'error' | 'warning'>('info')
const downloadProgress = ref<number | null>(null)
const searchInterfaceRef = ref()

function handleError(message: string) {
  toastMessage.value = message
  toastType.value = 'warning'
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

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
        const chunks: any[] = []
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
    padding: 1rem;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.error-message {
    margin-top: 1em;
}

.footer {
    text-align: center;
    padding-bottom: 2rem;
    width: 100%;
}
</style>