// 访问过的文档标签，用于顶部快速切换
// 仅在内存中维护，刷新页面后重置为当前页
import { ref } from 'vue'

const tabs = ref([])

// 记录一条访问历史；已存在则不重复添加
export function addTab(route) {
  if (!route.meta?.title || route.name === 'not-found') return
  if (tabs.value.some((tab) => tab.path === route.path)) return
  tabs.value.push({ path: route.path, title: route.meta.title })
}

// 关闭标签，返回关闭后应跳转的路径（关闭的不是当前页时返回 null）
export function removeTab(path, currentPath) {
  const index = tabs.value.findIndex((tab) => tab.path === path)
  if (index === -1) return null
  tabs.value.splice(index, 1)
  if (path !== currentPath) return null
  // 关掉的是当前页：优先落到右侧标签，其次左侧，都没有则回首页
  const next = tabs.value[index] ?? tabs.value[index - 1]
  return next?.path ?? '/'
}

export function clearTabs() {
  tabs.value = []
}

export { tabs }
