<template>
    <footer class="footer">
        <p class="copyright">
            Copyright © 锟斤拷 P {{ copyrightYears }}
        </p>
        <p>
            Proudly Powered by
            <a class="green" href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</a>
            and
            <a class="green" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
        </p>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const START_YEAR = 2022
const currentYear = new Date().getFullYear()

const copyrightYears = computed(() => {
    return currentYear === START_YEAR
        ? START_YEAR.toString()
        : `${START_YEAR}-${currentYear}`
})
</script>

<style scoped>
.footer {
    text-align: center;
    padding: 2rem 0;
    margin-top: auto;
    font-size: 0.9rem;
    color: var(--text-dimmed-color);
}
</style>