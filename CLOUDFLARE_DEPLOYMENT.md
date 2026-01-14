# Cloudflare Pages 部署指南

## ⚠️ 重要说明

本项目是 **Next.js** 应用，包含 **API 路由**（`/api/openai-proxy`）。

### 部署选项对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Vercel** | ✅ 原生 Next.js 支持<br>✅ 自动 API 路由<br>✅ 零配置 | ❌ 不是 Cloudflare | ⭐⭐⭐⭐⭐ |
| **Cloudflare Pages + GitHub** | ✅ 自动部署<br>✅ 全球 CDN | ⚠️ Next.js 支持有限<br>⚠️ API 路由需额外配置 | ⭐⭐⭐ |
| **Cloudflare Workers** | ✅ 完全控制<br>✅ 边缘计算 | ❌ 需要重构代码 | ⭐⭐ |

---

## 🎯 推荐方案：Vercel 部署（最简单）

### 为什么选择 Vercel？
- ✅ **由 Next.js 团队开发，完美支持**
- ✅ **API 路由自动工作，无需配置**
- ✅ **全球 CDN，速度快**
- ✅ **免费额度足够个人项目使用**
- ✅ **与 GitHub 深度集成**

### Vercel 部署步骤

#### 1. 访问 Vercel
https://vercel.com

#### 2. 连接 GitHub
- 点击 "New Project"
- 选择 "Import Git Repository"
- 选择仓库: `Ivan-GYF/Riverchain`

#### 3. 配置项目
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (自动检测)
Output Directory: .next (自动检测)
Install Command: npm install (自动检测)
```

#### 4. 添加环境变量
```bash
OPENAI_API_KEY=gsk-eyJjb2dlbl9pZCI6ICJiYWQ3Zjc2Yy0yMmMzLTQxN2EtYmIyZS0wNTJhODA4MDY1OGQiLCAia2V5X2lkIjogImNlZWVkMzllLWRlNjktNDc1NS05NWZiLTQyMzM3YTdhMzA1NCJ9fLw7jQeOh_TTXEHzSxQgoPrdn0Dy3FZKse2G43B42mnT
OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
```

#### 5. 部署
- 点击 "Deploy"
- 等待 2-3 分钟

#### 6. 访问应用
部署完成后，您将获得：
- **Production URL**: `https://riverchain.vercel.app`
- **预览 URL**: 每次 Git 推送自动生成

---

## 🔧 方案二：Cloudflare Pages（需要额外配置）

### 限制说明
⚠️ **Cloudflare Pages 对 Next.js API 路由的支持有限**

本项目使用了 `/api/openai-proxy` API 路由，需要额外配置才能在 Cloudflare Pages 上运行。

### 选项 A: 静态导出（移除 API 路由）

#### 步骤 1: 修改代码

将 OpenAI API 调用从服务器端移到客户端：

```typescript
// app/utils/ai.ts
async function callOpenAIAPI(messages, model) {
  // 直接从前端调用 GenSpark API
  const response = await fetch('https://www.genspark.ai/api/llm_proxy/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`, // 从 LocalStorage 获取
    },
    body: JSON.stringify({ model, messages })
  });
  return response.json();
}
```

#### 步骤 2: 更新 next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

#### 步骤 3: 构建和部署

```bash
npm run build
npx wrangler pages deploy out --project-name=riverchain
```

⚠️ **缺点**: API Key 暴露在前端（不安全）

---

### 选项 B: 使用 Cloudflare Workers（推荐但需重构）

需要将 Next.js API 路由改写为 Cloudflare Workers。

这需要大量重构工作，不建议当前阶段进行。

---

## 📊 部署对比总结

### Vercel 部署 ✅ 推荐
```
优点：
✅ 零配置，开箱即用
✅ API 路由完美支持
✅ 自动 HTTPS
✅ 全球 CDN
✅ GitHub 集成
✅ 免费额度足够

缺点：
❌ 不是 Cloudflare（但这不是问题）

部署时间：2-3 分钟
难度：⭐ (非常简单)
```

### Cloudflare Pages（静态导出）⚠️
```
优点：
✅ Cloudflare 基础设施
✅ 全球边缘网络

缺点：
❌ API Key 暴露在前端
❌ 需要修改代码
❌ 安全性降低
❌ 失去服务器端功能

部署时间：5-10 分钟
难度：⭐⭐⭐ (需要代码修改)
```

### Cloudflare Workers（完全重构）❌
```
优点：
✅ 完全的边缘计算能力
✅ 最佳性能

缺点：
❌ 需要完全重写应用
❌ 放弃 Next.js 框架
❌ 工作量巨大
❌ 学习曲线陡峭

部署时间：数天
难度：⭐⭐⭐⭐⭐ (完全重构)
```

---

## 🎯 最终建议

### 立即行动：使用 Vercel 部署

**为什么？**
1. **最快速度** - 2-3 分钟即可完成
2. **零配置** - 无需修改任何代码
3. **完美支持** - Next.js 原生平台
4. **安全可靠** - API Key 保护在服务器端
5. **免费使用** - 个人项目免费额度足够

**如何操作？**
1. 访问 https://vercel.com
2. 导入 GitHub 仓库 `Ivan-GYF/Riverchain`
3. 添加环境变量（见上文）
4. 点击部署

**5 分钟后，您的应用将在线运行！**

---

## 📚 相关资源

### Vercel
- 官网: https://vercel.com
- 文档: https://vercel.com/docs
- Next.js 部署: https://nextjs.org/docs/deployment

### Cloudflare Pages
- 官网: https://pages.cloudflare.com
- 文档: https://developers.cloudflare.com/pages
- Next.js 支持: https://developers.cloudflare.com/pages/framework-guides/nextjs

### GitHub 仓库
- URL: https://github.com/Ivan-GYF/Riverchain

---

## 🆘 需要帮助？

如果您坚持要使用 Cloudflare Pages，我可以帮您：
1. 转换为静态导出版本
2. 创建 Cloudflare Workers 版本
3. 设置 GitHub Actions 自动部署

但我强烈建议先尝试 Vercel - 它真的很简单！

---

## ✅ 快速决策指南

**如果您想要：**
- ✅ 最快部署 → **使用 Vercel**
- ✅ 最小改动 → **使用 Vercel**
- ✅ 最佳 Next.js 支持 → **使用 Vercel**
- ✅ API 路由正常工作 → **使用 Vercel**
- ⚠️ 必须用 Cloudflare → 联系我进行重构

---

**更新日期**: 2024-01-14
**当前项目**: Riverchain v2.1
**GitHub 仓库**: https://github.com/Ivan-GYF/Riverchain
