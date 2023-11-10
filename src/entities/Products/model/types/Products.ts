export type Product = {
  id: string;
  price: number;
  name: string;
  picture: string;
  content?: string;
}

export type Products = Product[];

export interface ProductsSchema {
    data?: Products;
    isLoading: boolean;
    isUpdating: boolean;
}
