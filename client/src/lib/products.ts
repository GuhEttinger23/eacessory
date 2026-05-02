import type { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: 'Brinco Gota de Cristal',
    price: 79.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-brinco-1-732YFzp9Q3XFKr7YeUjV39.webp',
    category: 'Brincos',
    badge: 'Mais Vendido',
  },
  {
    id: 2,
    name: 'Colar Coração Rosé',
    price: 59.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-colar-1-3ZGJPLKndRFUTXqfAJw7V4.webp',
    category: 'Colares',
  },
  {
    id: 3,
    name: 'Anel Floral com Cristais',
    price: 49.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-anel-1-8gBRHRQfNfXnfYXk4aTeSZ.webp',
    category: 'Anéis',
    badge: 'Novo',
  },
  {
    id: 4,
    name: 'Pulseira Pérola & Cristal',
    price: 69.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-pulseira-1-WhZXf3HKoXYZDcmydGojAG.webp',
    category: 'Pulseiras',
  },
  {
    id: 5,
    name: 'Conjunto Infinito Pérola',
    price: 129.90,
    originalPrice: 159.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-conjunto-1-cjkieC3EivZDJjpkwWrZTj.webp',
    category: 'Conjuntos',
    badge: 'Promoção',
  },
  {
    id: 6,
    name: 'Tiara Floral Noiva',
    price: 89.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-tiara-1-G3mfHQGgtJ2BuGdWu9dXda.webp',
    category: 'Tiaras',
    badge: 'Exclusivo',
  },
  {
    id: 7,
    name: 'Brinco Nó de Pérola',
    price: 44.90,
    originalPrice: 59.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-brinco-2-iVyA7Zwd7eDShVjcWB7BLx.webp',
    category: 'Brincos',
    badge: 'Promoção',
  },
  {
    id: 8,
    name: 'Colar Lua & Estrelas',
    price: 74.90,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-colar-2-HpCVtQECRUs6FXMsFRxjux.webp',
    category: 'Colares',
    badge: 'Mais Vendido',
  },
];

export const bestSellers = products.filter(p => p.badge === 'Mais Vendido' || p.id <= 4);
export const promotions = products.filter(p => p.originalPrice);
export const categories = ['Todos', 'Brincos', 'Colares', 'Anéis', 'Pulseiras', 'Conjuntos', 'Tiaras'];
