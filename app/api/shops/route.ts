import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/db/connectMongoDB'; // Переконайтеся, що шлях правильний
import { Shop } from '@/models/shop';

export async function GET() {
  try {
    // 1. Підключаємося до БД
    await connectMongoDB();

    // 2. Отримуємо всі магазини з бази
    // .find({}) означає "знайди все без фільтрів"
    const shops = await Shop.find({});

    // 3. Повертаємо результат у форматі JSON
    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error('Помилка при отриманні магазинів:', error);
    return NextResponse.json(
      { error: 'Не вдалося завантажити список магазинів' },
      { status: 500 },
    );
  }
}
