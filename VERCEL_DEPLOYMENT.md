# Vercel 部署指南

## 🎉 问题已解决！

### ✅ 修复内容

**问题**: TypeScript 类型错误
```
Type error: Argument of type '"genspark-free-1"' is not assignable to parameter of type 'AIModel'
```

**原因**: SettingsModal 组件中使用了已废弃的模型名称 `'genspark-free-1'`

**修复**: 已更新为正确的模型名称 `'gpt-5-mini'`

**提交**: `7f498fb` - fix: 修复 Vercel 构建错误

---

## 🚀 Vercel 部署步骤

### 1. 访问 Vercel
https://vercel.com

### 2. 登录
使用 GitHub 账号登录

### 3. 导入项目
- 点击 "New Project"
- 选择 "Import Git Repository"
- 找到并选择：`Ivan-GYF/Riverchain`
- 点击 "Import"

### 4. 配置项目

#### Framework Preset
✅ 自动检测：**Next.js**

#### Root Directory
✅ 保持默认：`./`

#### Build Command
✅ 自动检测：`npm run build`

#### Output Directory
✅ 自动检测：`.next`

#### Install Command
✅ 自动检测：`npm install`

### 5. 添加环境变量

**重要**: 必须添加以下环境变量

```bash
OPENAI_API_KEY=gsk-eyJjb2dlbl9pZCI6ICJiYWQ3Zjc2Yy0yMmMzLTQxN2EtYmIyZS0wNTJhODA4MDY1OGQiLCAia2V5X2lkIjogImNlZWVkMzllLWRlNjktNDc1NS05NWZiLTQyMzM3YTdhMzA1NCJ9fLw7jQeOh_TTXEHzSxQgoPrdn0Dy3FZKse2G43B42mnT

OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
```

**如何添加**:
1. 在项目配置页面找到 "Environment Variables" 部分
2. 点击 "Add" 或 "New"
3. 输入变量名和值
4. 选择环境：Production, Preview, Development（推荐全选）
5. 点击 "Add" 确认

### 6. 开始部署

- 点击 "Deploy" 按钮
- 等待 2-3 分钟

### 7. 部署完成！

您将看到：
- ✅ **Production URL**: `https://riverchain.vercel.app` 或 `https://your-project-name.vercel.app`
- ✅ **Deployment Status**: Ready
- ✅ **Build Logs**: 可查看详细日志

---

## 🔧 部署后配置

### 自动部署

✅ 已自动配置！

每次您推送代码到 GitHub main 分支时：
1. Vercel 自动检测更新
2. 自动构建新版本
3. 自动部署到生产环境
4. 零停机时间

### 预览部署

每次创建 Pull Request 时：
1. Vercel 自动创建预览部署
2. 获得独立的预览 URL
3. 可以在合并前测试

### 自定义域名（可选）

1. 在 Vercel 项目设置中找到 "Domains"
2. 点击 "Add Domain"
3. 输入您的域名（如 `riverchain.com`）
4. 按照提示配置 DNS 记录
5. ✅ 完成！

---

## 📊 监控和日志

### 实时日志

1. 访问 Vercel 项目仪表盘
2. 点击 "Deployments"
3. 选择任意部署
4. 查看 "Build Logs" 和 "Function Logs"

### 性能分析

1. 访问 "Analytics" 标签
2. 查看：
   - 页面访问量
   - 响应时间
   - 错误率
   - 地理分布

### 错误监控

如果遇到错误：
1. 查看 "Function Logs"
2. 检查环境变量是否正确
3. 确认 API Key 有效

---

## 🔐 安全配置

### 环境变量保护

✅ 已自动保护！

- 环境变量仅在服务器端可用
- 不会暴露到客户端
- 不会出现在构建日志中

### HTTPS

✅ 自动配置！

- 所有流量自动使用 HTTPS
- 免费 SSL 证书
- 自动续期

---

## 🚨 常见问题

### 1. 构建失败

**问题**: Build error or type error

**解决**:
- 确保代码已推送到 GitHub
- 检查 `package.json` 依赖
- 查看构建日志中的错误信息

### 2. API 调用失败

**问题**: OpenAI API 返回 401 或 403

**解决**:
- 检查环境变量 `OPENAI_API_KEY` 是否正确
- 确认 API Key 有效
- 重新部署项目

### 3. 页面 404

**问题**: 访问页面返回 404

**解决**:
- 确认部署成功
- 检查 URL 是否正确
- 清除浏览器缓存

### 4. 环境变量不生效

**问题**: 环境变量似乎没有加载

**解决**:
1. 确认环境变量已添加
2. 重新部署项目（Vercel 需要重新部署才能应用新的环境变量）
3. 检查变量名是否正确

---

## 📱 访问应用

### Production URL

部署完成后，您的应用将在以下地址可用：

```
https://riverchain.vercel.app
或
https://your-project-name.vercel.app
```

### 测试功能

1. 打开应用 URL
2. 应该看到 Riverchain 主页
3. 点击右上角 "设置" 按钮
4. 选择 AI 模型（默认：gpt-5-mini，免费）
5. 填写借款方信息
6. 点击 "开始评估"
7. ✅ 查看评估结果！

---

## 🎯 下一步

### 优化性能

Vercel 提供多种优化选项：
- Edge Functions：边缘计算
- Image Optimization：图片优化
- Incremental Static Regeneration：增量静态生成

### 添加分析

集成第三方分析工具：
- Google Analytics
- Mixpanel
- Amplitude

### 设置告警

配置部署和性能告警：
1. 访问项目设置
2. 找到 "Notifications"
3. 配置 Email 或 Slack 通知

---

## 📚 相关资源

- **Vercel 文档**: https://vercel.com/docs
- **Next.js 文档**: https://nextjs.org/docs
- **GitHub 仓库**: https://github.com/Ivan-GYF/Riverchain
- **支持中心**: https://vercel.com/support

---

## ✅ 部署检查清单

部署成功后，确认以下项目：

- [ ] 应用可以访问
- [ ] 主页正确加载
- [ ] 设置页面可以打开
- [ ] 可以选择 AI 模型
- [ ] 表单可以提交
- [ ] 评估功能正常
- [ ] API 调用成功
- [ ] 结果正确显示

如果所有项目都✅，恭喜！您的 Riverchain 系统已成功部署！🎉

---

## 🆘 需要帮助？

如果遇到问题：

1. **检查构建日志**: Vercel 提供详细的错误信息
2. **查看文档**: 参考上述解决方案
3. **GitHub Issues**: 在仓库中创建 Issue
4. **Vercel 支持**: 联系 Vercel 支持团队

---

**最后更新**: 2024-01-14  
**项目版本**: v2.1  
**修复提交**: 7f498fb  
**状态**: ✅ 准备部署
