import { NextRequest, NextResponse } from 'next/server';

// Genspark 内置免费模型的 API 端点
// 这里使用 OpenAI 兼容的端点作为示例
const GENSPARK_API_ENDPOINT = process.env.GENSPARK_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const GENSPARK_API_KEY = process.env.GENSPARK_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, temperature, max_tokens } = body;

    // 映射模型名称
    let actualModel = 'gpt-3.5-turbo'; // 默认模型
    if (model === 'genspark-free-1') {
      actualModel = 'gpt-3.5-turbo'; // Genspark Pro 映射
    } else if (model === 'genspark-free-2') {
      actualModel = 'gpt-3.5-turbo-16k'; // Genspark Lite 映射
    }

    // 调用 Genspark API (或任何兼容的 OpenAI API)
    const response = await fetch(GENSPARK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GENSPARK_API_KEY}`,
      },
      body: JSON.stringify({
        model: actualModel,
        messages,
        temperature: temperature || 0.2,
        max_tokens: max_tokens || 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Genspark API 错误:', errorText);
      return NextResponse.json(
        { error: `API 请求失败: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Genspark API 路由错误:', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  }
}
