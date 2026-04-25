# 慢病用药小管家

一个用于 AI 编码评估的 React + Vite + Tailwind CSS 初始项目。

## 技术栈

- React 18
- Vite 5
- Tailwind CSS 3

## 本地启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认会在本地启动 Vite 开发服务器（通常是 `http://localhost:5173`）。

### 3. 构建生产包

```bash
npm run build
```

### 4. 预览生产包（可选）

```bash
npm run preview
```

## 项目结构

```text
.
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets
    ├── components
    │   └── FeatureCard.jsx
    ├── layout
    └── pages
        └── HomePage.jsx
```

## 当前已完成（首个任务）

- 初始化可运行的 React + Vite 项目结构
- 完成 Tailwind CSS 配置
- 创建首页文案与三张功能卡片：
  - 今日用药
  - 药量提醒
  - 复诊提醒
