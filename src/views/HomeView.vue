<script setup>
import { ElMessage } from 'element-plus'

const count = ref(0)

const handleClick = () => {
  count.value++
  ElMessage.success(`点击了 ${count.value} 次`)
}
</script>

<template>
  <el-card class="max-w-xl">
    <template #header>
      <span class="font-medium">Vue3 + Element Plus + Tailwind CSS</span>
    </template>
    <p class="text-gray-600 mb-4">环境已就绪，可以开始开发。</p>
    <el-button type="primary" @click="handleClick">点击测试 ({{ count }})</el-button>
  </el-card>
</template>
