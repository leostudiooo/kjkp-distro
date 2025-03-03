<template>
	<div class="search-bar">
		<div class="search-input">
			<input v-model="localProjectName" autofocus placeholder="试试看！">
		</div>
		<div class="search-controls" style="padding-top: 1em;">
			<select v-model="localFileType">
				<option value="" disabled selected>请选择</option>
				<option value="wav">WAV 伴奏</option>
				<option value="projectFile">工程文件</option>
			</select>
			<button @click="handleSearch">搜索并下载</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
	projectInfo: {
		[key: string]: {
			wavFile: string
			projectFile: string
		}
	}
}

const props = defineProps<Props>()
const emit = defineEmits<{
	'notFound': [value: boolean]
	'download': [fileUrl: string, fileName: string]
}>()

const localProjectName = ref('')
const localFileType = ref('')

function handleSearch() {
	const project = props.projectInfo[localProjectName.value]

	if (!project || !localFileType.value) {
		emit('notFound', true)
		return
	}

	emit('notFound', false)
	const fileName = localFileType.value === 'wav' ? project.wavFile : project.projectFile
	const downloadName = `${localProjectName.value}_${localFileType.value === 'wav' ? 'Instrumental' : 'ProjectFile'}`

	emit('download', fileName, downloadName)
}
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
}

input {
	width: 100%;
	height: 50px;
	text-align: center;
	background-color: var(--input-bg);
	color: var(--text-color);
	box-shadow: 2px 10px 30px rgba(0, 0, 0, 0.15);
}

input:hover {
	background-color: var(--input-bg-hover);
}

select {
    height: 40px;
    width: 7rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    font-weight: bold;
    text-align: center;
    box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
    /* Safari 特定样式 */
    -webkit-appearance: none;
	appearance: none;
    padding: 0 1em;
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.5em center;
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
	box-shadow: 2px 5px 20px hsla(160, 100%, 36%, 0.4);
}

button:hover {
	background-color: var(--primary-color-hover);
}

button:active {
	background-color: var(--primary-color-active);
}
</style>