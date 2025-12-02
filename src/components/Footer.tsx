import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-white/20 border-t border-white/30 mt-16 relative z-10">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-gray-800">BlockCoder</h3>
              <p className="text-gray-600 mb-4">
                方块世界的代码师 - 一个专注于技术分享和学习交流的博客平台，致力于为开发者提供优质的技术内容和实用教程。
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">快速链接</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/posts" className="text-gray-600 hover:text-gray-800 transition-colors">
                    📚 所有文章
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-800 transition-colors">
                    📁 文章分类
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="text-gray-600 hover:text-gray-800 transition-colors">
                    🏷️ 标签云
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                    👨‍💻 关于我们
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">联系方式</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  1801256646ljc@gmail.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💬</span>
                  BlockCoder2024
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 BlockCoder. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm mt-2 md:mt-0 flex items-center">
              <span className="mr-2">⚡</span>
              Built with Next.js & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;