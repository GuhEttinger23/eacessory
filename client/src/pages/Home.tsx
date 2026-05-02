/*
 * Eacessory — Home Page
 * Design: Jardim Encantado Feminino — Romantismo Contemporâneo
 * Seções: Hero, Sobre, Coleção, Mais Vendidos, Promoções, Contato, Footer
 * Tipografia: Cormorant Garamond + Great Vibes + Nunito
 * Paleta: Rosé Gold (#CFA5A0), Bege (#F5EDE8), Nude (#FAF7F5), Dourado (#E6C7B2), Marrom (#7A5C58)
 */
import { useEffect, useRef, useState } from 'react';
import { Instagram, MessageCircle, Mail, Phone, MapPin, ChevronDown, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import OrnamentDivider from '@/components/OrnamentDivider';
import { products, bestSellers, promotions, categories } from '@/lib/products';

// Scroll animation hook inline
function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    el.querySelectorAll('.fade-in-up').forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Sparkle floating component
function FloatingSparkles() {
  const sparkles = [
    { x: '10%', y: '20%', size: 14, delay: '0s' },
    { x: '85%', y: '15%', size: 10, delay: '0.7s' },
    { x: '70%', y: '70%', size: 12, delay: '1.4s' },
    { x: '20%', y: '75%', size: 8, delay: '0.3s' },
    { x: '50%', y: '10%', size: 10, delay: '1s' },
    { x: '92%', y: '50%', size: 8, delay: '1.8s' },
  ];
  return (
    <>
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{ left: s.x, top: s.y, animationDelay: s.delay }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9 6H15L10 9.5L12 16L8 12L4 16L6 9.5L1 6H7L8 0Z" fill="rgba(207,165,160,0.6)" />
          </svg>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sobreRef = useScrollAnim();
  const colecaoRef = useScrollAnim();
  const maisVendidosRef = useScrollAnim();
  const promocoesRef = useScrollAnim();
  const contatoRef = useScrollAnim();

  const [activeCategory, setActiveCategory] = useState('Todos');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    toast.success('Mensagem enviada com sucesso! Responderemos em breve. 💕', { duration: 4000 });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF7F5' }}>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/hero-banner-44DyNUkUHneLwbjfQJzTLr.webp"
            alt="Eacessory — Acessórios Femininos"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(250,247,245,0.75) 0%, rgba(245,237,232,0.55) 50%, rgba(207,165,160,0.35) 100%)',
            }}
          />
        </div>

        {/* Floating sparkles */}
        <FloatingSparkles />

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          style={{ paddingTop: '80px' }}
        >
          {/* Logo */}
          <div
            className="flex justify-center mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src="/manus-storage/eacessory-logo_dfd21380.jpeg"
              alt="Eacessory Logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-xl"
              style={{ border: '3px solid rgba(207, 165, 160, 0.4)' }}
            />
          </div>

          {/* Brand Name */}
          <h1
            className="brand-script mb-3"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              color: '#7A5C58',
              lineHeight: 1.1,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            Eacessory
          </h1>

          {/* Tagline */}
          <p
            className="mb-2"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.3rem, 3vw, 2rem)',
              color: '#7A5C58',
              fontWeight: 300,
              fontStyle: 'italic',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            Realce sua beleza com detalhes únicos
          </p>

          <OrnamentDivider className="my-4" />

          <p
            className="text-base md:text-lg mb-8 max-w-md mx-auto"
            style={{
              color: '#9A7A76',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 400,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.55s',
            }}
          >
            Acessórios femininos sofisticados que traduzem elegância, autoestima e exclusividade.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s',
            }}
          >
            <button
              onClick={() => scrollTo('colecao')}
              className="btn-primary"
            >
              Ver Coleção
            </button>
            <button
              onClick={() => scrollTo('mais-vendidos')}
              className="btn-outline"
            >
              Mais Vendidos
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('sobre')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-300"
          style={{
            color: '#CFA5A0',
            opacity: heroVisible ? 0.7 : 0,
            transition: 'opacity 0.8s ease 1.2s',
          }}
          aria-label="Rolar para baixo"
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Descobrir
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ═══════════════════════════════════════════
          SOBRE A MARCA
      ═══════════════════════════════════════════ */}
      <section
        id="sobre"
        ref={sobreRef}
        className="py-24 px-6"
        style={{ background: '#F5EDE8' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="fade-in-up">
              <span
                className="text-sm tracking-widest uppercase mb-3 block"
                style={{ color: '#CFA5A0', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
              >
                Nossa História
              </span>
              <h2
                className="mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#7A5C58',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Beleza que conta
                <br />
                <em>a sua história</em>
              </h2>
              <OrnamentDivider className="justify-start my-4" />
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif', fontWeight: 400 }}
              >
                A <strong style={{ color: '#CFA5A0' }}>Eacessory</strong> nasceu do amor por detalhes que transformam. Acreditamos que cada acessório carrega uma história — de elegância, autoestima e exclusividade.
              </p>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif', fontWeight: 400 }}
              >
                Nossas peças são cuidadosamente selecionadas para oferecer o luxo acessível que toda mulher merece. Do brinco delicado ao conjunto sofisticado, cada item é pensado para realçar a sua beleza única.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '500+', label: 'Clientes felizes' },
                  { num: '100+', label: 'Peças exclusivas' },
                  { num: '5★', label: 'Avaliação média' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#CFA5A0' }}
                    >
                      {stat.num}
                    </p>
                    <p className="text-xs" style={{ color: '#A08480', fontFamily: 'Nunito, sans-serif' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image collage */}
            <div className="fade-in-up relative" style={{ transitionDelay: '200ms' }}>
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-brinco-1-732YFzp9Q3XFKr7YeUjV39.webp"
                  alt="Brinco"
                  className="rounded-2xl w-full object-cover shadow-md"
                  style={{ aspectRatio: '3/4' }}
                />
                <div className="flex flex-col gap-3">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-anel-1-8gBRHRQfNfXnfYXk4aTeSZ.webp"
                    alt="Anel"
                    className="rounded-2xl w-full object-cover shadow-md"
                    style={{ aspectRatio: '1/1' }}
                  />
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663621873591/T9QrcGSYwqhddjw5nLER48/product-pulseira-1-WhZXf3HKoXYZDcmydGojAG.webp"
                    alt="Pulseira"
                    className="rounded-2xl w-full object-cover shadow-md"
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>
              </div>
              {/* Decorative badge */}
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg"
                style={{ background: '#CFA5A0' }}
              >
                <Sparkles size={16} color="white" />
                <span className="text-white text-xs font-bold mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Luxo
                </span>
                <span className="text-white text-xs" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Acessível
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COLEÇÃO COMPLETA
      ═══════════════════════════════════════════ */}
      <section id="colecao" ref={colecaoRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 fade-in-up">
            <span
              className="text-sm tracking-widest uppercase mb-3 block"
              style={{ color: '#CFA5A0', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              Nossa Coleção
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#7A5C58',
                fontWeight: 400,
              }}
            >
              Peças que encantam
            </h2>
            <OrnamentDivider className="my-4" />
            <p className="text-base max-w-md mx-auto" style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif' }}>
              Cada peça é escolhida com cuidado para traduzir elegância e delicadeza feminina.
            </p>
          </div>

          {/* Category Filter */}
          <div className="fade-in-up flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  background: activeCategory === cat ? '#CFA5A0' : 'rgba(207, 165, 160, 0.1)',
                  color: activeCategory === cat ? 'white' : '#7A5C58',
                  border: activeCategory === cat ? '1px solid #CFA5A0' : '1px solid rgba(207, 165, 160, 0.3)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAIS VENDIDOS
      ═══════════════════════════════════════════ */}
      <section
        id="mais-vendidos"
        ref={maisVendidosRef}
        className="py-24 px-6"
        style={{ background: '#F5EDE8' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <span
              className="text-sm tracking-widest uppercase mb-3 block"
              style={{ color: '#CFA5A0', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              ✨ Favoritas das Clientes
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#7A5C58',
                fontWeight: 400,
              }}
            >
              Mais Vendidos
            </h2>
            <OrnamentDivider className="my-4" />
            <p className="text-base max-w-md mx-auto" style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif' }}>
              As peças que nossas clientes mais amam e recomendam.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 100} />
            ))}
          </div>

          {/* Trust badges */}
          <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t" style={{ borderColor: 'rgba(207, 165, 160, 0.2)' }}>
            {[
              { icon: '🚚', title: 'Frete Grátis', desc: 'Acima de R$ 150' },
              { icon: '💎', title: 'Qualidade Premium', desc: 'Materiais selecionados' },
              { icon: '🔄', title: 'Troca Fácil', desc: 'Até 30 dias' },
              { icon: '🔒', title: 'Compra Segura', desc: 'Pagamento protegido' },
            ].map(badge => (
              <div key={badge.title} className="text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#7A5C58', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                  {badge.title}
                </p>
                <p className="text-xs" style={{ color: '#A08480', fontFamily: 'Nunito, sans-serif' }}>
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROMOÇÕES
      ═══════════════════════════════════════════ */}
      <section id="promocoes" ref={promocoesRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <span
              className="text-sm tracking-widest uppercase mb-3 block"
              style={{ color: '#d4856a', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              🏷️ Ofertas Especiais
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#7A5C58',
                fontWeight: 400,
              }}
            >
              Promoções
            </h2>
            <OrnamentDivider className="my-4" />
            <p className="text-base max-w-md mx-auto" style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif' }}>
              Peças selecionadas com preços especiais por tempo limitado.
            </p>
          </div>

          {/* Promo Banner */}
          <div
            className="fade-in-up rounded-2xl p-8 md:p-12 mb-10 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #CFA5A0 0%, #E6C7B2 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <FloatingSparkles />
            </div>
            <p
              className="text-white text-sm tracking-widest uppercase mb-2"
              style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              Oferta Especial
            </p>
            <h3
              className="text-white mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 400,
              }}
            >
              Frete Grátis em compras acima de R$ 150
            </h3>
            <p className="text-white/80 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Aproveite e monte seu look completo com frete por nossa conta!
            </p>
            <button
              onClick={() => scrollTo('colecao')}
              className="px-8 py-3 rounded-full font-semibold transition-all duration-200"
              style={{
                background: 'white',
                color: '#CFA5A0',
                fontFamily: 'Nunito, sans-serif',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Aproveitar Agora
            </button>
          </div>

          {/* Promo Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {promotions.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTATO
      ═══════════════════════════════════════════ */}
      <section
        id="contato"
        ref={contatoRef}
        className="py-24 px-6"
        style={{ background: '#F5EDE8' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <span
              className="text-sm tracking-widest uppercase mb-3 block"
              style={{ color: '#CFA5A0', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              Fale Conosco
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#7A5C58',
                fontWeight: 400,
              }}
            >
              Entre em Contato
            </h2>
            <OrnamentDivider className="my-4" />
            <p className="text-base max-w-md mx-auto" style={{ color: '#9A7A76', fontFamily: 'Nunito, sans-serif' }}>
              Adoramos ouvir de nossas clientes. Tire dúvidas, faça pedidos especiais ou apenas diga olá!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="fade-in-up space-y-6">
              <h3
                className="text-xl mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5C58', fontWeight: 500 }}
              >
                Informações de Contato
              </h3>

              {[
                { icon: <Phone size={18} />, label: 'WhatsApp', value: '(11) 99999-9999', href: 'https://wa.me/5511999999999' },
                { icon: <Mail size={18} />, label: 'E-mail', value: 'contato@eacessory.com.br', href: 'mailto:contato@eacessory.com.br' },
                { icon: <Instagram size={18} />, label: 'Instagram', value: '@eacessory', href: 'https://instagram.com/eacessory' },
                { icon: <MapPin size={18} />, label: 'Localização', value: 'São Paulo, SP — Brasil', href: '#' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{ background: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(207, 165, 160, 0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(207, 165, 160, 0.15)', color: '#CFA5A0' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#A08480', fontFamily: 'Nunito, sans-serif' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: '#7A5C58', fontFamily: 'Nunito, sans-serif' }}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social Media */}
              <div className="pt-4">
                <p className="text-sm font-semibold mb-4" style={{ color: '#7A5C58', fontFamily: 'Nunito, sans-serif' }}>
                  Nos siga nas redes sociais
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={20} />, href: 'https://instagram.com/eacessory', label: 'Instagram', color: '#E1306C' },
                    { icon: <MessageCircle size={20} />, href: 'https://wa.me/5511999999999', label: 'WhatsApp', color: '#25D366' },
                    { icon: <Mail size={20} />, href: 'mailto:contato@eacessory.com.br', label: 'Email', color: '#CFA5A0' },
                  ].map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{ background: 'white', color: '#7A5C58', border: '1px solid rgba(207, 165, 160, 0.3)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.border = `1px solid ${social.color}`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#7A5C58';
                        e.currentTarget.style.border = '1px solid rgba(207, 165, 160, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in-up" style={{ transitionDelay: '200ms' }}>
              <form
                onSubmit={handleContactSubmit}
                className="p-8 rounded-2xl"
                style={{ background: 'white', boxShadow: '0 4px 30px rgba(207, 165, 160, 0.12)' }}
              >
                <h3
                  className="text-xl mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5C58', fontWeight: 500 }}
                >
                  Envie uma Mensagem
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#7A5C58', fontFamily: 'Nunito, sans-serif' }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        border: '1.5px solid rgba(207, 165, 160, 0.3)',
                        background: '#FAF7F5',
                        color: '#7A5C58',
                        fontFamily: 'Nunito, sans-serif',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1.5px solid #CFA5A0')}
                      onBlur={e => (e.currentTarget.style.border = '1.5px solid rgba(207, 165, 160, 0.3)')}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#7A5C58', fontFamily: 'Nunito, sans-serif' }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        border: '1.5px solid rgba(207, 165, 160, 0.3)',
                        background: '#FAF7F5',
                        color: '#7A5C58',
                        fontFamily: 'Nunito, sans-serif',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1.5px solid #CFA5A0')}
                      onBlur={e => (e.currentTarget.style.border = '1.5px solid rgba(207, 165, 160, 0.3)')}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#7A5C58', fontFamily: 'Nunito, sans-serif' }}
                    >
                      Mensagem
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Como podemos ajudar você?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        border: '1.5px solid rgba(207, 165, 160, 0.3)',
                        background: '#FAF7F5',
                        color: '#7A5C58',
                        fontFamily: 'Nunito, sans-serif',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1.5px solid #CFA5A0')}
                      onBlur={e => (e.currentTarget.style.border = '1.5px solid rgba(207, 165, 160, 0.3)')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer
        className="py-12 px-6"
        style={{ background: '#7A5C58' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/manus-storage/eacessory-logo_dfd21380.jpeg"
                  alt="Eacessory"
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: '2px solid rgba(230, 199, 178, 0.5)' }}
                />
                <span className="brand-script text-3xl" style={{ color: '#E6C7B2' }}>
                  Eacessory
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(230, 199, 178, 0.7)', fontFamily: 'Nunito, sans-serif' }}>
                Acessórios femininos que realçam sua beleza e contam a sua história com elegância e exclusividade.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#E6C7B2', fontFamily: 'Nunito, sans-serif' }}
              >
                Navegação
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Início', href: '#home' },
                  { label: 'Sobre', href: '#sobre' },
                  { label: 'Coleção', href: '#colecao' },
                  { label: 'Mais Vendidos', href: '#mais-vendidos' },
                  { label: 'Promoções', href: '#promocoes' },
                  { label: 'Contato', href: '#contato' },
                ].map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(230, 199, 178, 0.6)', fontFamily: 'Nunito, sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E6C7B2')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(230, 199, 178, 0.6)')}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#E6C7B2', fontFamily: 'Nunito, sans-serif' }}
              >
                Redes Sociais
              </h4>
              <div className="flex gap-3 mb-6">
                {[
                  { icon: <Instagram size={18} />, href: 'https://instagram.com/eacessory', label: 'Instagram' },
                  { icon: <MessageCircle size={18} />, href: 'https://wa.me/5511999999999', label: 'WhatsApp' },
                  { icon: <Mail size={18} />, href: 'mailto:contato@eacessory.com.br', label: 'Email' },
                ].map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: 'rgba(230, 199, 178, 0.15)', color: '#E6C7B2' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#CFA5A0';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(230, 199, 178, 0.15)';
                      e.currentTarget.style.color = '#E6C7B2';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'rgba(230, 199, 178, 0.6)', fontFamily: 'Nunito, sans-serif' }}>
                📍 São Paulo, SP — Brasil
              </p>
              <p className="text-sm mt-1" style={{ color: 'rgba(230, 199, 178, 0.6)', fontFamily: 'Nunito, sans-serif' }}>
                📱 (11) 99999-9999
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="pt-8 border-t text-center"
            style={{ borderColor: 'rgba(230, 199, 178, 0.15)' }}
          >
            <OrnamentDivider className="mb-4" light />
            <p
              className="text-sm"
              style={{ color: 'rgba(230, 199, 178, 0.5)', fontFamily: 'Nunito, sans-serif' }}
            >
              © {new Date().getFullYear()} Eacessory. Todos os direitos reservados. Feito com 💕 para você.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
