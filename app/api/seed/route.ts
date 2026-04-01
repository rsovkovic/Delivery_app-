import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/db/connectMongoDB';
import { Shop } from '@/models/shop';
import { shopsData } from '@/lib/placeholder_data';

interface SeedResponse {
  success: boolean;
  message: string;
}

interface ErrorResponse {
  success: boolean;
  error: string;
}

export async function GET() {
  try {
    await connectMongoDB();

    await Shop.deleteMany({});

    await Shop.insertMany(shopsData);

    const responseData: SeedResponse = {
      success: true,
      message: `${shopsData.length} shops seeded successfully!`,
    };

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Seed error:', errorMessage);
    const errorData: ErrorResponse = {
      success: false,
      error: errorMessage,
    };
    return NextResponse.json(errorData, { status: 500 });
  }
}
