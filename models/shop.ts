import { Product } from '@/types/shop';
import { Shop as ShopType } from '@/types/shop';
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const ShopSchema = new Schema<ShopType>({
  name: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 0 },
  products: [ProductSchema],
});

export const Shop = models.Shop || model<ShopType>('Shop', ShopSchema);
