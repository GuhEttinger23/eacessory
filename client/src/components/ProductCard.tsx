/*
 * Eacessory — ProductCard
 * Design: Jardim Encantado Feminino
 * Hover cinematográfico com overlay e botão de compra
 */
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho! 💕`, {
      duration: 2500,
    });
  };

  const badgeColors: Record<string, { bg: string; text: string }> = {
    'Mais Vendido': { bg: '#CFA5A0', text: 'white' },
    'Novo': { bg: '#E6C7B2', text: '#7A5C58' },
    'Promoção': { bg: '#d4856a', text: 'white' },
    'Exclusivo': { bg: '#7A5C58', text: 'white' },
  };

  const badge = product.badge ? badgeColors[product.badge] : null;

  return (
    <div
      className="product-card fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-cover"
        />

        {/* Badge */}
        {product.badge && badge && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full z-10"
            style={{ background: badge.bg, color: badge.text, fontFamily: 'Nunito, sans-serif' }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-200"
          style={{
            background: liked ? '#CFA5A0' : 'rgba(255,255,255,0.85)',
            color: liked ? 'white' : '#CFA5A0',
            backdropFilter: 'blur(4px)',
          }}
          aria-label="Favoritar"
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 transition-all duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(207, 165, 160, 0.6) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: 'white',
              color: '#CFA5A0',
              fontFamily: 'Nunito, sans-serif',
              transform: hovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              boxShadow: '0 4px 15px rgba(207, 165, 160, 0.3)',
            }}
          >
            <ShoppingBag size={14} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs mb-1" style={{ color: '#A08480', fontFamily: 'Nunito, sans-serif' }}>
          {product.category}
        </p>
        <h3
          className="font-semibold leading-tight mb-2"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            color: '#7A5C58',
            fontSize: '1.05rem',
          }}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: '#CFA5A0', fontSize: '1.1rem' }}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: '#C0A0A0' }}>
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(207, 165, 160, 0.12)', color: '#CFA5A0' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#CFA5A0';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(207, 165, 160, 0.12)';
              e.currentTarget.style.color = '#CFA5A0';
            }}
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
