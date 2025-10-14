# Page Hook: Web Add-On

自动保存用户输入的 JavaScript 代码 并在 每次 同源页面 加载后 自动执行.

## 特性

- **CSP 兼容**: 使用 `chrome.scripting.executeScript` API 绕过内容安全策略 (CSP) 限制, 确保用户脚本能在任何网站上执行
- **自动执行**: 页面加载完成后自动运行用户定义的 JavaScript 代码
- **按域名存储**: 每个域名可以有独立的脚本配置

## 技术实现

扩展使用后台服务工作线程 (service worker) 通过特权上下文执行脚本, 避免了传统方法 (如 blob: URL 或内联脚本) 被严格的 CSP 策略阻止的问题.

____

<footer>
    <small>
        Copyright &copy; 2025  <a href='https://github.com/shynur'>shynur</a> &lt;<a href='mailto:shynur@outlook.com'>shynur@outlook.com</a>&gt;.
        All rights reserved.
    </small>
</footer>
