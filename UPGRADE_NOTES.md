# Riverchain 系统升级说明

## 🚀 版本 2.0 - 多模型支持与自定义评估标准

### 📅 更新日期
2024年

### ✨ 新增功能

#### 1. 核心分析师 System Prompt 可编辑功能 ✅

**功能描述**:
- 用户现在可以在设置页面的"核心分析师 Prompt"标签中编辑和自定义评估标准
- 支持修改红旗警示条件（如运营年限要求、年收入标准）
- 可以调整 Stage 1 和 Stage 2 的权重比例
- 可以修改 LTV 上限（保理业务、发票融资）
- 可以添加新的评估维度和评分标准
- 支持一键重置到默认 Prompt

**使用方法**:
1. 点击右上角"设置"按钮
2. 切换到"核心分析师 Prompt"标签
3. 在文本框中编辑 System Prompt
4. 点击"保存设置"

**注意事项**:
- 建议保留 JSON 输出格式要求，确保系统能正确解析响应
- 修改后的 Prompt 会立即生效，影响核心分析师的评估行为
- 自定义的 Prompt 会保存在浏览器 LocalStorage 中

---

#### 2. 多 AI 模型支持 ✅

**新增模型**:

##### 🆓 免费模型（无需 API Key）
- **Genspark Pro (免费)**: Genspark 内置免费模型，无需配置
- **Genspark Lite (免费)**: Genspark 轻量级免费模型，快速响应

##### Perplexity 模型
- **Sonar Pro**: 快速评估，性能稳定，响应速度快
- **Sonar Reasoning**: 深度推理，适合复杂案例

##### Google Gemini
- **Gemini 2.0 Flash**: Google 最新模型，速度快，质量高

##### DeepSeek
- **DeepSeek R1**: DeepSeek 推理模型，深度分析能力强

**模型选择**:
- 在设置页面的"模型与 API 配置"标签中选择 AI 模型
- 免费模型无需配置，可直接使用
- 商业模型需要配置对应的 API Key

**API Key 配置**:
- **Perplexity API Key**: https://www.perplexity.ai/settings/api
- **Google API Key**: https://makersuite.google.com/app/apikey
- **DeepSeek API Key**: https://platform.deepseek.com/api_keys

---

#### 3. Perplexity API Key 可选配置 ✅

**重要变更**:
- Perplexity API Key 不再是必填项
- 系统默认使用 Genspark 免费模型
- 用户可以选择免费模型或配置商业模型 API Key

**优势**:
- 新用户无需配置即可立即使用系统
- 降低使用门槛
- 提供灵活的模型选择

---

#### 4. 自定义智能体模型选择 ✅

**功能描述**:
- 每个自定义智能体现在可以独立选择使用的 AI 模型
- 支持为不同的专家配置不同的模型

**使用场景**:
- 核心分析师使用 Gemini 2.0 Flash 进行快速评估
- 宏观经济专家使用 DeepSeek R1 进行深度推理
- 法律顾问使用 Sonar Reasoning 进行复杂分析
- 财务审计师使用免费模型降低成本

**配置方法**:
1. 在"自定义智能体配置"区域点击"新增智能体"
2. 填写智能体名称和角色设定
3. 在"使用模型"下拉框中选择 AI 模型
4. 保存智能体配置

---

### 🔧 技术改进

#### 1. 统一的 AI 调用接口
- 创建新的 `app/utils/ai.ts` 工具类
- 支持多种 AI 提供商（Perplexity、Google、DeepSeek、Genspark）
- 统一的消息格式和响应解析
- 自动处理不同 API 的格式差异

#### 2. 类型系统增强
- 新增 `AIModel` 类型定义
- 新增 `ModelConfig` 接口
- 更新 `CustomAgent` 接口，添加 `model` 字段
- 更新 `SystemConfig` 接口，支持自定义核心 Prompt

#### 3. Genspark 内置 API 路由
- 创建 `/api/genspark-ai` 路由
- 支持免费模型的后端调用
- 自动处理请求转发和响应格式化

---

### 📊 模型对比

