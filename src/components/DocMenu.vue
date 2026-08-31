<script setup>
// 递归渲染菜单树：有子节点的渲染成可折叠分组，叶子节点渲染成跳转链接
// 视觉规范参考 M3 navigation drawer item：56px 高、全圆角胶囊、选中态用 secondary container
defineOptions({ name: 'DocMenu' })

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
})

const route = useRoute()

// 缩进随层级递增
const indent = computed(() => `${props.depth * 16 + 16}px`)

// 记录用户手动折叠/展开过的分组；未操作过的分组按当前路由自动展开
const manual = reactive({})

const inPath = (node) => route.path === node.path || route.path.startsWith(`${node.path}/`)

const isOpen = (node) => manual[node.path] ?? inPath(node)

const toggle = (node) => {
  manual[node.path] = !isOpen(node)
}
</script>

<template>
  <ul class="list-none m-0 p-0 space-y-1">
    <li v-for="node in nodes" :key="node.path">
      <!-- 分组：标题区域可跳转（若该目录本身有文档），箭头控制折叠 -->
      <div
        v-if="node.children.length"
        class="flex items-center rounded-full text-sm font-medium transition-colors duration-200 ease-m3"
        :class="
          route.path === node.path
            ? 'bg-m3-secondary-container text-m3-on-secondary-container'
            : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
        "
        :style="{ paddingLeft: indent }"
      >
        <RouterLink
          v-if="node.hasPage"
          :to="node.path"
          class="flex-1 min-w-0 py-3 no-underline text-inherit truncate"
        >
          {{ node.title }}
        </RouterLink>
        <button
          v-else
          type="button"
          class="flex-1 min-w-0 py-3 text-left text-sm font-medium text-inherit bg-transparent border-none cursor-pointer truncate"
          @click="toggle(node)"
        >
          {{ node.title }}
        </button>

        <button
          type="button"
          class="shrink-0 mr-1 w-8 h-8 grid place-items-center rounded-full bg-transparent border-none cursor-pointer text-inherit transition-colors duration-200 ease-m3 hover:bg-black/5"
          :aria-expanded="isOpen(node)"
          :aria-label="`${isOpen(node) ? '收起' : '展开'} ${node.title}`"
          @click="toggle(node)"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200 ease-m3"
            :class="isOpen(node) ? 'rotate-180' : ''"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.4 8.6L12 13.2l4.6-4.6L18 10l-6 6-6-6z" />
          </svg>
        </button>
      </div>

      <!-- 叶子节点 -->
      <RouterLink
        v-else
        :to="node.path"
        class="block pr-4 py-3 rounded-full text-sm font-medium no-underline truncate transition-colors duration-200 ease-m3"
        :class="
          route.path === node.path
            ? 'bg-m3-secondary-container text-m3-on-secondary-container'
            : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
        "
        :style="{ paddingLeft: indent }"
      >
        {{ node.title }}
      </RouterLink>

      <Transition name="submenu">
        <DocMenu
          v-if="node.children.length && isOpen(node)"
          :nodes="node.children"
          :depth="depth + 1"
          class="mt-1"
        />
      </Transition>
    </li>
  </ul>
</template>

<style scoped>
/* 子菜单展开/收起动画 */
.submenu-enter-active,
.submenu-leave-active {
  transition:
    opacity 0.2s cubic-bezier(0.2, 0, 0, 1),
    transform 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .submenu-enter-active,
  .submenu-leave-active {
    transition: none;
  }
}
</style>
