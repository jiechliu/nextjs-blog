---
title: "OpenSpace：给你的 AI Agent 装上自进化引擎，Token 消耗直降 46%"
excerpt: "港大 HKUDS 实验室开源的 OpenSpace 通过 MCP 协议接入 Claude Code、Cursor 等工具，让 AI Agent 像人一样从经验中学习——成功路径自动封装为 Skill，下次同类任务直接复用，无需重复推理。"
date: "2026-04-16"
category: "开发工具"
tags: ["AI", "Claude Code", "MCP", "Agent", "工具推荐", "工程化"]
featured: false
---

## AI Agent 最大的浪费：重复犯同一个错

你有没有遇到过这种情况：同一个任务，上周让 Claude 做了一遍，今天重新开一个会话，它从头推理，走了一样的弯路，甚至犯了一样的错误。

这不是 AI 变笨了——而是它**根本没有记忆**。

每次新会话，Agent 都从零开始。昨天花了 2000 个 Token 才摸索出的正确路径，今天继续花 2000 个 Token 重走一遍。团队里有多个 Agent 在同时工作？每个人各自重复摸索，互不共享。

**[OpenSpace](https://github.com/HKUDS/OpenSpace)** 就是为了解决这个问题。

由香港大学数据智能实验室（HKUDS）开源，MIT 协议，2026 年 3 月发布。在 GDPVal 基准测试（44 种职业、220 个真实专业任务）中，实测 **Token 消耗减少 46%**，任务质量提升 30 个百分点。

---

## 核心理念：让 Agent 像人一样积累经验

OpenSpace 的核心是一个**自进化 Skill 引擎**。

它的工作方式很直觉：

1. **冷启动**：第一次执行某类任务，Agent 从头完整推理，消耗正常数量的 Token
2. **经验提取**：任务完成后，OpenSpace 自动分析执行过程，将成功路径提炼为可复用的 Skill
3. **热复用**：下次遇到同类任务，直接检索并注入已验证的 Skill，跳过重复推理

这不是简单的缓存——Skill 本身也在持续进化：

| 进化模式 | 触发条件 | 结果 |
|---------|---------|------|
| **FIX** | Skill 执行失败 | 自动分析报错，生成修复版本 |
| **DERIVED** | 任务成功但有改进空间 | 提取更优路径，生成改进版 Skill |
| **CAPTURED** | 首次从头推理成功的全新任务 | 抽象为全新 Skill 存入库中 |

---

## Token 节省：各类任务实测数据

在 GDPVal 基准测试中，Phase 2（复用 Skill）相比 Phase 1（首次推理）的节省幅度：

| 任务类型 | Token 节省 | 原因 |
|---------|-----------|------|
| 文件与文书处理 | **56%** | 文档结构、错误恢复路径已固化 |
| 合规与表单填写 | **51%** | PDF 生成管道整体复用 |
| 媒体制作 | **46%** | ffmpeg 参数和回退路径已记录 |
| 工程项目 | **43%** | 跨项目协调 Skill 通用化 |
| **总体平均** | **45.9%** | — |

---

## 安装

### 前置条件

- Python 环境
- Node.js ≥ 20（可选，仅在需要本地 Dashboard 时需要）

### 安装 OpenSpace

**推荐：稀疏克隆**（仓库中的 `assets/` 目录约 50MB，国内网络建议跳过）

```bash
git clone --filter=blob:none --sparse https://github.com/HKUDS/OpenSpace.git
cd OpenSpace
git sparse-checkout set '/*' '!assets/'
pip install -e .

# 验证安装
openspace-mcp --help
```

**标准克隆**（网络良好时）：

```bash
git clone https://github.com/HKUDS/OpenSpace.git
cd OpenSpace
pip install -e .
```

---

## 接入 Agent（以 Claude Code 为例）

OpenSpace 通过 **MCP（Model Context Protocol）** 协议接入 Agent，支持任何兼容 MCP 的工具，包括 Claude Code、Cursor、OpenClaw 等。

### Step 1：配置 MCP 服务器

修改 Claude Code 的 MCP 配置文件（通常为 `~/.claude/claude.json` 或项目级的 `.mcp.json`），添加 openspace 配置：

```json
{
  "mcpServers": {
    "openspace": {
      "command": "openspace-mcp",
      "toolTimeout": 600,
      "env": {
        "OPENSPACE_HOST_SKILL_DIRS": "/path/to/your/agent/skills",
        "OPENSPACE_WORKSPACE": "/path/to/OpenSpace",
        "OPENSPACE_API_KEY": "sk-xxx（可选，不填则仅使用本地功能）"
      }
    }
  }
}
```

> **注意**：`toolTimeout` 务必设置为 600，否则长任务会被超时中断。

### Step 2：复制核心 Skill

将两个关键 Skill 复制到 Agent 的 skills 目录（**缺一不可**）：

```bash
# Claude Code 的 skills 目录示例（根据实际路径调整）
cp -r OpenSpace/openspace/host_skills/delegate-task/ ~/.claude/skills/
cp -r OpenSpace/openspace/host_skills/skill-discovery/ ~/.claude/skills/
```

- `delegate-task`：判断是否将任务委托给 OpenSpace 执行
- `skill-discovery`：在 Skill 库中检索相关 Skill

### Step 3：重启并验证

重启 Agent 后，询问"当前有哪些可用的 MCP 工具"，确认 openspace 相关工具出现在列表中。

---

## 直接使用（不接入 Agent）

除了作为插件，OpenSpace 也可以作为独立的 AI 工作助手直接使用：

**交互模式**：

```bash
openspace
```

**单次任务执行**：

```bash
openspace --model "anthropic/claude-sonnet-4-5" --query "分析 GitHub 仓库的代码质量并生成报告"
```

**Python API**：

```python
import asyncio
from openspace import OpenSpace

async def main():
    async with OpenSpace() as cs:
        result = await cs.execute("创建一个 Docker 容器监控仪表盘")
        print(result["response"])

asyncio.run(main())
```

---

## 传输模式选择

OpenSpace 支持三种 MCP 传输模式，根据部署场景选择：

| 模式 | 适用场景 | 配置 |
|------|---------|------|
| **stdio**（默认） | 本地使用，配置最简单 | `"command": "openspace-mcp"` |
| **SSE** | VPS 部署、需要持久连接 | `openspace-mcp --transport sse --host 127.0.0.1 --port 8080` |
| **Streamable HTTP** | 远程主机，绕开 stdio 超时 | `openspace-mcp --transport streamable-http --host 127.0.0.1 --port 8081` |

---

## 本地 Dashboard

OpenSpace 提供可视化面板，展示 Skill 的进化谱系、版本对比和执行统计：

```bash
# 启动后端
openspace-dashboard --port 7788

# 启动前端（需要 Node.js ≥ 20）
cd frontend && npm run dev
```

访问 `http://localhost:5173` 即可看到完整的 Skill 管理界面。

---

## 云端社区

OpenSpace 有一个公开的 Skill 共享社区 [open-space.cloud](https://open-space.cloud)，用户可以上传/下载其他人进化出的 Skill：

```bash
# 从社区下载 Skill
openspace-download-skill <skill_id>

# 上传自己的 Skill 到社区
openspace-upload-skill /path/to/skill/dir
```

越多人使用，Skill 库越丰富——这是 OpenSpace 的核心网络效应。

---

## 常见问题

**Q：接入后 Agent 没有自动使用 OpenSpace？**

检查 `delegate-task` 和 `skill-discovery` 是否都已复制到 skills 目录，缺少任何一个都会导致闭环失效。

**Q：任务执行到一半中断了？**

MCP 配置中的 `toolTimeout` 是否设置为 600？默认值通常太短，长任务会被超时截断。

**Q：`OPENSPACE_HOST_SKILL_DIRS` 配置后不生效？**

必须使用绝对路径，不支持 `~` 或相对路径。

**Q：不想用云端功能，只用本地？**

不配置 `OPENSPACE_API_KEY` 即可，所有进化的 Skill 仅存储在本地。

---

## 总结

OpenSpace 解决的是 AI Agent 的"健忘"问题。

目前市面上大多数 Agent 工具专注于"这次任务做得更好"，而 OpenSpace 专注于"每次任务之后变得更好"。这个区别在长期、高频使用场景下会产生显著差异——越用越快，越用越省。

对于每天都在用 Claude Code 跑大量任务的开发者，或者需要多个 Agent 协同工作的团队，这个工具值得认真试一下。

仓库地址：[https://github.com/HKUDS/OpenSpace](https://github.com/HKUDS/OpenSpace)
