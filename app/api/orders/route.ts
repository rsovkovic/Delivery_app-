import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/db/connectMongoDB';
import { Order } from '@/models/order';
interface OrderFilter {
  'customer.email'?: string;
  'customer.phone'?: string;
}

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    const filter: OrderFilter = {};
    if (email) filter['customer.email'] = email;
    if (phone) filter['customer.phone'] = phone;

    if (!email && !phone) {
      return NextResponse.json([], { status: 200 });
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Fetch Orders Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

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
