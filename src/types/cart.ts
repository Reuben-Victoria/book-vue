import { BookType, BookWithQuantityType } from "./books";
export interface CartItemProps {
  name: string;
  publisher: string;
  quantity: number;
  price: number;
  id: number;
}



export interface CartStoreType {
  cartData: BookWithQuantityType[];
  // setCartData: React.Dispatch<React.SetStateAction<BookWithQuantityType[]>>;
  removeFromCartData: (id: number) => void;
  addToCart: (item: BookType) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
}
