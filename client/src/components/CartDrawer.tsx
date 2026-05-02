/*
 * Eacessory — CartDrawer
 * Design: Jardim Encantado Feminino
 * Drawer lateral elegante com glassmorphism suave
 */
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('Pedido realizado com sucesso! Em breve entraremos em contato. 💕', {
      duration: 4000,
    });
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'rgba(207, 165, 160, 0.2)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} style={{ color: '#CFA5A0' }} />
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5C58' }}
            >
              Meu Carrinho
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#7A5C58' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(207, 165, 160, 0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(207, 165, 160, 0.1)' }}
              >
                <ShoppingBag size={28} style={{ color: '#CFA5A0' }} />
              </div>
              <p
                className="text-lg"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5C58' }}
              >
                Seu carrinho está vazio
              </p>
              <p className="text-sm" style={{ color: '#A08480' }}>
                Adicione peças da nossa coleção e realce sua beleza ✨
              </p>
              <button onClick={closeCart} className="btn-outline mt-2">
                Ver Coleção
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl"
                  style={{ background: 'rgba(250, 247, 245, 0.8)' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm leading-tight mb-1"
                      style={{ color: '#7A5C58', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs mb-3" style={{ color: '#A08480' }}>
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 rounded-full px-2 py-1"
                        style={{ background: 'rgba(207, 165, 160, 0.1)' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors"
                          style={{ color: '#CFA5A0' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center" style={{ color: '#7A5C58' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors"
                          style={{ color: '#CFA5A0' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-sm" style={{ color: '#CFA5A0' }}>
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1 rounded transition-colors"
                    style={{ color: '#C0A0A0' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e57373')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#C0A0A0')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="p-6 border-t"
            style={{ borderColor: 'rgba(207, 165, 160, 0.2)' }}
          >
            {/* Ornament */}
            <div className="divider-ornament mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.5 6H15L10.5 9.5L12 14.5L8 11L4 14.5L5.5 9.5L1 6H6.5L8 1Z" fill="#CFA5A0" />
              </svg>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm" style={{ color: '#A08480' }}>Subtotal</span>
              <span className="font-semibold" style={{ color: '#7A5C58' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm" style={{ color: '#A08480' }}>Frete</span>
              <span className="text-sm font-medium" style={{ color: '#4CAF50' }}>
                {total >= 150 ? 'Grátis 🎉' : 'A calcular'}
              </span>
            </div>
            {total < 150 && (
              <p className="text-xs text-center mb-4" style={{ color: '#A08480' }}>
                Faltam R$ {(150 - total).toFixed(2).replace('.', ',')} para frete grátis
              </p>
            )}
            <button
              onClick={handleCheckout}
              className="btn-primary w-full text-center"
              style={{ display: 'block' }}
            >
              Finalizar Compra
            </button>
            <button
              onClick={closeCart}
              className="btn-outline w-full text-center mt-3"
              style={{ display: 'block' }}
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
