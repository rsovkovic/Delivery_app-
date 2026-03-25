export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Shop {
  _id: string;
  name: string;
  address: string;
  rating: number;
  products: Product[];
}
