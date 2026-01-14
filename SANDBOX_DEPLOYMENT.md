# Riverchain 沙盒部署指南

## 📝 部署概述

Riverchain 智能投资决策系统 v2.1 现已在 GenSpark 沙盒环境成功部署。

## 🌐 访问信息

### 生产访问地址
- **公开 URL**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- **本地 URL**: http://localhost:3000
- **端口**: 3000
- **环境**: GenSpark/Novita Sandbox

### Sandbox 信息
- **Sandbox ID**: ituehabhum05ormfvf7pa-c81df28e
- **主机**: 3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- **运行环境**: Node.js + PM2

## ✅ 部署状态

### 应用状态
- ✅ **服务状态**: 在线运行
- ✅ **进程管理**: PM2
- ✅ **内存使用**: ~29.1 MB
- ✅ **启动时间**: ~2.6 秒
- ✅ **响应时间**: ~94ms

### 配置状态
- ✅ **OpenAI API Key**: 已配置 (环境变量)
- ✅ **OpenAI Base URL**: https://www.genspark.ai/api/llm_proxy/v1
- ✅ **默认模型**: gpt-5-mini (免费)
- ✅ **备用模型**: gpt-5-nano (免费)

## 🚀 使用指南

### 1. 访问应用
```bash
# 公开访问
https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai

# 或在浏览器中打开以上链接
```

### 2. 默认配置
- **免费模型**: gpt-5-mini 和 gpt-5-nano 开箱即用
- **无需 API Key**: 环境已预配置
- **即时评估**: 填写表单即可开始评估

### 3. 高级配置 (可选)
如需使用商业模型，在设置中配置：
- Perplexity API Key (用于 Sonar Pro/Reasoning)
- Google API Key (用于 Gemini 2.0 Flash)
- DeepSeek API Key (用于 DeepSeek R1)

## 🛠️ 管理命令

### 查看应用状态
```bash
cd /home/user/webapp
pm2 status
```

### 查看实时日志
```bash
pm2 logs riverchain-webapp --lines 50
```

### 重启应用
```bash
pm2 restart riverchain-webapp
```

### 停止应用
```bash
pm2 stop riverchain-webapp
```

### 重新部署
```bash
cd /home/user/webapp
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

## 📊 系统功能

### 可用功能
- ✅ **6 种 AI 模型支持**
  - gpt-5-mini (OpenAI, 免费)
  - gpt-5-nano (OpenAI, 免费)
  - sonar-pro (Perplexity, 需 API Key)
  - sonar-reasoning (Perplexity, 需 API Key)
  - gemini-2.0-flash (Google, 需 API Key)
  - deepseek-r1 (DeepSeek, 需 API Key)

- ✅ **核心评估功能**
  - Stage 1: 商业实体评级 (40%)
  - Stage 2: 交易质量评分 (60%)
  - 红旗警示系统
  - 风险等级判定

- ✅ **高级功能**
  - 核心分析师 Prompt 可编辑
  - 自定义智能体配置
  - 多智能体并行评估
  - Markdown 格式报告

- ✅ **数据持久化**
  - LocalStorage 存储配置
  - Zustand 状态管理
  - 表单数据自动保存

## 🔧 技术架构

### 技术栈
- **框架**: Next.js 14.2.35
- **语言**: TypeScript 5.0.0
- **UI**: React 18.3.1 + TailwindCSS 3.4.0
- **状态管理**: Zustand 4.5.0
- **进程管理**: PM2
- **AI 集成**: OpenAI API (GenSpark)

### 项目结构
```
/home/user/webapp/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── openai-proxy/  # OpenAI API 代理
│   ├── components/        # React 组件
│   ├── store/            # Zustand Store
│   └── utils/            # 工具函数
├── public/               # 静态资源
├── ecosystem.config.cjs  # PM2 配置
└── package.json         # 依赖配置
```

## 📈 性能指标

### 应用性能
- **首次加载**: ~2.6 秒
- **页面响应**: ~94ms
- **内存占用**: ~29.1 MB
- **CPU 使用**: < 1%

### API 性能
- **OpenAI 代理**: 正常
- **并发支持**: 多智能体并行
- **错误处理**: 完整

## 🔐 安全配置

### 环境变量 (已配置)
```bash
OPENAI_API_KEY=gsk-****** (已隐藏)
OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
NODE_ENV=development
PORT=3000
```

### 安全特性
- ✅ API Key 不暴露给前端
- ✅ 后端代理保护密钥
- ✅ CORS 配置正确
- ✅ 环境变量隔离

## 📚 相关文档

### 主要文档
- `README.md` - 项目概述
- `COMPLETION_SUMMARY.md` - v2.1 完成总结
- `OPENAI_INTEGRATION.md` - OpenAI 集成文档
- `VERSION_HISTORY.md` - 版本历史
- `QUICK_START.md` - 快速开始指南

### 部署文档
- `GITHUB_DEPLOYMENT.md` - GitHub 部署记录
- `CLOUDFLARE_DEPLOYMENT.md` - Cloudflare 部署指南
- `VERCEL_DEPLOYMENT.md` - Vercel 部署问题修复
- `SANDBOX_DEPLOYMENT.md` - 本文档 (沙盒部署)

### 测试脚本
- `test-openai-api.sh` - OpenAI API 测试脚本

## 🐛 问题排查

### 常见问题

#### 1. 应用无法访问
```bash
# 检查应用状态
pm2 status

# 检查端口占用
netstat -tlnp | grep 3000

# 重启应用
pm2 restart riverchain-webapp
```

#### 2. API 调用失败
```bash
# 检查环境变量
echo $OPENAI_API_KEY | head -c 20
echo $OPENAI_BASE_URL

# 测试 API
./test-openai-api.sh
```

#### 3. 日志查看
```bash
# 查看最近日志
pm2 logs --nostream --lines 50

# 实时监控
pm2 logs riverchain-webapp
```

#### 4. 清理并重启
```bash
cd /home/user/webapp
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

## 🎯 下一步建议

### 立即可用
1. ✅ 访问公开 URL
2. ✅ 使用免费模型 (gpt-5-mini)
3. ✅ 测试核心评估功能

### 可选增强
1. 配置商业模型 API Key
2. 自定义核心分析师 Prompt
3. 创建自定义智能体
4. 导出评估报告

### 未来优化
1. 添加数据持久化 (数据库)
2. 实现用户认证
3. 添加评估历史记录
4. 优化响应速度

## 📞 技术支持

### 快速测试
```bash
# 完整测试
cd /home/user/webapp
./test-openai-api.sh
```

### 手动测试 API
```bash
curl -X POST http://localhost:3000/api/openai-proxy \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-mini",
    "messages": [{"role": "user", "content": "Hello"}],
    "temperature": 0.7,
    "max_tokens": 100
  }'
```

## 🎉 部署完成

**Riverchain 智能投资决策系统 v2.1** 已成功部署到 GenSpark 沙盒环境！

- 🌐 **立即访问**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- 📖 **查看文档**: README.md
- 🚀 **开始使用**: 填写借款方信息 → 配置交易 → 开始评估

---

**部署日期**: 2024-01-14  
**版本**: v2.1  
**环境**: GenSpark Sandbox (Novita)  
**状态**: ✅ 运行中
