# Aurora 战队官网

> 江苏大学 RoboMaster Aurora 战队官方网站 · 矢志不退，勇者无畏

线上访问 **[aurora-ujs.github.io/Aurora_UJS_website](https://aurora-ujs.github.io/Aurora_UJS_website/)** 🚀

使用 [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) 构建。

## 技术栈

- **框架**：Astro 5（静态站点生成）
- **样式**：Tailwind CSS 4（深色模式 + 自适应）
- **内容**：Astro Content Collections（成员 / 奖项 / 赛事 / 项目 / 专利 / 博客 / 新闻）
- **部署**：GitHub Pages（GitHub Actions 自动构建部署）

## 本地开发

```bash
npm install        # 安装依赖（需要 Node 20+）
npm run dev        # 本地开发服务器 http://localhost:4321/Aurora_UJS_website
npm run build      # 生产构建到 dist/
npm run preview    # 本地预览构建产物
npm run check      # 类型 / 模板检查
```

## 目录结构

```
src/
├─ pages/            # 路由页面（首页、成果、项目、成员、赛程、博客、新闻、联系…）
├─ layouts/          # BaseLayout（站点外壳）
├─ components/       # 复用组件（Header / Footer / Section / Button / Icon …）
├─ content/          # 内容集合（Markdown，含 frontmatter）
│  ├─ members/  awards/  events/  projects/  patents/  posts/  news/
├─ content.config.ts # 集合 schema（zod 校验）
├─ data/site.ts      # 站点元数据 + 导航
├─ lib/utils.ts      # 工具函数（链接、日期、过滤…）
└─ styles/global.css # 设计系统（主题 token + 深色模式）
public/images/       # 静态图片资源
```

## 添加内容

在 `src/content/<集合>/` 下新增 `.md` 文件即可，frontmatter 字段见
`src/content.config.ts`。例如新增一个奖项：

```markdown
---
name: 全国大学生机器人大赛
type: 国家级
prize: 一等奖
date: 2025-08-01
members:
  - 张三
  - 李四
description: 简要说明。
---
```

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到
GitHub Pages（需在仓库 **Settings → Pages** 中将 **Source** 设为 **GitHub Actions**）。

如需绑定自定义域名：把 `astro.config.mjs` 的 `site` 改为该域名、`base` 改为 `"/"`，
并在 `public/` 下放一个仅含**一行**域名的 `CNAME` 文件。
