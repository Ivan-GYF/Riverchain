# Riverchain 智能投资决策系统

## 项目概述

**Riverchain 智能投资决策系统** 是一个基于 AI 的信贷风控评估系统，采用多智能体评估框架，支持多种 AI 模型（包括免费模型），提供全面、专业的风险分析服务。

## ✨ 最新更新 (v2.1)

- ✅ **OpenAI 模型集成**: 使用 OpenAI 底层模型原名（gpt-5-mini、gpt-5-nano）
- ✅ **核心 Prompt 可编辑**: 自定义评估标准和规则
- ✅ **多模型支持**: Gemini 2.0 Flash、DeepSeek R1、OpenAI 免费模型
- ✅ **免费使用**: 无需配置即可使用 gpt-5-mini 和 gpt-5-nano
- ✅ **灵活配置**: 每个智能体可独立选择模型

查看详细更新: [UPGRADE_NOTES.md](./UPGRADE_NOTES.md) | [OpenAI 集成说明](./OPENAI_INTEGRATION.md)

## 🎯 核心功能

### 1. 双阶段评估框架
- **Stage 1: 商业实体评级 (40% 权重)**
  - 商业资质与信誉评估
  - 财务健康度分析（盈利能力、流动性、偿债能力）
  - 管理能力与履约记录
  - 行业地位与竞争力

- **Stage 2: 交易评分 (60% 权重)**
  - 对手方信用质量评级
  - LTV 合规性检查
  - 账期合理性分析
  - 担保措施评估
  - 集中度风险控制

### 2. 红旗警示系统
自动检测以下高风险情况：
- ⚠️ 运营年限 < 5年
- ⚠️ 年收入 < HK$ 10M
- ⚠️ 存在诉讼记录或文件造假
- ⚠️ LTV 超限（保理 > 90%，发票融资 > 70%）
- ⚠️ 集中度超限（单一借款人 > 18%，单一雇主 > 27%）

### 3. 多智能体评估
- **核心分析师**: 基于 Riverchain 标准的严格风控评估（Prompt 可自定义）
- **自定义智能体**: 可配置多个专家视角，每个智能体可选择不同的 AI 模型

### 4. 智能化工作流
- 📝 **三标签页表单**: 借款方信息、交易结构、文档上下文
- 🤖 **并行评估**: 多个智能体同时工作，提高效率
- 📊 **可视化结果**: 评分卡、风险等级、详细分析报告
- 📋 **Markdown 报告**: 完整的推理过程和建议措施

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **AI 集成**: 多模型支持
  - 免费: gpt-5-mini、gpt-5-nano (OpenAI)
  - Perplexity: Sonar Pro、Sonar Reasoning
  - Google: Gemini 2.0 Flash
  - DeepSeek: DeepSeek R1
- **Markdown 渲染**: react-markdown
- **图标**: lucide-react

## 📦 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置 AI 模型 (可选)
**无需配置即可使用**: 系统默认使用 gpt-5-mini 免费模型

如需使用商业模型:
1. 点击右上角"设置"按钮
2. 选择想要使用的 AI 模型
3. 配置对应的 API Key:
   - Perplexity: https://www.perplexity.ai/settings/api
   - Google: https://makersuite.google.com/app/apikey
   - DeepSeek: https://platform.deepseek.com/api_keys

### 3. 启动开发服务器
```bash
# 方式 1: 直接启动
npm run dev

# 方式 2: 使用 PM2 (推荐用于沙盒环境)
pm2 start ecosystem.config.cjs
```

### 4. 访问应用
- 本地: http://localhost:3000
- 公共访问: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai

## 🔧 使用指南

### Step 1: 配置 API Key
1. 点击右上角"设置"按钮
2. 输入 Perplexity API Key
3. 选择模型（推荐 sonar-pro）
4. 保存设置

### Step 2: 填写评估信息
切换三个标签页，填写完整信息：

**借款方信息**
- 公司名称、运营年限、年收入
- 毛利率、净利润率
- 流动比率、速动比率、资产负债率
- 业务类型、法律地位、诉讼记录

**交易结构**
- 融资金额、融资类型
- 发票金额（自动计算 LTV）
- 对手方名称和类型
- 账期

**文档上下文**
- 粘贴财务报表、公司简介等文档内容
- 提供更多背景信息以提高评估准确性

### Step 3: 配置自定义智能体（可选）
1. 点击"新增智能体"
2. 输入名称（如"宏观经济专家"）
3. 编写角色设定（System Prompt）
4. 添加补充知识库（可选）
5. 启用智能体

### Step 4: 开始评估
1. 点击"开始评估"按钮
2. 系统将并行运行核心分析师和自定义智能体
3. 等待评估完成（通常 30-60 秒）

### Step 5: 查看结果
- **决策**: 批准 / 拒绝 / 有条件批准
- **评分**: 0-100 分
- **风险等级**: 低 / 中 / 高
- **红旗警示**: 触发的风险点
- **详细报告**: 完整的 Markdown 分析过程
- **建议措施**: 具体的改进建议

