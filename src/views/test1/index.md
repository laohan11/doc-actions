# 示例分类

这是「示例分类」的入口文档，对应文件 `src/views/test1/index.md`。

## 目录约定

- `src/views/<大分类>/index.md` → 路由 `/大分类`
- `src/views/<大分类>/<子文档>/index.md` → 路由 `/大分类/子文档`
- 菜单标题直接取目录名

## 代码块

```js
// 路由与菜单由 import.meta.glob 扫描目录自动生成
const docModules = import.meta.glob('../views/**/index.{md,vue}')
```
