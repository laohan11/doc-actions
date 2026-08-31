<script setup>
// 文档正文的统一容器：层级路径 + prose 排版
// 视觉参考 M3 filled card：16px 圆角、surface-container-lowest 背景、无边框
const route = useRoute()

const breadcrumb = computed(() => route.meta.breadcrumb ?? [])
</script>

<template>
  <article
    class="max-w-4xl mx-auto rounded-m3-lg bg-m3-surface-container-lowest px-5 py-6 sm:px-10 sm:py-8 shadow-md"
  >
    <nav
      v-if="breadcrumb.length"
      class="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-m3-on-surface-variant"
    >
      <template v-for="(item, index) in breadcrumb" :key="item">
        <span v-if="index" class="text-m3-outline-variant" aria-hidden="true">/</span>
        <span :class="index === breadcrumb.length - 1 ? 'text-m3-primary font-medium' : ''">
          {{ item }}
        </span>
      </template>
    </nav>

    <div class="prose prose-sm sm:prose-base prose-slate max-w-none">
      <slot />
    </div>
  </article>
</template>
