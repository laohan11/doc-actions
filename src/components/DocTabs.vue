<script setup>
// 访问历史标签栏：横向滚动，可点击切换、可关闭
// 视觉参考 M3 input chip：32px 高、8px 圆角、1px outline
import { tabs, removeTab, clearTabs } from '@/composables/useDocTabs'

const route = useRoute()
const router = useRouter()

const close = (path) => {
  const next = removeTab(path, route.path)
  if (next) router.push(next)
}

const closeAll = () => {
  clearTabs()
  router.push('/')
}
</script>

<template>
  <div v-if="tabs.length" class="shrink-0 flex items-center gap-2 px-4 lg:px-6 pb-3">
    <!-- 标签过多时横向滚动，不挤压布局 -->
    <div class="flex-1 flex items-center gap-2 overflow-x-auto py-0.5">
      <div
        v-for="tab in tabs"
        :key="tab.path"
        class="shrink-0 flex items-center h-8 rounded-m3-sm border text-sm transition-colors duration-200 ease-m3"
        :class="
          route.path === tab.path
            ? 'border-transparent bg-m3-secondary-container text-m3-on-secondary-container'
            : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-container-high'
        "
      >
        <RouterLink
          :to="tab.path"
          class="pl-3 pr-1 leading-8 no-underline text-inherit whitespace-nowrap"
        >
          {{ tab.title }}
        </RouterLink>
        <button
          type="button"
          class="shrink-0 mr-1 w-6 h-6 grid place-items-center rounded-full bg-transparent border-none cursor-pointer text-inherit opacity-60 transition-all duration-200 ease-m3 hover:opacity-100 hover:bg-black/5"
          :aria-label="`关闭 ${tab.title}`"
          @click="close(tab.path)"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 10-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 101.4 1.4l4.9-4.9 4.9 4.9a1 1 0 101.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- M3 text button -->
    <button
      type="button"
      class="shrink-0 h-8 px-3 rounded-full text-sm font-medium text-m3-primary bg-transparent border-none cursor-pointer transition-colors duration-200 ease-m3 hover:bg-m3-primary-container"
      @click="closeAll"
    >
      清空
    </button>
  </div>
</template>
