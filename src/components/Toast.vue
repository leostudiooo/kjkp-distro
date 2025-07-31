<template>
  <Transition name="toast">
    <div v-if="show" class="toast" :class="type">
      <div class="toast-content">
        <div class="toast-message">{{ message }}</div>
        <div v-if="progress !== null" class="toast-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(progress) }}%</div>
        </div>
      </div>
      <button v-if="closable" @click="$emit('close')" class="toast-close">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  message: string
  type?: 'info' | 'success' | 'error' | 'warning'
  progress?: number | null
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  progress: null,
  closable: false
})

defineEmits<{
  'close': []
}>()
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 400px;
  min-width: 300px;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.toast.info {
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.toast.success {
  background: rgba(34, 197, 94, 0.9);
  color: white;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.toast.error {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.toast.warning {
  background: rgba(245, 158, 11, 0.9);
  color: white;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.toast-content {
  flex: 1;
}

.toast-message {
  font-weight: 500;
  margin-bottom: 8px;
}

.toast-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: white;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>