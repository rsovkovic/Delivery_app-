import { Schema, model, models, Document } from 'mongoose';

// 1. Описуємо інтерфейс для товару
interface Product {
  name: string;
  price: number;
  image: string;
}

// 2. Описуємо інтерфейс для магазину
export interface Shop extends Document {
  name: string;
  address: string;
  products: Product[];
}

// 3. Створюємо схему для Mongoose
const ProductSchema = new Schema<Product>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const ShopSchema = new Schema<Shop>({
  name: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true },
  products: [ProductSchema], // Масив товарів
});

// 4. Експортуємо модель (з перевіркою, чи вона вже не створена)
export const Shop = models.Shop || model<Shop>('Shop', ShopSchema);
