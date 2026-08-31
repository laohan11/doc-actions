<script setup>
import { menuTree, docRoutes } from '@/router/docs'
import DocMenu from '@/components/DocMenu.vue'
import DocPage from '@/components/DocPage.vue'
import DocTabs from '@/components/DocTabs.vue'

const route = useRoute()

// 移动端侧边栏以抽屉形式展开
const drawerOpen = ref(false)

// 按路由在文档序列中的先后决定横向滑动方向：前进向左，回退向右
const order = ['/', ...docRoutes.map((item) => item.path)]
const direction = ref('forward')
let prevIndex = order.indexOf(route.path)

watch(
  () => route.path,
  (path) => {
    const index = order.indexOf(path)
    direction.value = index < prevIndex ? 'back' : 'forward'
    prevIndex = index
    // 切换后收起抽屉
    drawerOpen.value = false
  },
)
</script>

<template>
  <div class="h-full flex flex-col bg-m3-surface">
    <header class="h-16 shrink-0 px-2 sm:px-4 flex items-center gap-2 sm:gap-4">
      <!-- 移动端汉堡按钮：M3 图标按钮为 40px 圆形 -->
      <button
        type="button"
        class="lg:hidden shrink-0 w-10 h-10 grid place-items-center rounded-full bg-transparent border-none cursor-pointer text-m3-on-surface-variant transition-colors duration-200 ease-m3 hover:bg-m3-surface-container-high"
        aria-label="打开菜单"
        @click="drawerOpen = true"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      </button>

      <RouterLink
        to="/"
        class="px-2 text-xl font-medium tracking-tight text-m3-on-surface no-underline"
      >
        xiaoxiao知识库
      </RouterLink>
    </header>

    <!-- 访问历史标签栏：位于顶栏之下、正文之上，不参与页面过渡 -->
    <DocTabs />

    <div class="flex-1 flex min-h-0 gap-0 lg:gap-4 px-0 lg:px-4 pb-0 lg:pb-4">
      <!-- 桌面端常驻侧边栏：M3 navigation drawer -->
      <aside
        class="hidden lg:block w-72 shrink-0 overflow-y-auto p-3 rounded-m3-lg bg-m3-surface-container-low"
      >
        <DocMenu :nodes="menuTree" />
      </aside>

      <!-- 移动端抽屉侧边栏 -->
      <Transition name="drawer-mask">
        <div
          v-if="drawerOpen"
          class="lg:hidden fixed inset-0 z-40 bg-black/[0.32]"
          @click="drawerOpen = false"
        />
      </Transition>
      <Transition name="drawer">
        <aside
          v-if="drawerOpen"
          class="lg:hidden fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto p-3 rounded-r-m3-lg bg-m3-surface-container-low shadow-m3-2"
        >
          <DocMenu :nodes="menuTree" />
        </aside>
      </Transition>

      <main class="flex-1 min-w-0 overflow-x-hidden overflow-y-auto p-4 lg:p-0">
        <RouterView v-slot="{ Component }">
          <!-- out-in 避免新旧页面同时占位导致布局跳动 -->
          <Transition :name="`slide-${direction}`" mode="out-in">
            <!-- 文档页统一套 DocPage 容器，首页等普通页面直接渲染 -->
            <DocPage v-if="route.meta.doc" :key="route.path">
              <component :is="Component" />
            </DocPage>
            <component :is="Component" v-else :key="route.path" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 路由横向过渡：前进时新页面从右侧进入。曲线取 M3 emphasized easing */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition:
    opacity 0.2s cubic-bezier(0.2, 0, 0, 1),
    transform 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* 回退时方向相反 */
.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-back-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

/* 移动端抽屉与遮罩 */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}

.drawer-mask-enter-active,
.drawer-mask-leave-active {
  transition: opacity 0.25s cubic-bezier(0.2, 0, 0, 1);
}

.drawer-mask-enter-from,
.drawer-mask-leave-to {
  opacity: 0;
}

/* 用户开启「减少动效」时关闭过渡 */
@media (prefers-reduced-motion: reduce) {
  .slide-forward-enter-active,
  .slide-forward-leave-active,
  .slide-back-enter-active,
  .slide-back-leave-active,
  .drawer-enter-active,
  .drawer-leave-active,
  .drawer-mask-enter-active,
  .drawer-mask-leave-active {
    transition: none;
  }
}
</style>
