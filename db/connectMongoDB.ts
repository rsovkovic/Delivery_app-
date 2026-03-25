import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local',
  );
}

/**
 * Глобальне кешування для запобігання перевантаженню з'єднань
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectMongoDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Зберігаємо проміс підключення
    cached.promise = mongoose
      .connect(MONGO_URL, opts)
      .then((mongooseInstance) => {
        console.log('✅ Connected to MongoDB');
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
