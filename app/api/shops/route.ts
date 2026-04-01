import { connectMongoDB } from '@/db/connectMongoDB'; // Переконайтеся, що шлях правильний
import { Shop } from '@/models/shop';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get('shopId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '3');
    const skip = (page - 1) * limit;

    // const shops = await Shop.find({});
    if (!shopId) {
      const shops = await Shop.find({});
      return NextResponse.json(shops, { status: 200 });
    }

    const shop = await Shop.findById(shopId, {
      products: { $slice: [skip, limit] },
      name: 1,
      address: 1,
      rating: 1,
    });

    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    const fullShop = await Shop.findById(shopId);
    const totalProducts = fullShop?.products.length || 0;
    const hasMore = skip + limit < totalProducts;

    //   return NextResponse.json(shops, { status: 200 });
    // }
    return NextResponse.json(
      {
        products: shop.products,
        hasMore,
        totalProducts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error getting data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
