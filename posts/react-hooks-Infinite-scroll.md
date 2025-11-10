---
title: "React Hooks 封装一个列表触底刷新"
excerpt: "封装一个列表触底刷新的 React Hooks，基于传入的container容器div去监听滚动到底部。"
date: "2025-11-10"

category: "前端开发"
tags: ["React", "Hooks", "JavaScript", "List"]
--- 
一个功能强大、灵活的 React 无限滚动 Hook，支持页码分页、自定义加载条件和外部状态控制。

## 特性

- 🚀 **页码分页**：使用标准的页码参数，从第1页开始
- 🎯 **灵活控制**：支持外部函数判断是否还有更多数据
- 🔄 **状态管理**：内置加载状态、错误处理和数据重置
- 📱 **性能优化**：使用 refs 避免闭包问题，支持被动滚动监听
- 🛠 **依赖控制**：支持依赖条件，只有在满足条件时才初始化加载
- 🎨 **TypeScript**：完整的 TypeScript 支持

## 安装

```bash
# 该 Hook 位于项目内部
import { useInfiniteScroll } from '@/pages/data-sync/hooks';
```

## 基础用法

```tsx
import React from 'react';
import { useInfiniteScroll } from '@/pages/data-sync/hooks';

interface DataItem {
  id: string;
  name: string;
}

const MyComponent = () => {
  // 定义数据获取函数
  const fetchData = async (page: number): Promise<DataItem[]> => {
    const response = await fetch(`/api/data?page=${page}&size=20`);
    const result = await response.json();
    return result.data;
  };

  const { 
    data, 
    loading, 
    error, 
    containerRef 
  } = useInfiniteScroll(fetchData);

  return (
    <div 
      ref={containerRef} 
      style={{ height: '400px', overflowY: 'auto' }}
    >
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      {loading && <div>加载中...</div>}
      {error && <div>错误: {error}</div>}
    </div>
  );
};
```

## 高级用法

### 自定义 hasMore 判断

```tsx
const MyComponent = () => {
  const [total, setTotal] = useState(0);

  const fetchData = async (page: number) => {
    const response = await fetch(`/api/data?page=${page}`);
    const result = await response.json();
    
    // 更新总数
    setTotal(result.total);
    
    return result.data;
  };

  const { data, loading, containerRef, reset } = useInfiniteScroll(fetchData, {
    // 根据总数判断是否还有更多数据
    hasMoreChecker: (data) => data.length < total,
    threshold: 50, // 距离底部50px时触发加载
  });

  return (
    <div ref={containerRef} style={{ height: '400px', overflowY: 'auto' }}>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      {loading && <div>加载中...</div>}
      {data.length >= total && <div>没有更多数据了</div>}
    </div>
  );
};
```

### 条件加载

```tsx
const MyComponent = () => {
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');

  const fetchData = async (page: number) => {
    const response = await fetch(`/api/data?page=${page}&userId=${userId}&category=${category}`);
    return response.data;
  };

  const { data, loading, containerRef, reset } = useInfiniteScroll(fetchData, {
    enabled: !!(userId && category), // 只有在用户ID和分类都存在时才启用
    deeps: [userId, category], // 当这些依赖变化时重新初始化
  });

  // 当条件变化时重置数据
  useEffect(() => {
    if (userId && category) {
      reset();
    }
  }, [userId, category, reset]);

  return (
    <div>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">选择用户</option>
        <option value="1">用户1</option>
        <option value="2">用户2</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">选择分类</option>
        <option value="A">分类A</option>
        <option value="B">分类B</option>
      </select>

      <div ref={containerRef} style={{ height: '400px', overflowY: 'auto' }}>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
        {loading && <div>加载中...</div>}
      </div>
    </div>
  );
};
```

### 手动控制加载

```tsx
const MyComponent = () => {
  const { 
    data, 
    loading, 
    containerRef, 
    loadMore,  // 手动加载更多
    reset,     // 重置数据
    currentPage // 当前页码
  } = useInfiniteScroll(fetchData);

  const handleRefresh = () => {
    reset(); // 重置到第一页
    setTimeout(() => {
      loadMore(); // 手动触发加载
    }, 0);
  };

  return (
    <div>
      <button onClick={handleRefresh}>刷新数据</button>
      <button onClick={loadMore} disabled={loading}>
        手动加载更多 (当前第{currentPage}页)
      </button>
      
      <div ref={containerRef} style={{ height: '400px', overflowY: 'auto' }}>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
        {loading && <div>加载中...</div>}
      </div>
    </div>
  );
};
```

## API

### useInfiniteScroll(fetchMore, options?)

#### 参数

**fetchMore: (page: number) => Promise<T[]>**
- 数据获取函数
- 参数：**page** - 页码（从1开始）
- 返回：Promise，解析为数据数组

**options: UseInfiniteScrollOptions**
- **enabled?: boolean** - 是否启用无限滚动，默认 **true**
- **threshold?: number** - 距离底部多少像素时触发加载，默认 **100**
- **hasMoreChecker?: (data: T[], currentPage: number) => boolean** - 自定义判断是否还有更多数据的函数
- **deeps?: string[]** - 依赖数组，当这些值都存在时才初始化加载

#### 返回值

```tsx
{
  data: T[];              // 当前已加载的所有数据
  loading: boolean;       // 是否正在加载
  error: string | null;   // 错误信息
  containerRef: RefObject<HTMLDivElement>; // 容器引用，需要绑定到滚动容器
  loadMore: () => Promise<void>;  // 手动加载更多数据
  reset: () => void;      // 重置所有状态到初始值
  currentPage: number;    // 当前页码
}
```

## 注意事项

1. **容器引用**：必须将 **containerRef** 绑定到可滚动的容器元素上
2. **容器样式**：确保容器有固定高度和 **overflow-y: auto** 样式
3. **数据重置**：当筛选条件变化时，记得调用 **reset()** 重置数据
4. **错误处理**：建议在 UI 中显示 **error** 状态
5. **性能优化**：Hook 内部使用了 refs 避免闭包问题，无需担心重复渲染

## 常见问题

### Q: 为什么滚动到底部不触发加载？
A: 检查以下几点：
- 容器是否正确绑定了 **containerRef**
- 容器是否有固定高度和滚动样式
- **enabled** 选项是否为 **true**
- **hasMoreChecker** 是否返回 **true**

### Q: 如何实现下拉刷新？
A: 调用 **reset()** 清空数据，然后手动调用 **loadMore()** 重新加载第一页

### Q: 如何根据总数判断是否还有更多数据？
A: 使用 **hasMoreChecker** 选项：
```tsx
hasMoreChecker: (data) => data.length < total
```

### Q: 如何在条件变化时重新加载？
A: 使用 **deeps** 选项指定依赖，或在 **useEffect** 中调用 **reset()** 和 **loadMore()**

## 更新日志

- **v1.0.0**: 初始版本，支持基础无限滚动
- **v1.1.0**: 添加自定义 **hasMoreChecker** 支持
- **v1.2.0**: 添加 **deeps** 依赖控制和手动加载功能