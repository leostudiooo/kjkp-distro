<template>
  <meta charset="utf-8" lang="zh-CN">
  <meta name ="keywords" content="锟斤拷P,配布站,伴奏,工程">
  <meta name="description" content="锟斤拷P的配布站，用以下载伴奏和工程文件。">
  <div class="wrapper">
    <h1 id="title" class="title" style="font-weight: bolder; font-size: 4em; line-height: normal;">Pandora's<br>Parallel
      Box</h1>
    <div id="tips" class="tips" style="line-height: 1.6;">请准确地输入所需歌曲的完整名字，选择文件类型，然后点击下载。</div>
    <div id="search-bar" class="search-bar" style="grid: auto-flow dense; ">
      <div id="search-input">
        <input autofocus id="input-bar" placeholder="试试看！" @input="projectNameIn">
      </div>
      <div id="search-button">
        <button @click="search()">搜索并下载</button>
      </div>
      <div id="selection-dropdown">
        <select @input="fileTypeIn">
          <option value="wav">WAV 伴奏</option>
          <option value="projectFile">工程文件</option>
        </select>
      </div>
    </div>
    <p id="tips2" v-if="notSearched" style="float: left; max-width: 450px; margin-top: 2%;">
      似乎没有找到文件。<br>请检查拼写是否正确且完整。如果确实没有你想要的文件，请<a href="mailto:66ccff@luotianyi.me">发邮件</a>告诉我。
    </p>
  </div>
  <div id="footer" class="footer">
    Copyright (C) 锟斤拷 P 2022 至今<br>
    Proudly Powered by <a href="//vuejs.org">Vue.js</a> and <a href="//vitejs.dev">Vite</a>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {projectInfo} from './projects.json'

// Initialize
const notSearched = ref(false);
const projectName = ref("");
const fileType = ref("");
var project: any;

function projectNameIn(e:any) {
  projectName.value = e.target.value;
}

function fileTypeIn(e:any) {
  fileType.value = e.target.value;
}

function search() {
  project = projectInfo[projectName.value];
  if (project != undefined) {
    notSearched.value = false
    if (fileType.value == "wav"){
      download(project.wavFile, project)
    } 
    else if (fileType.value == "projectFile") {
      download(project.projectFile, project)
    }  
  }
  else {
    notSearched.value = true
  }
}

function download(fileName: string, downloadName: string) {
  var element = document.createElement('a');
  element.setAttribute('href', fileName);
  element.setAttribute('download', downloadName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.title = "Paradox | 锟斤拷的配布站"

</script>

<style>
.title {
  grid-area: title;
}

.tips {
  grid-area: tips;
}

.search-bar {
  grid-area: sb;
}

.footer {
  text-align: center;
  position: fixed;
  left: 0%;
  width: 100%;
  bottom: 5%;
}

/* .wrapper {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
      "title sb"
      "tips  sb"
  } */
input {
  transition: all linear 250ms;
  place-self: center;
  margin-top: 2%;
  margin-bottom: 4%;
  width: 100%;
  height: 50px;
  font-size: medium;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 25px;
  background: blur(10px);
  background-color: #f4f4f4;
}

input:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
}

input:active {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background-color: #eeeeee;
}

select {
  transition: all linear 250ms;
  float: right;
  border: none;
  outline: none;
  height: 40px;
  border-radius: 20px;
  width: 110px;
  background-color: #f4f4f4;
  text-align: center;
  font-size: medium;
  font-weight: bold;
}

select:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
  background-color: #f7f7f7;
}

select:active {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
  background-color: #eeeeee;
}

button {
  transition: all linear 250ms;
  margin-left: 5%;
  float: right;
  border: none;
  outline: none;
  height: 40px;
  border-radius: 40px;
  width: 110px;
  background-color: hsl(160, 100%, 38%);
  color: #fff;
  font-weight: bold;
  font-size: medium;
}

button:hover {
  box-shadow: 0px 0px 10px hsla(160, 100%, 80%, 0.9);
}

button:active {
  background-color: hsl(160, 100%, 30%);
  box-shadow: 0px 0px 5px hsla(160, 100%, 20%, 0.9);
}

body {
  transition: all ease-in-out 500ms;
}

option {
  border: none;
  outline: none;
  margin-top: 2%;
  height: 40px;
  font-size: medium;
  font-weight: bold;
  border-radius: 20px;
  background-color: #eeeeee;
}
</style>