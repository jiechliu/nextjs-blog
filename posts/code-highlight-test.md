---
title: "代码高亮文章"
date: "2024-01-15"
category: "技术"
tags: ["JavaScript", "React", "CSS"]
excerpt: "博客系统的代码高亮功能，展示各种编程语言的语法高亮效果。"
---

这篇文章用于测试我们博客系统的代码高亮功能。

## JavaScript 代码示例

```javascript
// React Hook 示例
import { useState, useEffect } from 'react';

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  useEffect(() => {
    console.log(`计数器值变化：${count}`);
  }, [count]);
  
  return { count, increment, decrement, reset };
};

export default useCounter;
```

## TypeScript 代码示例

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

class UserService {
  private users: User[] = [];
  
  async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      this.users = data;
      return this.users;
    } catch (error) {
      console.error('获取用户失败:', error);
      throw new Error('无法获取用户数据');
    }
  }
  
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
```

## CSS 代码示例

```css
/* 现代 CSS 网格布局 */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: 
    "header header"
    "main sidebar"
    "footer footer";
  gap: 2rem;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  border-radius: 0.5rem;
}

.main-content {
  grid-area: main;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "main"
      "sidebar"
      "footer";
  }
}
```

## Python 代码示例

```python
from typing import List, Optional
import asyncio
import aiohttp

class BlogPost:
    def __init__(self, title: str, content: str, author: str):
        self.title = title
        self.content = content
        self.author = author
        self.created_at = datetime.now()
        self.tags: List[str] = []
    
    def add_tag(self, tag: str) -> None:
        """添加标签到文章"""
        if tag not in self.tags:
            self.tags.append(tag)
    
    def __str__(self) -> str:
        return f"《{self.title}》 by {self.author}"

async def fetch_posts(url: str) -> Optional[List[dict]]:
    """异步获取文章列表"""
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url) as response:
                if response.status == 200:
                    return await response.json()
                return None
        except Exception as e:
            print(f"获取文章失败: {e}")
            return None

# 使用示例
if __name__ == "__main__":
    post = BlogPost("Python异步编程", "内容...", "张三")
    post.add_tag("Python")
    post.add_tag("异步")
    print(post)
```

## 行内代码测试

在文本中使用 `console.log()` 函数输出信息，或者使用 `useState` Hook 管理组件状态。

## 引用块测试

> 这是一个引用块的示例。引用块通常用于引用其他人的话语或者重要的信息。
> 
> 可以包含多行内容，并且支持 **粗体** 和 *斜体* 文本。

## 表格测试

| 语言 | 类型 | 特点 |
|------|------|------|
| JavaScript | 动态 | 灵活、广泛使用 |
| TypeScript | 静态 | 类型安全、可维护 |
| Python | 动态 | 简洁、易学 |
| Rust | 静态 | 内存安全、高性能 |

## 列表测试

### 无序列表
- React Hook 的优势
- 函数式组件的简洁性
- 状态管理的便利性
- 副作用处理的统一性

### 有序列表
1. 创建新的 React 项目
2. 安装必要的依赖
3. 配置开发环境
4. 开始编写代码

这就是我们的代码高亮功能测试！