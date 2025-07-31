<template>
    <form class="search-bar" @submit.prevent="handleFormSubmit">
        <div class="search-input">
            <input 
                v-model="searchKeyword" 
                autofocus 
                placeholder="试试看！"
                type="text"
            >
        </div>
        <div class="search-controls" style="padding-top: 1em;">
            <select v-model="fileType">
                <option value="" disabled selected>请选择</option>
                <option value="wav">无损伴奏</option>
                <option value="project">工程文件</option>
                <option value="others">其他内容</option>
            </select>
            <button type="submit" :disabled="loading">{{ loading ? '搜索中...' : '搜索并下载' }}</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    'search': [keyword: string, fileType: string]
    'loading': [loading: boolean]
    'error': [message: string]
}>()

const searchKeyword = ref('')
const fileType = ref('')
const loading = ref(false)

function handleFormSubmit() {
    if (!searchKeyword.value.trim()) {
        emit('error', '请输入歌曲名称')
        return
    }
    
    if (!fileType.value) {
        emit('error', '请选择文件类型')
        return
    }

    loading.value = true
    emit('loading', true)
    emit('search', searchKeyword.value.trim(), fileType.value)
}

function reset() {
    searchKeyword.value = ''
    fileType.value = ''
    loading.value = false
}

// 暴露给父组件的方法
defineExpose({
    reset,
    setLoading: (value: boolean) => loading.value = value
})
</script>

<style scoped>
.search-bar {
    display: grid;
    gap: 1rem;
}

.search-controls {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

input,
select,
button {
    border: none;
    outline: none;
    border-radius: 25px;
    font-size: medium;
    transition: all 250ms ease-in-out;
}

input {
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: var(--input-bg);
    color: var(--text-color);
    box-shadow: 2px 10px 30px hsla(0, 0%, 0%, 0.15);
}

input:hover {
    background-color: var(--input-bg-hover);
}

input:active {
    background-color: var(--input-bg-active);
}

select {
    height: 40px;
    background-color: var(--input-bg);
    color: var(--text-color);
    font-weight: bold;
    box-shadow: 2px 5px 20px hsla(0, 0%, 0%, 0.1);
    -webkit-appearance: none;
    appearance: none;
    padding: 0 1em;
    padding-right: 2em;
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.5em center;
    text-align-last: center;
}

select:hover {
    background-color: var(--input-bg-hover);
}

select:active {
    background-color: var(--input-bg-active);
}

button {
    height: 40px;
    width: 110px;
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
    box-shadow: 2px 5px 20px hsla(202, 100%, 36%, 0.4);
}

button:hover {
    background-color: var(--primary-color-hover);
}

button:active {
    background-color: var(--primary-color-active);
}

button:disabled {
    background-color: var(--input-bg);
    color: var(--text-color);
    cursor: not-allowed;
    box-shadow: 2px 5px 20px hsla(0, 0%, 0%, 0.1);
}
</style>