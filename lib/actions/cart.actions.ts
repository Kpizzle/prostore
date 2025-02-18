'use server';

import { CartItem } from '@/types';

export async function addItemToCart(data: CartItem) {
  return {
    sucess: true,
    message: 'Item added to cart',
  };
}
