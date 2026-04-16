---
title: "Impeccable：让 AI 告别「通用模板」设计的神器"
excerpt: "19k Star 的开源项目 Impeccable 能让 Claude Code、Cursor 等 AI 工具生成更高质量的前端 UI。本文介绍它的核心理念、安装配置方法以及 18 个核心指令的实战用法。"
date: "2026-04-16"
category: "开发工具"
tags: ["AI", "前端开发", "Claude Code", "Cursor", "设计系统", "工具推荐"]
featured: true
---

## 为什么 AI 生成的 UI 看起来都一样？

用过 Claude、Cursor 或任何 AI 工具写前端的人，大概都有过这种体验——你让它「做一个现代风格的卡片组件」，出来的东西是：

- 字体：Inter（永远是 Inter）
- 颜色：蓝紫渐变，背景带半透明模糊（glassmorphism）
- 圆角：`rounded-xl` 加一圈 `drop-shadow`
- 强调文字：渐变文字（`background-clip: text`）

一眼就能看出是 AI 生成的。

**这不是 AI 不够聪明，而是训练数据的问题**。所有大语言模型都从相同的通用模板学习，在没有额外指导的情况下，它们会回归到「最安全」的设计选择——也就是出现频率最高的那些。

**[Impeccable](https://github.com/pbakaus/impeccable)** 就是为了解决这个问题而生的。

---

## Impeccable 是什么？

Impeccable 是一套专门针对 AI 辅助前端设计的「设计语言工具」，由 [Paul Bakaus](https://github.com/pbakaus) 创建，目前在 GitHub 上拥有超过 **19.6k Star**。

它的本质是一组结构化的 Skill 文件，安装到你的 AI 工具后，能显著提升 AI 生成 UI 的质量：

- **7 个设计参考文档**：排版、色彩、空间设计、动效、交互、响应式、UX 文案
- **18 个操作指令**：审计、评审、润色、提炼、动画等场景覆盖
- **精选反模式清单**：明确告诉 AI 不该做什么（比如禁用渐变文字、禁用侧栏色条）
- **独立 CLI 工具**：不依赖 AI 环境，直接扫描代码中的设计反模式

---

## 安装

### 支持的工具

Impeccable 支持目前主流的 AI 编程工具：

| 工具 | 安装方式 |
|------|---------|
| Claude Code | 复制到 `.claude/` 目录 |
| Cursor | 复制到 `.cursor/` 目录 |
| Gemini CLI | 复制到 `.gemini/` 目录 |
| OpenCode | 复制到 `.opencode/` 目录 |
| Codex CLI | 复制到 `~/.codex/` 目录 |
| Trae | 复制到对应 skills 目录 |

### 安装步骤（以 Claude Code 为例）

**方法一：官网下载（推荐）**

访问 [impeccable.style](https://impeccable.style)，选择你使用的工具，下载对应的 ZIP 包并解压到项目目录。

**方法二：从 GitHub 仓库复制**

```bash
# 克隆仓库
git clone https://github.com/pbakaus/impeccable.git

# 安装到当前项目（项目级）
cp -r impeccable/dist/claude-code/.claude your-project/

# 或安装到全局（所有项目生效）
cp -r impeccable/dist/claude-code/.claude/* ~/.claude/
```

对于 **Cursor**，还需要在设置中手动开启：

1. 切换到 Nightly 频道（`Cursor Settings → General → Channel`）
2. 启用 Agent Skills（`Cursor Settings → Features → Agent Skills`）

对于 **Gemini CLI**，需要安装预览版并在设置中启用 Skills 功能。

---

## 核心理念：teach → craft → audit

Impeccable 的工作流围绕三个核心步骤展开：

### 1. Teach — 建立项目设计上下文

```
/impeccable teach
```

这是一次性的初始化步骤。运行后，AI 会通过一系列问题了解你的项目：

- 目标用户是谁？使用场景是什么？
- 品牌个性如何用 3 个词描述？
- 参考网站是哪些？反面参考是什么？
- 偏好深色还是浅色主题？

收集完毕后，上下文会保存到项目根目录的 `.impeccable.md` 文件中。之后每次调用设计相关指令，AI 都会自动读取这份上下文，确保风格一致。

### 2. Craft — 构建功能界面

```
/impeccable craft [功能描述]
```

例如：

```
/impeccable craft 文章详情页
/impeccable craft 用户登录表单
/impeccable craft 数据仪表盘卡片
```

Craft 模式会先进行设计规划（shaping），再加载相关参考文档，最后按照「结构 → 布局 → 排版色彩 → 交互状态 → 边缘状态 → 动效 → 响应式」的顺序完整构建，并在浏览器中进行可视化验证和迭代。

### 3. Audit — 扫描设计反模式

```
/audit
/audit header
/audit checkout-form
```

运行后会生成一份按 P0～P3 严重等级分类的质量报告，指出布局、无障碍、性能和反模式等方面的具体问题。

---

## 18 个核心指令速查

| 指令 | 说明 |
|------|------|
| `/impeccable teach` | 收集项目设计上下文，保存到 `.impeccable.md` |
| `/impeccable craft [描述]` | 完整的构思与构建流程 |
| `/impeccable extract [目标]` | 从现有代码提取可复用组件和设计 token |
| `/audit` | 无障碍、性能、响应式质量检查 |
| `/critique` | UX 评审：层级、清晰度、情感共鸣 |
| `/polish` | 最终润色，修复细节对齐 |
| `/distill` | 去除繁杂，提取本质 |
| `/typeset` | 修复字体选择、层级和字号 |
| `/colorize` | 为单调的界面添加战略性色彩 |
| `/bolder` | 放大视觉冲击力，让设计更有个性 |
| `/quieter` | 降低视觉强度，使设计更克制 |
| `/adapt` | 跨设备响应式适配 |
| `/clarify` | 改善模糊的 UX 文案和错误提示 |
| `/animate` | 添加有意义的动效 |
| `/optimize` | 诊断和修复性能问题 |
| `/overdrive` | 实现技术上雄心勃勃的特效 |
| `/shape` | 在写代码前先规划 UX 和 UI 方向 |
| `/find-skills` | 发现并安装新技能 |

---

## CLI 独立工具

不想依赖 AI 环境？Impeccable 还提供了一个独立的 CLI 工具，直接扫描代码中的设计反模式：

```bash
# 扫描目录
npx impeccable detect src/

# 扫描单个 HTML 文件
npx impeccable detect index.html

# 扫描线上 URL
npx impeccable detect https://example.com
```

CLI 能检测的反模式包括：

- 侧边栏色条（`border-left: 3px solid ...`）
- 渐变文字（`background-clip: text`）
- 弹性/弹跳缓动曲线
- 纯 `#000` / `#fff` 色值
- 以及更多 AI 生成 UI 的「指纹」特征

---

## 哪些情况最值得用？

**最有价值的场景：**

- 从零开始构建新项目，需要建立设计语言
- 重构一个「AI 味」很重的旧界面
- 快速原型但不想输出通用模板
- 有设计稿但交给 AI 实现时经常跑偏

**不太必要的场景：**

- 纯逻辑代码（与 UI 无关的功能）
- 已经有成熟设计系统的大型项目（直接用现有 token 即可）

---

## 总结

Impeccable 并不神奇，它本质上是一套**结构化的提示词工程**——通过给 AI 提供清晰的上下文、参考和反模式，让它做出更有意识的设计选择，而不是回归训练数据的均值。

如果你经常用 AI 写前端，这个工具值得花 10 分钟配置一次。之后每次生成 UI，至少能少踩掉大半的「AI 设计陷阱」。

仓库地址：[https://github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)