## 📊 评分标准

### 综合评分计算
```
总分 = Stage1 (商业实体) × 40% + Stage2 (交易质量) × 60%
```

### 风险等级判定
- **80-100 分**: 低风险 → 批准
- **60-79 分**: 中等风险 → 有条件批准
- **0-59 分**: 高风险 → 拒绝

### LTV 限制
- **保理业务**: 最高 90%
- **发票融资**: 最高 70%
- **贷款**: 根据具体情况评估

### 对手方评级
- **A 级（优质）**: 港府机构、MTR、大型地产商（信和、新鸿基、恒基等）
- **B 级（良好）**: 上市公司、知名企业
- **C 级（一般）**: 中小企业、非上市公司

## 🤖 可用 AI 模型

### 免费模型（无需 API Key）
| 模型名称 | 提供商 | 特点 |
|---------|--------|------|
| gpt-5-mini | OpenAI (通过 GenSpark) | 轻量级，快速响应，适合日常评估 |
| gpt-5-nano | OpenAI (通过 GenSpark) | 超轻量级，极速响应，适合快速评估 |

### 商业模型（需要 API Key）
| 模型名称 | 提供商 | 特点 | API Key 获取 |
|---------|--------|------|-------------|
| Sonar Pro | Perplexity | 快速评估，性能稳定 | [获取](https://www.perplexity.ai/settings/api) |
| Sonar Reasoning | Perplexity | 深度推理，适合复杂案例 | [获取](https://www.perplexity.ai/settings/api) |
| Gemini 2.0 Flash | Google | 最新模型，速度快，质量高 | [获取](https://makersuite.google.com/app/apikey) |
| DeepSeek R1 | DeepSeek | 推理模型，深度分析能力强 | [获取](https://platform.deepseek.com/api_keys) |

### 模型选择建议
- **新手用户**: 使用默认的 gpt-5-mini，无需配置
- **日常使用**: gpt-5-mini 或 gpt-5-nano，免费快速
- **复杂案例**: Sonar Reasoning 或 DeepSeek R1，深度分析
- **高质量要求**: Gemini 2.0 Flash，最新技术

## 🎨 系统特性

### 1. 持久化存储
- API Key 保存在浏览器 LocalStorage
- 刷新页面不会丢失配置
- 表单数据使用 Zustand 管理
- 核心分析师 Prompt 可自定义并保存

### 2. 响应式设计
- 支持桌面和移动设备
- 自适应布局
- 现代化 UI 设计

### 3. 实时反馈
- 评估进度显示
- 错误提示
- 处理时间统计

### 4. 专业报告
- Markdown 格式的详细分析
- 分阶段评分展示
- 红旗警示突出显示
- 具体建议措施

## 🛠️ 开发指南

### 项目结构
```
webapp/
├── app/
│   ├── components/          # React 组件
│   │   ├── SettingsModal.tsx       # 设置模态框
│   │   ├── InputWorkbench.tsx      # 资料录入工作台
│   │   ├── CustomAgentConfig.tsx   # 自定义智能体配置
│   │   ├── AssessmentEngine.tsx    # 评估引擎
│   │   └── ResultsDashboard.tsx    # 结果仪表盘
│   ├── store/               # 状态管理
│   │   └── useStore.ts             # Zustand store
│   ├── types/               # TypeScript 类型
│   │   └── index.ts
│   ├── utils/               # 工具函数
│   │   └── perplexity.ts           # Perplexity API 工具
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 主页面
├── ecosystem.config.cjs     # PM2 配置
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### 核心 Prompt 逻辑
核心分析师的评估逻辑硬编码在 `app/utils/perplexity.ts` 中的 `generateCoreAnalystPrompt()` 函数。

关键评估步骤：
1. 红旗检查 → 触发则直接拒绝
2. Stage 1 评分 → 商业实体评级
3. Stage 2 评分 → 交易质量评估
4. 综合评分 → 加权计算
5. 风险等级判定 → 最终决策
6. 生成 Markdown 报告 → 详细分析

### 自定义智能体
可通过 UI 配置任意数量的自定义智能体，例如：
- 宏观经济分析师
- 行业专家
- 法律顾问
- 财务审计师

## 📝 URLs

- **本地开发**: http://localhost:3000
- **公共访问**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- **Perplexity API**: https://www.perplexity.ai/settings/api

## 🔒 安全性

- API Key 仅保存在浏览器本地，不会上传到服务器
- 所有 API 请求直接从浏览器发起到 Perplexity
- 不存储任何敏感的借款方信息
- 建议使用 HTTPS 访问

## 📄 许可证

本项目仅供学习和研究使用。

## 🤝 支持

如有问题或建议，请联系开发团队。

---

**Riverchain 智能投资决策系统** © 2024 | 基于 [Perplexity AI](https://www.perplexity.ai) 提供技术支持
