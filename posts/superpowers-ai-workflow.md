---
title: "Superpowers：把 Claude Code 从代码生成器升级为工程搭档"
excerpt: "155k Star 的开源框架 Superpowers 通过 14 个可组合技能模块，强制 AI 遵循 TDD、代码审查、任务拆分等软件工程最佳实践。本文介绍安装配置、核心工作流和实战技巧。"
date: "2026-04-16"
category: "开发工具"
tags: ["AI", "Claude Code", "工程化", "TDD", "工具推荐", "工作流"]
featured: false
---

## 问题：AI 写的代码为什么总要返工？

用 Claude Code 或类似 AI 工具写代码，很多人都遇过这个场景：需求描述完，AI 噼里啪啦写了一堆代码，跑起来却发现方向完全不对——边界条件没考虑、技术选型冒进、测试一个没有。

回头重来，又是一轮。

**这不是 AI 不够聪明，而是缺流程**。专业开发团队之所以靠谱，不是因为每个人都比 AI 聪明，而是因为有规范：需求评审、技术方案、代码审查、TDD……这些护栏让工作变得可预测。

**[Superpowers](https://github.com/obra/superpowers)** 就是给 AI 套上这套护栏的框架。

目前 GitHub 上 **155k Star**，最新版本 v5.0.7（2026年3月发布）。

---

## Superpowers 是什么？

Superpowers 是一套基于 Agent Skills 的工作流框架，由 [Jesse Vincent](https://blog.fsck.com) 和 [Prime Radiant](https://primeradiant.com) 团队构建，MIT 协议开源。

核心理念只有一句话：**流程大于提示词**。

它不会让 AI 更聪明，但会让 AI 更自律——通过在关键决策点自动触发结构化技能，强制执行经过验证的软件工程方法论：

- 写代码前先搞清需求（Brainstorm）
- 动手前先制定计划（Write Plan）
- 任务分解，子代理并行（Subagent-Driven Development）
- 先写测试，再写实现（TDD）
- 完成后自动代码审查（Code Review）

---

## 安装

Superpowers 支持 Claude Code、Cursor、Codex、OpenCode、Gemini CLI 等主流 AI 工具。

### Claude Code（推荐）

**方式一：Anthropic 官方市场（2026年1月起支持）**

```bash
/plugin install superpowers@claude-plugins-official
```

**方式二：作者维护的市场源**

```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### Cursor

在聊天窗口输入 `/add-plugin superpowers`，或在插件市场搜索"superpowers"。

### Codex

直接告诉 Codex：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

### Gemini CLI

```bash
gemini extensions install https://github.com/obra/superpowers
# 更新
gemini extensions update superpowers
```

### 验证安装

重启会话后输入 `/`，如果看到以下命令，说明安装成功：

```
/superpowers:brainstorm
/superpowers:write-plan
/superpowers:execute-plan
```

---

## 14 个技能模块

Superpowers 将软件工程最佳实践封装为 14 个可自动触发的技能：

### 测试

| 技能 | 说明 |
|------|------|
| `test-driven-development` | 强制 RED-GREEN-REFACTOR 循环：先写失败测试 → 看它失败 → 写最少代码 → 看它通过 → 提交 |
| `verification-before-completion` | 确保问题真正解决，而非表面通过 |

### 调试

| 技能 | 说明 |
|------|------|
| `systematic-debugging` | 4 阶段根本原因分析：复现 → 定位 → 修复 → 验证 |

### 协作与流程

| 技能 | 说明 |
|------|------|
| `brainstorming` | 苏格拉底式需求澄清，在写代码前通过提问完善想法 |
| `writing-plans` | 将工作分解为 2-5 分钟的微任务，含文件路径、代码片段和验证步骤 |
| `executing-plans` | 批量执行计划，在关键节点暂停等待人工确认 |
| `dispatching-parallel-agents` | 并发子代理工作流，互不依赖的任务并行处理 |
| `requesting-code-review` | 预审查清单，按严重程度报告问题，关键问题阻止进度 |
| `receiving-code-review` | 如何响应代码审查反馈 |
| `using-git-worktrees` | 为每个分支创建隔离工作空间，避免文件冲突 |
| `finishing-a-development-branch` | 合并/PR 决策工作流，自动清理工作树 |
| `subagent-driven-development` | 双阶段审查：规格合规性 → 代码质量 |

### 元技能

| 技能 | 说明 |
|------|------|
| `writing-skills` | 按最佳实践创建新技能 |
| `using-superpowers` | 技能系统入门介绍 |

---

## 标准工作流：从需求到上线

适用于超过 50 行代码的功能开发，完整流程分为 4 个阶段：

### 阶段一：Brainstorm — 先想清楚，再动手

触发方式：描述需求，或直接输入 `/superpowers:brainstorm`。

AI 会**主动停止编码冲动**，转而通过苏格拉底式提问澄清：

- 这个功能的业务目标是什么？
- 有哪些技术约束？
- 你偏好哪种实现方案？
- 有哪些边界情况需要考虑？

问题澄清完毕后，AI 会输出设计文档供你确认，再进入下一步。

### 阶段二：Write Plan — 生成详细计划

触发方式：`/superpowers:write-plan`

输出一份精细到文件级别的实施计划：

```
Task 1: 创建 UserService 类 (预计 3 分钟)
  - 文件: src/services/UserService.ts
  - 依赖: src/types/User.ts
  - 验证: UserService 单元测试通过

Task 2: 实现 getUserById 方法 (预计 2 分钟)
  - 依赖: Task 1
  - 验证: 返回正确的用户数据，处理 404 情况
...
```

**计划需要你审阅确认**，才能进入执行阶段。

### 阶段三：Execute Plan — 子代理并行执行

触发方式：`/superpowers:execute-plan`

执行机制：

- 互不依赖的任务交给**多个子代理并行处理**，显著提速
- 每个子代理严格遵循 **TDD**：先写测试 → 看到红 → 写实现 → 看到绿 → 提交
- 任务之间自动触发**代码审查**，关键问题阻断进度

### 阶段四：Finish Branch — 收尾与合并

任务完成后，AI 会：

1. 验证所有测试通过
2. 展示选项：直接合并 / 创建 PR / 保留分支 / 丢弃
3. 清理 Git Worktree

---

## 实战技巧

### 不是所有任务都需要完整流程

改个 CSS 变量、修个 typo，直接让 Claude 做就好。完整流程适合：

- 新功能开发（超过 50 行代码）
- 重构现有模块
- 修复复杂 Bug

### 强制高质量输出

在描述需求时加上明确的流程前缀，效果更稳定：

```
按 Superpowers 完整流程：先 brainstorm 澄清需求，再 write-plan 制定计划，
最后 execute-plan 执行，全程强制 TDD 和 code review。

需求：实现一个用户认证模块，支持 JWT 和 refresh token。
```

### 长会话管理

当会话变长时，用 `/compact` 压缩历史，并在 Plan 阶段同步输出 `ARCHITECTURE.md`，让每次新会话都能快速恢复上下文。

### Git Worktrees 隔离开发

对于并行开发的任务，明确要求使用 git worktrees：

```
使用 git worktrees 为这个功能创建隔离的工作空间，
确保不影响主分支的其他进行中工作。
```

---

## 常见误区

**误区：Superpowers 会消耗更多 Token**

事实：短期略有增加，但通过减少返工（方向错误重来一遍 = 消耗数倍 Token），总体消耗反而降低。

**误区：TDD 太慢，影响效率**

事实：原型验证阶段可以跳过，但正式开发强烈建议开启——上线后发现的 Bug 修复成本远高于写测试的成本。

**误区：需要记住所有命令**

事实：Superpowers 技能会自动触发，不需要手动调用。直接描述任务，框架会匹配合适的技能。只有想强制触发某个阶段时才需要手动输入命令。

---

## 总结

Superpowers 解决的不是 AI 能力问题，而是 AI 纪律问题。

单靠提示词让 AI 遵循工程规范，稳定性很差——今天有效，明天不一定。Superpowers 把这些规范固化成自动触发的技能，让 AI 在每次关键决策点都能遵循一致的流程。

如果你已经在用 Claude Code 做正式项目，这个框架值得花 5 分钟安装试试。差别会在第一次它主动停下来问你"这个功能的业务目标是什么"时就感受到。

仓库地址：[https://github.com/obra/superpowers](https://github.com/obra/superpowers)