| 模型 | 提供商 | 费用 | 速度 | 适用场景 |
|-----|--------|------|------|---------|
| Genspark Pro | Genspark | 免费 | 快 | 日常评估，快速测试 |
| Genspark Lite | Genspark | 免费 | 很快 | 轻量级评估 |
| Sonar Pro | Perplexity | 付费 | 快 | 标准评估 |
| Sonar Reasoning | Perplexity | 付费 | 中 | 复杂案例深度分析 |
| Gemini 2.0 Flash | Google | 付费 | 很快 | 高质量快速评估 |
| DeepSeek R1 | DeepSeek | 付费 | 慢 | 需要深度推理的场景 |

---

### 🎯 使用建议

#### 场景 1: 初次使用/测试
**推荐配置**:
- 核心分析师: Genspark Pro (免费)
- 无需配置 API Key
- 立即可用

#### 场景 2: 日常生产环境
**推荐配置**:
- 核心分析师: Gemini 2.0 Flash
- 自定义智能体: Genspark Pro (免费)
- 平衡质量和成本

#### 场景 3: 复杂案例深度分析
**推荐配置**:
- 核心分析师: Sonar Reasoning
- 宏观经济专家: DeepSeek R1
- 法律顾问: Sonar Reasoning
- 最高质量分析

#### 场景 4: 完全免费方案
**推荐配置**:
- 核心分析师: Genspark Pro (免费)
- 所有自定义智能体: Genspark Lite (免费)
- 零成本运营

---

### 🔄 迁移指南

#### 从 v1.0 升级到 v2.0

**自动迁移**:
- 系统会自动将默认模型设置为 Genspark Pro (免费)
- 已保存的 Perplexity API Key 会被保留
- 核心分析师 Prompt 会使用默认值

**手动迁移步骤**:
1. 访问设置页面
2. 检查模型选择（默认为 Genspark Pro）
3. 如需使用商业模型，配置对应的 API Key
4. （可选）编辑核心分析师 Prompt 以自定义评估标准

**兼容性**:
- ✅ 所有旧的表单数据完全兼容
- ✅ 自定义智能体配置完全兼容（会自动使用默认免费模型）
- ✅ LocalStorage 数据结构向后兼容

---

### 🐛 已知问题

1. **Genspark 免费模型限制**:
   - 免费模型可能有速率限制
   - 响应质量可能略低于商业模型
   - 建议在生产环境使用商业模型

2. **API Key 验证**:
   - 系统不会预先验证 API Key 的有效性
   - 错误的 API Key 会在评估时返回错误
   - 建议在配置后立即进行测试评估

3. **模型响应格式**:
   - 不同模型的响应格式可能略有差异
   - 系统会尝试自动解析，但某些情况下可能失败
   - 如遇到解析错误，建议切换模型或调整 Prompt

---

### 📝 更新日志

#### v2.0.0 (2024)
- ✨ 新增核心分析师 System Prompt 编辑功能
- ✨ 新增 Gemini 2.0 Flash 模型支持
- ✨ 新增 DeepSeek R1 模型支持
- ✨ 新增 2 个 Genspark 免费模型
- 🔧 Perplexity API Key 改为可选
- 🔧 自定义智能体支持模型选择
- 🔧 重构 AI 调用逻辑
- 🔧 更新类型系统

#### v1.0.0 (2024)
- 🎉 初始版本发布
- ✅ 核心分析师评估
- ✅ 自定义智能体
- ✅ 多智能体并行评估
- ✅ 结果可视化仪表盘

---

### 🔗 相关链接

- **应用地址**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- **Perplexity API**: https://www.perplexity.ai/settings/api
- **Google AI Studio**: https://makersuite.google.com/app/apikey
- **DeepSeek Platform**: https://platform.deepseek.com/api_keys
- **项目文档**: README.md
- **快速开始**: QUICK_START.md

---

### 💬 反馈与支持

如有问题或建议，请通过以下方式联系：
- 查看完整文档: README.md
- 快速上手指南: QUICK_START.md
- 项目总结: PROJECT_SUMMARY.md

---

**Riverchain 智能投资决策系统** v2.0 © 2024
