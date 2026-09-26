import { Item } from '@/types/Quote';

export function calculateSubtotal(items: Item[]) {
  return items.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);
}

export function calculateDiscount(
  subtotal: number,
  discountPct?: number
) {
  return subtotal * ((discountPct ?? 0) / 100);
}

export function calculateTotal(
  items: Item[],
  discountPct?: number
) {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal, discountPct);

  return subtotal - discount;
}