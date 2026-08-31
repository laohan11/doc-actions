// 文档路由与菜单的自动生成
//
// 约定：
//   src/views/<大分类>/index.md            -> /大分类
//   src/views/<大分类>/<子文档>/index.md    -> /大分类/子文档
//   菜单标题直接取目录名，无需额外配置文件
//
// 文档正文支持 index.md 与 index.vue 两种写法。

// 文档页按需加载，避免首屏打包所有文档
const docModules = import.meta.glob('../views/**/index.{md,vue}')

const DOC_RE = /^\.\.\/views\/(.+)\/index\.(?:md|vue)$/

function createNode(segments) {
  return {
    // 目录相对路径，同时作为菜单项的唯一标识
    path: `/${segments.join('/')}`,
    name: segments.join('-'),
    // 直接以目录名作为菜单标题
    title: segments.at(-1),
    // 该目录下是否存在 index.md / index.vue，决定菜单项能否点击跳转
    hasPage: false,
    loader: null,
    children: [],
  }
}

// 沿路径逐级建节点，中间层目录即使没有文档也会作为分组出现在菜单里
function ensureNode(tree, segments) {
  let list = tree
  let node = null
  for (let i = 0; i < segments.length; i++) {
    const path = `/${segments.slice(0, i + 1).join('/')}`
    node = list.find((item) => item.path === path)
    if (!node) {
      node = createNode(segments.slice(0, i + 1))
      list.push(node)
    }
    list = node.children
  }
  return node
}

const menuTree = []

for (const [file, loader] of Object.entries(docModules)) {
  const dir = file.match(DOC_RE)?.[1]
  if (!dir) continue
  const node = ensureNode(menuTree, dir.split('/'))
  node.hasPage = true
  node.loader = loader
}

// 按目录名排序，中文按拼音，数字前缀（如 01-xxx）可用来手动控制顺序
function sortTree(list) {
  list.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN', { numeric: true }))
  list.forEach((node) => sortTree(node.children))
}
sortTree(menuTree)

// 把树拍平成路由表，并把祖先标题串成面包屑
function toRoutes(list, breadcrumb = []) {
  return list.flatMap((node) => {
    const trail = [...breadcrumb, node.title]
    const self = node.hasPage
      ? [
          {
            path: node.path,
            name: node.name,
            component: node.loader,
            // doc: true 让 App.vue 知道要套用文档正文容器
            meta: { title: node.title, breadcrumb: trail, doc: true },
          },
        ]
      : []
    return [...self, ...toRoutes(node.children, trail)]
  })
}

export const docRoutes = toRoutes(menuTree)
export { menuTree }
