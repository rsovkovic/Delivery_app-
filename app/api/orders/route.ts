import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/db/connectMongoDB'; // Ваша функція підключення
import { Order } from '@/models/order'; // Модель замовлення Mongoose

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log('Отримані дані на сервері:', body);
    await connectMongoDB();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Створюємо новий запис у базі
    const newOrder = await Order.create({
      customer: body.customer,
      items: body.items,
      totalPrice: body.totalPrice,
      status: 'Pending',
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Order created!', id: newOrder._id },
      { status: 201 },
    );
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 },
    );
  }
}
