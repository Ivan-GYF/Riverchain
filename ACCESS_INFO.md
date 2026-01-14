# 🚀 Riverchain 访问信息

## 📱 快速访问

### 主要访问地址
```
https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
```

**直接点击上方链接即可访问应用！**

---

## 📋 完整信息

### 应用信息
- **名称**: Riverchain 智能投资决策系统
- **版本**: v2.1
- **状态**: ✅ 在线运行

### 访问地址
- **公开地址**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
- **本地地址**: http://localhost:3000 (仅沙盒内部)

### 环境信息
- **运行环境**: GenSpark Sandbox (Novita)
- **Sandbox ID**: ituehabhum05ormfvf7pa-c81df28e
- **端口**: 3000
- **进程管理**: PM2

---

## ✨ 主要功能

### 免费可用 (无需配置)
- ✅ **gpt-5-mini** - OpenAI 免费模型
- ✅ **gpt-5-nano** - OpenAI 免费模型
- ✅ 核心风险评估
- ✅ 双阶段评分系统
- ✅ 红旗警示系统
- ✅ Markdown 报告生成

### 高级功能 (需配置 API Key)
- 🔑 Perplexity Sonar Pro/Reasoning
- 🔑 Google Gemini 2.0 Flash
- 🔑 DeepSeek R1
- 🔑 自定义智能体配置
- 🔑 核心 Prompt 编辑

---

## 🎯 快速开始

### 3 步开始使用

1. **打开应用**
   ```
   https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai
   ```

2. **填写信息**
   - 借款方信息 (公司名称、行业等)
   - 交易结构 (金额、类型等)
   - 文档上下文 (可选)

3. **开始评估**
   - 点击 "开始评估" 按钮
   - 等待 AI 分析 (约 10-30 秒)
   - 查看评估结果

---

## 📊 系统特性

### 评估维度
- **Stage 1** (40%): 商业实体评级
  - 运营年限
  - 财务状况
  - 行业评估
  
- **Stage 2** (60%): 交易质量评分
  - LTV 比率
  - 对手方评级
  - 集中度风险

### 输出格式
- 综合评分 (0-100)
- 风险等级 (低/中/高)
- 红旗警示列表
- 详细评估报告 (Markdown)
- 具体改进建议

---

## 🔧 技术栈

- **前端**: Next.js 14 + React 18 + TypeScript
- **样式**: TailwindCSS 3.4
- **状态**: Zustand 4.5
- **AI**: OpenAI API (GenSpark 代理)
- **部署**: PM2 on GenSpark Sandbox

---

## 📚 文档链接

### 主要文档
- [README.md](README.md) - 项目概述
- [QUICK_START.md](QUICK_START.md) - 快速开始
- [FEATURES_v2.md](FEATURES_v2.md) - 功能详解

### 部署文档
- [SANDBOX_DEPLOYMENT.md](SANDBOX_DEPLOYMENT.md) - 沙盒部署指南
- [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) - 完成总结

### 技术文档
- [OPENAI_INTEGRATION.md](OPENAI_INTEGRATION.md) - OpenAI 集成
- [VERSION_HISTORY.md](VERSION_HISTORY.md) - 版本历史

---

## 🎉 立即体验

**访问地址**: https://3000-ituehabhum05ormfvf7pa-c81df28e.sandbox.novita.ai

**开箱即用**：无需配置，直接使用免费 OpenAI 模型！

---

## 📞 支持

### 遇到问题？

1. **查看日志**
   ```bash
   cd /home/user/webapp
   pm2 logs --nostream --lines 50
   ```

2. **重启应用**
   ```bash
   pm2 restart riverchain-webapp
   ```

3. **完整测试**
   ```bash
   ./test-openai-api.sh
   ```

### GitHub 仓库
- https://github.com/Ivan-GYF/Riverchain

---

**部署时间**: 2024-01-14  
**最后更新**: 2024-01-14  
**状态**: ✅ 正常运行
