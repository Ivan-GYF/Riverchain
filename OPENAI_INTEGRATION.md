# OpenAI 模型集成说明

## 更新内容

本次更新将 Genspark 的两个免费模型替换为 OpenAI 的底层模型，使用其原始模型名称。

### 模型配置

#### OpenAI 免费模型（通过 GenSpark OpenAI 兼容 API）

1. **gpt-5-mini** - 轻量级模型
   - 免费使用，无需 API Key
   - 快速响应，适合日常评估
   - 内部通过 GenSpark OpenAI 代理调用

2. **gpt-5-nano** - 超轻量级模型
   - 免费使用，无需 API Key
   - 极速响应，适合快速评估
   - 内部通过 GenSpark OpenAI 代理调用

### 技术实现

#### 1. 环境变量配置

应用自动从 GenSpark 环境继承 OpenAI API 配置：

```bash
OPENAI_API_KEY=gsk-xxxxx  # GenSpark 自动注入
OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1  # GenSpark OpenAI 代理
```

#### 2. API 路由

创建了内部代理路由 `/api/openai-proxy/route.ts`，用于：
- 接收前端请求
- 添加必要的认证头
- 转发到 GenSpark OpenAI 兼容端点
- 返回标准 OpenAI API 响应

#### 3. 模型选择器更新

在 `app/utils/ai.ts` 中更新了模型配置：

```typescript
{
  id: 'gpt-5-mini',
  name: 'gpt-5-mini (免费)',
  provider: 'openai',
  requiresApiKey: false,
  description: 'OpenAI 轻量级模型，快速响应，无需 API Key',
},
{
  id: 'gpt-5-nano',
  name: 'gpt-5-nano (免费)',
  provider: 'openai',
  requiresApiKey: false,
  description: 'OpenAI 超轻量级模型，极速响应，无需 API Key',
}
```

#### 4. PM2 环境变量传递

在 `ecosystem.config.cjs` 中配置环境变量传递：

```javascript
env: {
  NODE_ENV: 'development',
  PORT: 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL || 'https://www.genspark.ai/api/llm_proxy/v1'
}
```

### 使用说明

1. **默认模型**: 系统默认使用 `gpt-5-mini`
2. **无需配置**: 免费模型开箱即用，无需额外配置
3. **模型切换**: 在设置页面可以切换到其他模型：
   - gpt-5-mini (免费)
   - gpt-5-nano (免费)
   - Sonar Pro (需要 Perplexity API Key)
   - Sonar Reasoning (需要 Perplexity API Key)
   - Gemini 2.0 Flash (需要 Google API Key)
   - DeepSeek R1 (需要 DeepSeek API Key)

### 支持的 OpenAI 模型列表

根据 GenSpark 文档，当前支持以下模型：
- `gpt-5`
- `gpt-5.1`
- `gpt-5.2`
- `gpt-5-mini` ⭐ (当前使用)
- `gpt-5-nano` ⭐ (当前使用)
- `gpt-5-codex`

### 测试验证

运行以下命令测试 API 连接：

```bash
# 测试环境变量
echo "OPENAI_API_KEY: ${OPENAI_API_KEY:0:20}..."
echo "OPENAI_BASE_URL: $OPENAI_BASE_URL"

# 测试应用访问
curl -s http://localhost:3000 | head -3

# 查看PM2日志
pm2 logs riverchain-webapp --nostream --lines 20
```

### 故障排查

如果遇到 "OpenAI API Key 未配置" 错误：

1. 检查环境变量是否正确设置：
   ```bash
   echo $OPENAI_API_KEY
   echo $OPENAI_BASE_URL
   ```

2. 确保 PM2 进程已重启以加载最新环境变量：
   ```bash
   pm2 delete all
   pm2 start ecosystem.config.cjs
   ```

3. 检查 GenSpark 配置文件：
   ```bash
   cat ~/.genspark_llm.yaml
   ```

### 相关文件

- `app/utils/ai.ts` - AI 调用工具类
- `app/api/openai-proxy/route.ts` - OpenAI API 代理路由
- `app/store/useStore.ts` - 状态管理（默认模型配置）
- `ecosystem.config.cjs` - PM2 配置（环境变量传递）
- `app/components/SettingsModal.tsx` - 设置界面
- `app/components/CustomAgentConfig.tsx` - 自定义智能体配置

### 更新日志

**2024-01-13**
- ✅ 将 Genspark 免费模型替换为 OpenAI 底层模型
- ✅ 使用模型原始名称：gpt-5-mini、gpt-5-nano
- ✅ 创建内部 OpenAI API 代理路由
- ✅ 配置 PM2 环境变量传递
- ✅ 更新默认模型为 gpt-5-mini
- ✅ 测试验证 API 连接正常

## 后续计划

- 考虑添加其他 OpenAI 模型（gpt-5, gpt-5.1, gpt-5.2）
- 优化错误处理和用户提示
- 添加模型性能监控
