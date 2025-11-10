import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: '关于我们 - JieCheng.Dev',
  description: 'JieCheng.Dev 技术博客平台介绍',
};

export default function AboutPage() {
  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article className="card p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                关于 JieCheng.Dev
              </h1>
              <p className="text-xl text-gray-600">
                专注于技术分享和学习交流的博客平台
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <h2>我们的使命</h2>
              <p>
                JieCheng.Dev 致力于为开发者提供一个高质量的技术分享平台。我们相信知识的力量，
                通过分享经验、教程和最佳实践，帮助更多的开发者成长和进步。
              </p>

              <h2>内容特色</h2>
              <ul>
                <li><strong>前端技术</strong>：涵盖 React、Vue、Next.js 等现代前端框架</li>
                <li><strong>全栈开发</strong>：从前端到后端的完整技术栈分享</li>
                <li><strong>实战教程</strong>：真实项目案例和解决方案</li>
                <li><strong>最佳实践</strong>：代码规范、架构设计和性能优化</li>
                <li><strong>工具推荐</strong>：提升开发效率的工具和技巧</li>
              </ul>

              <h2>技术栈</h2>
              <p>本博客使用以下技术构建：</p>
              <ul>
                <li><strong>Next.js</strong> - React 全栈框架</li>
                <li><strong>TypeScript</strong> - 类型安全的 JavaScript</li>
                <li><strong>Tailwind CSS</strong> - 原子化 CSS 框架</li>
                <li><strong>React Markdown</strong> - Markdown 渲染</li>
                <li><strong>Gray Matter</strong> - Frontmatter 解析</li>
              </ul>

              <h2>联系我们</h2>
              <p>
                如果你有任何问题、建议或想要投稿，欢迎通过以下方式联系我们：
              </p>
              <ul>
                <li>邮箱：1801256646ljc@gmail.com</li>
                <li>微信：JieCheng.Dev2024</li>
                <li>GitHub：@JieCheng.Dev</li>
              </ul>

              <h2>加入我们</h2>
              <p>
                我们欢迎更多的技术爱好者加入我们的内容创作团队。如果你：
              </p>
              <ul>
                <li>热爱技术分享</li>
                <li>有丰富的开发经验</li>
                <li>善于表达和写作</li>
                <li>愿意帮助他人学习成长</li>
              </ul>
              <p>
                那么请联系我们，让我们一起打造更好的技术社区！
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  🚀 持续更新中
                </h3>
                <p className="text-blue-700">
                  我们会持续更新和改进这个平台，添加更多实用功能，
                  如评论系统、搜索功能、RSS 订阅等。敬请期待！
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}