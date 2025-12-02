import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    console.log('收到消息:', message);

    // 从环境变量读取 API Key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    // 按照您提供的方法创建客户端
    const ai = new GoogleGenAI({});

    console.log('开始调用 AI...');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    console.log('AI 响应成功');
    const text = response.text || '';

    // 检查是否有有效的回复文本
    if (!text) {
      throw new Error('AI 没有返回有效的回复内容');
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // 将文本按字符分割，模拟打字机效果
        const chars = text.split('');
        let index = 0;

        const sendNextChar = () => {
          if (index < chars.length) {
            const char = chars[index];
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ char, done: false })}\n\n`));
            index++;
            // 调整延迟时间，可以根据需要修改（毫秒）
            setTimeout(sendNextChar, 30);
          } else {
            // 发送完成信号
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ char: '', done: true })}\n\n`));
            controller.close();
          }
        };

        sendNextChar();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('AI API Error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process request',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}