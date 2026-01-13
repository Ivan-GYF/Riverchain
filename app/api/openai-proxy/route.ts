import { NextRequest, NextResponse } from 'next/server';

// OpenAI API 配置（从环境变量获取）
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, temperature, max_tokens } = body;

    // 验证 API Key
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API Key 未配置' },
        { status: 500 }
      );
    }

    // 调用 OpenAI API
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model, // 使用底层模型原名：gpt-5-mini 或 gpt-5-nano
        messages,
        temperature: temperature || 0.2,
        max_tokens: max_tokens || 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API 错误:', errorText);
      return NextResponse.json(
        { error: `API 请求失败: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('OpenAI API 路由错误:', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  }
}
