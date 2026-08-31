<script setup>
import { menuTree } from '@/router/docs'

const router = useRouter()

// 首页展示所有大分类，点击进入该分类下第一篇可访问的文档
const go = (node) => {
  const target = node.hasPage ? node : findFirstPage(node.children)
  if (target) router.push(target.path)
}

function findFirstPage(nodes) {
  for (const node of nodes) {
    if (node.hasPage) return node
    const found = findFirstPage(node.children)
    if (found) return found
  }
  return null
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl sm:text-3xl font-normal text-m3-on-surface mb-2">文档知识库</h1>
    <p class="text-sm sm:text-base text-m3-on-surface-variant mb-8">
      在 src/views 下新建目录并放入 index.md 即可自动生成路由与菜单，目录名就是菜单名。
    </p>

    <p v-if="!menuTree.length" class="py-16 text-center text-m3-on-surface-variant">
      还没有任何文档
    </p>

    <!-- M3 outlined card -->
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <button
        v-for="node in menuTree"
        :key="node.path"
        type="button"
        class="p-5 text-left rounded-m3-md bg-m3-surface-container-lowest border border-m3-outline-variant cursor-pointer transition-all duration-200 ease-m3 hover:bg-m3-surface-container-low hover:shadow-m3-1"
        @click="go(node)"
      >
        <span class="block text-base font-medium text-m3-on-surface mb-1">{{ node.title }}</span>
        <span v-if="node.children.length" class="block text-sm text-m3-on-surface-variant">
          {{ node.children.map((child) => child.title).join('、') }}
        </span>
        <span v-else class="block text-sm text-m3-outline">暂无子文档</span>
      </button>
    </div>
  </div>
</template>
