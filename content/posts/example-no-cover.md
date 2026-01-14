---
title: 无封面布局示例
published: 2025-01-14
pinned: false
category: 示例
tags:
  - 布局
  - 简约
description: 这是一个不展示封面的文章示例，仅显示标题和元信息。
layout: no-cover
---

# 无封面布局

这是一个使用 `layout: no-cover` 的文章示例。

在这种布局中，不会显示任何封面图片，仅展示标题、描述、标签和发布日期等信息。

## 特点

- 简洁清晰的界面
- 加载速度更快
- 适合纯文字内容
- 节省空间

## 使用方法

在文章的 frontmatter 中添加：

```yaml
layout: no-cover
```

注意：即使用户在 frontmatter 中指定了 `image` 字段，在使用 `no-cover` 布局时也不会显示。
