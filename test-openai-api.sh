#!/bin/bash

# Riverchain OpenAI API 测试脚本
# 用于验证 OpenAI API 集成是否正常工作

echo "=================================="
echo "Riverchain OpenAI API 测试"
echo "=================================="
echo ""

# 1. 检查环境变量
echo "📋 步骤 1: 检查环境变量"
echo "-----------------------------------"
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ OPENAI_API_KEY 未设置"
    exit 1
else
    echo "✅ OPENAI_API_KEY: ${OPENAI_API_KEY:0:20}..."
fi

if [ -z "$OPENAI_BASE_URL" ]; then
    echo "❌ OPENAI_BASE_URL 未设置"
    exit 1
else
    echo "✅ OPENAI_BASE_URL: $OPENAI_BASE_URL"
fi
echo ""

# 2. 检查配置文件
echo "📋 步骤 2: 检查 GenSpark 配置文件"
echo "-----------------------------------"
if [ -f ~/.genspark_llm.yaml ]; then
    echo "✅ ~/.genspark_llm.yaml 存在"
    echo "内容预览:"
    head -3 ~/.genspark_llm.yaml
else
    echo "⚠️ ~/.genspark_llm.yaml 不存在"
fi
echo ""

# 3. 检查应用状态
echo "📋 步骤 3: 检查应用状态"
echo "-----------------------------------"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ 应用运行正常 (http://localhost:3000)"
else
    echo "❌ 应用未运行"
    echo "尝试启动应用..."
    cd /home/user/webapp && pm2 start ecosystem.config.cjs
fi
echo ""

# 4. 测试 OpenAI API 端点
echo "📋 步骤 4: 测试 OpenAI API 端点"
echo "-----------------------------------"
echo "发送测试请求到 /api/openai-proxy..."

response=$(curl -s -X POST http://localhost:3000/api/openai-proxy \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-mini",
    "messages": [
      {"role": "system", "content": "你是一个测试助手"},
      {"role": "user", "content": "请回复：测试成功"}
    ],
    "temperature": 0.2,
    "max_tokens": 50
  }')

if echo "$response" | grep -q "error"; then
    echo "❌ API 调用失败"
    echo "错误响应:"
    echo "$response" | jq .
    exit 1
elif echo "$response" | grep -q "choices"; then
    echo "✅ API 调用成功"
    echo "响应内容:"
    echo "$response" | jq -r '.choices[0].message.content' 2>/dev/null || echo "$response"
else
    echo "⚠️ 响应格式异常"
    echo "$response"
fi
echo ""

# 5. 检查 PM2 日志
echo "📋 步骤 5: 检查 PM2 日志（最近 5 行）"
echo "-----------------------------------"
pm2 logs riverchain-webapp --nostream --lines 5 2>&1 | tail -10
echo ""

# 6. 总结
echo "=================================="
echo "✅ 测试完成"
echo "=================================="
echo ""
echo "如果所有检查都通过，OpenAI API 集成正常工作。"
echo "如果有错误，请查看上述输出信息进行排查。"
echo ""
echo "常见问题排查:"
echo "1. 如果 API Key 未设置，请重启沙箱或重新注入配置"
echo "2. 如果应用未运行，执行: pm2 start ecosystem.config.cjs"
echo "3. 如果 API 调用失败，检查 PM2 日志: pm2 logs riverchain-webapp"
echo ""
