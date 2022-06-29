export interface Product {
  id?: string;
  name?: string;
  description?: string;
  size?: string; //checkbox
  color?: string; //radio
  type?: string; //select
  quantity?: number; //number
  picture?: string;
  createdAt?: number;
}
