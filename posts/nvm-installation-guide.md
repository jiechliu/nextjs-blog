---
title: "NVM 安装教程 - Node.js 版本管理神器"
date: "2025-11-13"
category: "开发工具"
tags: ["Node.js", "NVM", "开发环境", "版本管理"]
excerpt: "详细介绍如何在 Windows、macOS 和 Linux 系统上安装和使用 NVM，轻松管理多个 Node.js 版本。"
featured: true
---

NVM（Node Version Manager）是一个强大的 Node.js 版本管理工具，允许您在同一台机器上安装和切换多个 Node.js 版本。这对于开发不同项目或测试兼容性非常有用。

## 为什么需要 NVM？

### 🎯 主要优势

- **版本切换**：快速在不同 Node.js 版本间切换
- **项目隔离**：不同项目使用不同的 Node.js 版本
- **测试兼容性**：在多个版本上测试应用
- **避免权限问题**：无需 sudo 安装全局包
- **团队协作**：确保团队使用相同的 Node.js 版本

### 🔧 适用场景

- 维护多个项目，需要不同 Node.js 版本
- 升级 Node.js 版本后需要测试兼容性
- 学习新特性，需要尝试最新版本
- 解决依赖包的版本冲突问题

## Windows 系统安装

### 方法一：使用 nvm-windows（推荐）

**nvm-windows** 是专为 Windows 设计的 NVM 实现。

#### 1. 下载安装包

访问 [nvm-windows 发布页面](https://github.com/coreybutler/nvm-windows/releases)，下载最新的 **nvm-setup.zip**。

#### 2. 安装步骤

```bash
# 1. 解压下载的文件
# 2. 以管理员身份运行 nvm-setup.exe
# 3. 按照安装向导完成安装
# 4. 重启命令行或 PowerShell
```

#### 3. 验证安装

```bash
nvm version
# 输出版本号表示安装成功
```

### 方法二：使用 Chocolatey

如果您已经安装了 Chocolatey：

```bash
# 以管理员身份运行
choco install nvm

# 重启命令行
nvm --version
```

### 方法三：使用 Scoop

如果您使用 Scoop 包管理器：

```bash
scoop install nvm

# 验证安装
nvm --version
```

## macOS 系统安装

### 方法一：使用 curl（推荐）

```bash
# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc
# 或者
source ~/.zshrc
```

### 方法二：使用 wget

```bash
# 使用 wget 下载安装脚本
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载配置
source ~/.bashrc
```

### 方法三：使用 Homebrew

```bash
# 安装 nvm
brew install nvm

# 创建 nvm 目录
mkdir ~/.nvm

# 添加到 shell 配置文件
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/bin/nvm" ] && \. "/opt/homebrew/bin/nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/share/nvm/nvm.sh" ] && \. "/opt/homebrew/share/nvm/nvm.sh"' >> ~/.zshrc

# 重新加载配置
source ~/.zshrc
```

## Linux 系统安装

### Ubuntu/Debian 系统

```bash
# 更新包管理器
sudo apt update

# 安装 curl（如果未安装）
sudo apt install curl

# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 bash 配置
source ~/.bashrc

# 验证安装
nvm --version
```

### CentOS/RHEL/Fedora 系统

```bash
# 安装 curl（如果未安装）
sudo yum install curl
# 或者在较新版本中
sudo dnf install curl

# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载配置
source ~/.bashrc

# 验证安装
nvm --version
```

## 基本使用方法

### 查看可用版本

```bash
# 查看所有可安装的 Node.js 版本
nvm ls-remote

# 查看 LTS 版本
nvm ls-remote --lts

# 查看已安装的版本
nvm ls
```

### 安装 Node.js 版本

```bash
# 安装最新版本
nvm install node

# 安装指定版本
nvm install 18.17.0

# 安装最新的 LTS 版本
nvm install --lts

# 安装指定的 LTS 版本
nvm install lts/hydrogen
```

### 切换 Node.js 版本

```bash
# 切换到指定版本
nvm use 18.17.0

# 切换到最新版本
nvm use node

# 切换到最新 LTS 版本
nvm use --lts
```

### 设置默认版本

```bash
# 设置默认版本
nvm alias default 18.17.0

# 设置默认为最新 LTS
nvm alias default lts/*
```

### 卸载版本

```bash
# 卸载指定版本
nvm uninstall 16.20.0

# 注意：无法卸载当前正在使用的版本
```

## 高级使用技巧

### 1. 项目级版本管理

在项目根目录创建 **.nvmrc** 文件：

```bash
# 创建 .nvmrc 文件
echo "18.17.0" > .nvmrc

# 使用项目指定的版本
nvm use

# 安装项目指定的版本
nvm install
```

### 2. 自动切换版本

在 shell 配置文件中添加自动切换脚本：

```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

### 3. 全局包管理

```bash
# 查看当前版本的全局包
npm list -g --depth=0

# 从另一个版本复制全局包
nvm install 18.17.0 --reinstall-packages-from=16.20.0
```

## 常见问题解决

### 问题 1：命令未找到

**症状**：**nvm: command not found**

**解决方案**：
```bash
# 检查 nvm 是否正确安装
ls -la ~/.nvm

# 手动添加到 shell 配置
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc

# 重新加载配置
source ~/.zshrc
```

### 问题 2：权限错误

**症状**：安装时出现权限错误

**解决方案**：
```bash
# 确保 nvm 目录权限正确
sudo chown -R $(whoami) ~/.nvm

# 重新安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 问题 3：版本切换不生效

**症状**：使用 **nvm use** 后版本没有改变

**解决方案**：
```bash
# 检查当前 shell
echo $SHELL

# 确保在正确的 shell 配置文件中添加了 nvm
# 对于 bash：~/.bashrc
# 对于 zsh：~/.zshrc

# 重启终端或重新加载配置
source ~/.zshrc
```

### 问题 4：Windows 上的路径问题

**症状**：Windows 上 nvm 路径有问题

**解决方案**：
```bash
# 以管理员身份运行命令行
# 检查环境变量
echo $NVM_HOME
echo $NVM_SYMLINK

# 重新设置符号链接
nvm use 18.17.0
```

## 最佳实践

### 1. 版本选择建议

- **生产环境**：使用当前 LTS 版本
- **开发环境**：可以尝试最新稳定版
- **学习新特性**：使用最新版本
- **兼容性测试**：使用多个版本测试

### 2. 项目配置

```json
// package.json 中指定 Node.js 版本
{
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=9.0.0"
  }
}
```

### 3. 团队协作

```bash
# 团队统一使用 .nvmrc
echo "18.17.0" > .nvmrc

# 在 README.md 中说明
# Node.js 版本要求：18.17.0
# 使用 **nvm use** 切换到指定版本
```

## 总结

NVM 是 Node.js 开发者必备的工具，它让版本管理变得简单高效。通过本教程，您应该能够：

- ✅ 在各种操作系统上成功安装 NVM
- ✅ 掌握基本的版本管理操作
- ✅ 解决常见的安装和使用问题
- ✅ 应用最佳实践提高开发效率

记住，选择合适的 Node.js 版本对项目的稳定性和性能都很重要。建议在生产环境中使用 LTS 版本，在开发环境中可以尝试新特性。

**推荐阅读**：
- [Node.js 官方文档](https://nodejs.org/docs/)
- [npm 包管理指南](https://docs.npmjs.com/)
- [Node.js 版本发布计划](https://nodejs.org/en/about/releases/)