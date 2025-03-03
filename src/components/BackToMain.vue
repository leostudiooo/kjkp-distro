<template>
	<a :href="mainSiteUrl" class="back-to-main">
	  <svg 
		xmlns="http://www.w3.org/2000/svg" 
		viewBox="0 0 24 24" 
		fill="currentColor" 
		class="back-icon"
	  >
		<path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z">
		</path>
	  </svg>
	  返回主站
	</a>
  </template>

<script setup lang="ts">
const mainSiteUrl = 'https://leostudiooo.github.io/'
</script>

<style scoped>
.back-to-main {
  position: fixed;
  top: 1rem;
  left: 1rem;
  text-decoration: none;
  color: var(--text-dimmed-color);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: var(--bg-color);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1;
}

.back-icon {
  height: 1.25rem;
  width: 1.25rem;
  vertical-align: middle;
}

.back-to-main:hover {
	background-color: var(--input-bg-hover);
}

.back-to-main:active {
	background-color: var(--input-bg-active);
}
</style>