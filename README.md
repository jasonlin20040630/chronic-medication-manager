# 慢病用药小管家

一个用于 AI 编码评估的 React + Vite + Tailwind CSS 项目原型，聚焦慢病患者的个人用药计划管理与复诊提醒。

## 技术栈

- React 18
- Vite 5
- Tailwind CSS 3
- localStorage（本地持久化）

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

## 当前功能（Demo）

应用采用 React state 切换主内容区（不使用路由）：

- 首页总览
  - 今日用药任务
  - 已完成任务
  - 低库存预警
  - 下次复诊日期
  - 本周依从率（基于今日记录估算）
- 我的用药计划
  - 用药卡片
  - 每个计划时间可标记：已服用 / 跳过
  - 显示计划时间状态：未完成 / 已服用 / 已跳过
  - 新增用药计划表单
- 提醒中心
  - 用药提醒 / 补药提醒 / 复诊提醒时间轴
- 智能小助手
  - 快捷问题面板

## 本地持久化

以下数据会保存在浏览器 localStorage：

- 用药计划
- 今日用药状态（按日期 + 药品 id + 时间）

页面底部提供“重置演示数据”按钮，便于评审恢复默认 mock 数据。

## 安全边界说明

本项目中的用药信息仅用于演示，来源为**医生处方或用户录入的 mock 数据**。应用不提供医疗诊断，不推荐新增药物，也不建议调整剂量。

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
    ├── components
    │   ├── AddPlanForm.jsx
    │   ├── MedicationPlanCard.jsx
    │   ├── MetricCard.jsx
    │   ├── SectionNav.jsx
    │   └── TimelineItem.jsx
    ├── data
    │   └── mockData.js
    ├── pages
    │   └── HomePage.jsx
    ├── sections
    │   ├── AssistantSection.jsx
    │   ├── OverviewSection.jsx
    │   ├── PlansSection.jsx
    │   └── RemindersSection.jsx
    └── utils
        └── storage.js
```
