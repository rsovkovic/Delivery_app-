import { Mongoose } from 'mongoose';

declare global {
  // Дозволяємо глобальному об'єкту мати поле mongoose
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}
