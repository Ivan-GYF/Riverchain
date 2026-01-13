# Riverchain 系统版本历史

## v2.1 (2024-01-13) - OpenAI 模型集成

### 🎯 核心更新
将 Genspark 免费模型替换为 OpenAI 底层模型，使用原始模型名称，保持免费使用特性。

### ✨ 新增功能
1. **OpenAI 模型集成**
   - 集成 `gpt-5-mini` - 轻量级免费模型
   - 集成 `gpt-5-nano` - 超轻量级免费模型
   - 通过 GenSpark OpenAI 兼容 API 调用
   - 保持免费使用，无需额外配置

2. **内部 API 代理**
   - 创建 `/api/openai-proxy` 路由
   - 自动处理 API 认证
   - 标准化 API 响应格式

3. **环境变量管理**
   - 自动继承 GenSpark OpenAI 配置
   - PM2 环境变量传递配置
   - 支持 `.genspark_llm.yaml` 配置文件

### 🔧 技术改进
- 统一 AI 调用接口
- 优化错误处理机制
- 改进 API 响应格式
- 完善文档说明

### 📝 新增文档
- `OPENAI_INTEGRATION.md` - OpenAI 模型集成详细说明
- `VERSION_HISTORY.md` - 版本历史记录

### 🔄 更新文件
- `app/utils/ai.ts` - 更新模型配置和调用逻辑
- `app/api/openai-proxy/route.ts` - OpenAI API 代理路由
- `app/store/useStore.ts` - 默认模型更新为 gpt-5-mini
- `ecosystem.config.cjs` - 添加 OpenAI 环境变量配置
- `README.md` - 更新模型说明和使用指南

---

## v2.0 (2024-01-13) - 多模型支持与核心 Prompt 编辑

### 🎯 核心更新
大幅提升系统灵活性和可定制性，支持多种 AI 模型和自定义评估标准。

### ✨ 新增功能
1. **核心分析师 Prompt 可编辑**
   - 在设置页面自定义核心分析师的评估标准
   - 支持修改红旗条件、Stage 1/Stage 2 权重
   - 可自定义 LTV 上限、评估维度、评分标准
   - 提供重置为默认值功能
   - 实时保存到 LocalStorage

2. **多 AI 模型支持**
   - 新增 Gemini 2.0 Flash (Google)
   - 新增 DeepSeek R1 (DeepSeek)
   - 新增 Genspark Pro (免费，后续替换为 OpenAI)
   - 新增 Genspark Lite (免费，后续替换为 OpenAI)
   - 保留 Perplexity Sonar Pro/Reasoning

3. **自定义智能体模型选择**
   - 每个自定义智能体可独立选择 AI 模型
   - 支持混合使用不同模型
   - 灵活的评估组合策略

4. **免费模型支持**
   - Genspark Pro/Lite 无需 API Key
   - 新用户开箱即用
   - 降低使用门槛

### 🎨 UI 改进
1. **设置页面重构**
   - 双标签页设计：模型/API 配置 + 核心分析师 Prompt
   - 实时显示模型特性和要求
   - 清晰的免费/付费模型区分

2. **智能体配置优化**
   - 每个智能体独立的模型选择器
   - 更直观的配置界面
   - 改进的表单验证

### 📚 文档完善
- `UPGRADE_NOTES.md` - v2.0 升级指南
- `FEATURES_v2.md` - v2.0 详细功能说明
- `README.md` - 更新功能说明和使用指南
- `QUICK_START.md` - 快速开始指南
- `PROJECT_SUMMARY.md` - 项目总结

### 🔧 技术改进
- 创建统一的 AI 调用接口 (`app/utils/ai.ts`)
- 支持多 Provider (Perplexity, Google, DeepSeek, Genspark)
- 改进错误处理和用户反馈
- 优化状态管理

---

## v1.0 (2024-01-12) - 初始发布

### 🎯 核心功能
1. **双阶段评估框架**
   - Stage 1: 商业实体评级 (40% 权重)
   - Stage 2: 交易评分 (60% 权重)
   - 红旗警示系统
   - LTV 合规检查

2. **多智能体评估**
   - Riverchain 核心分析师
   - 可配置的自定义专家智能体
   - 并行评估执行

3. **用户界面**
   - 三标签页资料录入（借款方信息、交易结构、文档上下文）
   - 系统设置（Perplexity API Key 配置）
   - 结果可视化仪表盘
   - Markdown 报告渲染

4. **AI 集成**
   - Perplexity API 集成
   - 支持 Sonar Pro 和 Sonar Reasoning 模型
   - 智能提示词工程

### 🚀 技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- react-markdown
- lucide-react

### 📝 文档
- `README.md` - 项目说明
- `QUICK_START.md` - 快速开始
- `PROJECT_SUMMARY.md` - 项目总结

---

## 版本规划

### v2.2 (计划中)
- [ ] 评估历史记录功能
- [ ] 导出 PDF 报告
- [ ] 更多智能体模板
- [ ] 批量评估功能

### v2.3 (计划中)
- [ ] 用户认证系统
- [ ] 多租户支持
- [ ] 数据分析仪表盘
- [ ] API 接口开放

---

## 技术债务

### 当前已知问题
- [ ] OpenAI API 错误处理需要进一步优化
- [ ] 移动端界面需要更多测试
- [ ] 评估速度可以进一步优化

### 改进计划
- [ ] 添加单元测试
- [ ] 添加集成测试
- [ ] 性能监控和优化
- [ ] 安全审计

---

## 贡献者

- **开发**: AI Assistant (Claude)
- **架构设计**: Based on Riverchain 风控方法论
- **产品需求**: User Requirements

---

## 许可证

本项目使用 MIT 许可证。

---

## 支持

如有问题或建议，请通过以下方式联系：
- 创建 GitHub Issue
- 发送邮件至项目维护者
- 查看项目文档

---

**最后更新**: 2024-01-13
**当前版本**: v2.1
**状态**: ✅ 稳定运行
