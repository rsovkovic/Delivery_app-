import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/db/connectMongoDB'; // Шлях до вашого файлу з типізованим підключенням

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json(
      { message: "✅ З'єднання з MongoDB встановлено успішно!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: '❌ Помилка підключення',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
