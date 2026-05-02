/*
 * Eacessory — Navbar
 * Design: Jardim Encantado Feminino
 * Tipografia: Great Vibes para marca, Nunito para nav
 */
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Coleção', href: '#colecao' },
    { label: 'Mais Vendidos', href: '#mais-vendidos' },
    { label: 'Promoções', href: '#promocoes' },
    { label: 'Contato', href: '#contato' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(250, 247, 245, 0.95)'
            : 'rgba(250, 247, 245, 0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 2px 30px rgba(122, 92, 88, 0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(207, 165, 160, 0.2)' : 'none',
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-3 group"
            >
              <img
                src="/manus-storage/eacessory-logo_dfd21380.jpeg"
                alt="Eacessory"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm"
              />
              <span
                className="brand-script text-3xl md:text-4xl leading-none"
                style={{ color: '#CFA5A0' }}
              >
                Eacessory
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: '#7A5C58',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#CFA5A0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#7A5C58')}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
                style={{ color: '#7A5C58' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#CFA5A0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A5C58')}
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>

              <button
                onClick={openCart}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                style={{ color: '#7A5C58' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#CFA5A0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A5C58')}
                aria-label="Carrinho"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ background: '#CFA5A0' }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9"
                style={{ color: '#7A5C58' }}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(122, 92, 88, 0.3)' }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute top-0 right-0 h-full w-72 flex flex-col pt-20 pb-8 px-8 gap-2"
          style={{
            background: '#FAF7F5',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="mb-4">
            <span className="brand-script text-3xl" style={{ color: '#CFA5A0' }}>
              Eacessory
            </span>
          </div>
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left py-3 text-base font-medium border-b"
              style={{
                color: '#7A5C58',
                borderColor: 'rgba(207, 165, 160, 0.2)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-6">
            <button
              onClick={() => { openCart(); setMobileOpen(false); }}
              className="btn-primary w-full text-center"
            >
              Ver Carrinho {itemCount > 0 && `(${itemCount})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
