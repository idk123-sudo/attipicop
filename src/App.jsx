import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Phone, MapPin, Clock, Star, ArrowRight, Menu, X, Camera, Quote, Heart,
  CheckCircle, AlertTriangle, ExternalLink, Plus, Minus, Maximize2, Search,
  Award, Utensils, Wine, Users, ChefHat, Leaf, Instagram, ArrowUpRight,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const GOLD = '#C9A96E';
const GOLD_LIGHT = '#E8C98A';
const CREAM = '#F5EFE0';
const DARK = '#0A0A0A';
const DARK2 = '#111111';
const DARK3 = '#181818';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactRef = useRef(null);
  const hoursRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -120]);

  const galleryImages = [
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwereUO2ouPrgO5vPIorRhETE0cINcOofW3o6SAGRrNSVcMoKcBOHMB7bpQSIx_Kb5XaANau054wRWuZuSo4_p9WRrbQj37lbIwwVbrixVsh2vVPANdi9Zb4r-OBHc5q3=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwer_MMZBDhs03QYrjdP1tVUFrQh3Q4NG5atUjE3M_YroLlTrhclptQ0CNPeXPp_oCCsVAMJiOU0zOXvsTqh7QSxkMN7ErtaPoz2Uh8pUT8DYO3JRQaZ9aquxJ-MV489farjl-F1i=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoHegQUhiVkK5da7htaXB3eK66OuVpvowU786oDwUGuRjCp0feVrjoDPaCs65CfmnZRl0CWZqSIjkbN4-t0KvOpvw7SqfxzzYNp3x6TJcNvLiQyOoNKIH3SOjyBdUpM18NO-qo=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoUv4HZpmzxcD1pijH4Ie_09dYtXeUwut0X6A5laIiav7Y-hC8vYZpeggOi-FUW3ns2rrxhPzuCy0K39yqtdNy8i4db2xywZtnSzBYIadCFYHJxY2LH6VDHW7ob-F0r095Lqo7-Sg=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwep5xkKZsFofdsUZFLzQdQTnpH9sUVBKjaOs8Ub2y_GCTH-YT77s_PYM4Ma_n2-EbEeLvTZYbiQJasvM9lrj0D2_gsWwQlSEfTkTHSVOSP1f4-tyBOMCDgFL2MuPS_0o_EKIfVEr=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweos951RDJ8CnwalDAg8rzw312wFsuLQuVAx2yajwl9rkKS_U1C-KcPXZY5sFDZxq6106eDHPXerdqlXybnmQfWQt-JbnEvULawM58OjyS1ShMvMLXutKn4nKb1faj8yJUn0wyJvNQ=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerULH0SFrUQlIkGu71bw1KldTeC1pougCmBIwHpSM3BmD0-FTi8Xbf5WjJ2-0CjAuEZ3juk2MR4vu--PQJ5nTnv2IxEm6S80GM362JofPEEd8692TGxkR2WMmCw-S84gUqsSzJf=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerLn6hQHPscMgVUoyOW4Qu3hdRYZWDSTG_xjUWC-zxim4H_6JGZlT2rRqJED9NoSdW-Bh6pxFgAqi8rufCjsUwLUPDl3pMJjwoBHLrXvGhkPhDU3sNLt57P3pmOeqp1c9GuxGWC=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepbntmo8i5TBrK1-rN-YizRnXHJXUJwSobcMcXqSXePvCYXyGnHBGbAbCSQP9WA6acwPIkWnAaTzLsmLLUAhNlcivhxoC_idYhD0_NxZY-0ZBBiNUilJVFZXLuryHIY25B14geHDQ=s680-w680-h510-rw'
  ];

  const reviews = [
    { id: 1, name: "Motoclub Linares", rating: 5, date: "Hace un año", text: "Muy buena cocina y excelente trato personal.", type: "Local Guide" },
    { id: 2, name: "ARS", rating: 5, date: "Hace 4 años", text: "Muy buen sitio en el corazón de Berja. Se respira familiaridad y buen rollo. Buenos precios, comida casera y tapas de buen tamaño. Repetiré sin duda, ya que pasó bastante por allí. El servicio es rápido tanto fuera como dentro.", type: "Local Guide" },
    { id: 3, name: "Alejandro Navarro", rating: 5, date: "Hace 8 años", text: "Sitio estupendo, con buenas tapas y buen ambiente. Sitio barato y pasar un rato muy agradable. Muy recomendable!", type: "Local Guide" },
    { id: 4, name: "Alba Jimenez", rating: 5, date: "Hace 6 años", text: "Bar nuevo (traspasado) de Berja con muy buenas tapas y tinto con limón!! Recomiendo!!", type: "Local Guide" },
    { id: 5, name: "Ayelen Giambroni", rating: 5, date: "Hace 2 años", text: "Hemos comido muy bien, el servicio ha sido rápido y bueno, volveremos a tapear otra vez seguro. 7 tapas y 4 bebidas nos salió a 20€ dos personas.", type: "Reseña" },
    { id: 6, name: "Eva Tarin", rating: 5, date: "Hace 6 años", text: "Me encanta la decoración. Además hoy llueve y he podido entrar con perrita 🐶", type: "Local Guide" },
    { id: 7, name: "Rodrigo y Loreto", rating: 5, date: "Hace 4 años", text: "Ruta gastronómica. Tapa al fino romero. Buena presentación. Muy rica.", type: "Local Guide" }
  ];

  const menuItems = {
    "Pequeña Italia": [
      { name: "Fiocchi De Pera", price: "15,00 €" },
      { name: "Panciotti De Pera", price: "15,00 €" },
      { name: "Tortellini Cinghiale", price: "15,00 €" },
      { name: "Risotto De Presa", price: "16,00 €" },
      { name: "Risotto De Langostino", price: "16,00 €" }
    ],
    "Nuestras Carnes": [
      { name: "Presa 100% Ibérica", price: "24,00 €" },
      { name: "Lagarto Ibérico", price: "20,00 €" },
      { name: "T-Bone", price: "Consultar" },
      { name: "Lomo Bajo Wagyu", price: "Consultar" }
    ],
    "Nuestros Pescados": [
      { name: "Pulpo A La Brasa", price: "22,00 €" },
      { name: "Calamar Nacional Brasa O Frito", price: "19,00 €" },
      { name: "Calamar En Aceite", price: "24,00 €" },
      { name: "Bacalao Gratinado", price: "20,00 €" },
      { name: "Almejas Del Carril", price: "20,00 €" },
      { name: "Almejas A La Marinera", price: "22,00 €" },
      { name: "Rape A La Marinera", price: "22,00 €" }
    ],
    "Menú Infantil": [
      { name: "Fingers De Pollo Con Patatas", price: "8,00 €" },
      { name: "Hamburguesa Con Patatas", price: "8,00 €" }
    ],
    "Postres": [
      { name: "Tarta De Queso", price: "6,00 €" },
      { name: "Torrija Con Helado", price: "6,00 €" },
      { name: "Milhojas", price: "5,00 €" },
      { name: "Brownie Chocolate", price: "6,00 €" }
    ],
    "Paten": [
      { name: "Flor De Alcachofa Con Foie", price: "6,00 €" },
      { name: "Tosta Jamón Ibérico", price: "3,50 €" },
      { name: "Scamorza", price: "3,50 €" },
      { name: "Fajita Pollo Crujiente", price: "3,50 €" },
      { name: "Canelones", price: "3,50 €" },
      { name: "Mini Cachopo", price: "4,50 €" },
      { name: "Brioche De Jibia Frita", price: "6,00 €" },
      { name: "Brioche De Pull Pork", price: "4,50 €" },
      { name: "Bao De Calamar Nacional Con Ali Oli Negro", price: "3,50 €" },
      { name: "Gyozas", price: "2,50 €" },
      { name: "Tosta De Secreto Y Ajoblanco", price: "3,50 €" }
    ],
    "Entrantes": [
      { name: "Tomate Raf Con Ventresca O Anchoas", price: "13,00 €" },
      { name: "Ensalada Caprese", price: "14,00 €" },
      { name: "Ensalada Atípico", price: "14,00 €" },
      { name: "Anchoas De Santoña", price: "Consultar" },
      { name: "Anchoas De Mantequilla 14-16 uds.", price: "18,00 €" },
      { name: "Tabla De Quesos", price: "14,00 €" },
      { name: "Jamón Ibérico Pata Negra", price: "22,00 €" },
      { name: "Jamón Cebo De Campo", price: "18,00 €" },
      { name: "Carpaccio Carabinero", price: "24,00 €" },
      { name: "Croquetas De Jamón 6 uds.", price: "12,00 €" },
      { name: "Croquetas De Carabinero 6 uds.", price: "14,00 €" },
      { name: "Huevos Revueltos Con Jamón Y Aceite De Trufa", price: "16,00 €" },
      { name: "Huevos Revueltos Con Gulas Y Trufa", price: "18,00 €" },
      { name: "Gambas Pil Pil", price: "18,00 €" }
    ]
  };

  useEffect(() => {
    document.title = "Atípico Food & Drinks | Restaurante Gourmet en Berja, Almería";
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute;
      const openingHours = {
        0: { open: 13 * 60, close: 20 * 60 },
        1: { open: null, close: null },
        2: { open: 13 * 60, close: 24 * 60 },
        3: { open: 13 * 60, close: 24 * 60 },
        4: { open: 13 * 60, close: 24 * 60 },
        5: { open: 13 * 60, close: 3 * 60 + 24 * 60 },
        6: { open: 13 * 60, close: 3 * 60 + 24 * 60 }
      };
      if (day === 1) { setIsOpen(false); return; }
      const hours = openingHours[day];
      if (hours.open !== null) {
        if (hours.close > 24 * 60) {
          setIsOpen(currentTime >= hours.open || currentTime < (hours.close - 24 * 60));
        } else {
          setIsOpen(currentTime >= hours.open && currentTime < hours.close);
        }
      } else { setIsOpen(false); }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const filteredMenuItems = () => {
    if (!searchQuery.trim()) return menuItems;
    const query = searchQuery.toLowerCase();
    const filtered = {};
    Object.entries(menuItems).forEach(([cat, items]) => {
      const matching = items.filter(i => i.name.toLowerCase().includes(query));
      if (matching.length > 0) filtered[cat] = matching;
    });
    return filtered;
  };

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'opacity-20'}`} style={{ color: GOLD }} />
  ));

  const navLinks = [
    { label: 'Inicio', ref: heroRef },
    { label: 'Nosotros', ref: aboutRef },
    { label: 'Reseñas', ref: reviewsRef },
    { label: 'Horarios', ref: hoursRef },
    { label: 'Contacto', ref: contactRef },
  ];

  const whatsappUrl = "https://wa.link/2pvamg";
  const instagramUrl = "https://www.instagram.com/atipicofooddrinks/?hl=es";
  const mapUrl = "https://www.google.com/maps/dir//Av.+Manuel+Salmerón,+132,+04760+Berja,+Almería";

  return (
    <div style={{ background: DARK, color: CREAM, fontFamily: "'Cormorant Garamond', Georgia, serif", minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,700&family=Jost:wght@200;300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 2px; }

        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'Jost', sans-serif; }

        .gold { color: ${GOLD}; }
        .gold-text {
          background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .line-ornament {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .line-ornament::before,
        .line-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${GOLD}50, transparent);
        }

        .menu-item-row:hover {
          background: rgba(201,169,110,0.05);
        }

        .nav-link {
          position: relative;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,239,224,0.7);
          transition: color 0.3s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: ${GOLD};
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: ${GOLD}; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: ${GOLD};
          color: #0A0A0A;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 16px 36px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: ${GOLD_LIGHT};
          transform: translateY(-1px);
          box-shadow: 0 12px 40px rgba(201,169,110,0.35);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: ${GOLD};
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 15px 36px;
          border: 1px solid ${GOLD}60;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-ghost:hover {
          background: rgba(201,169,110,0.08);
          border-color: ${GOLD};
          transform: translateY(-1px);
        }

        .section-tag {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: ${GOLD};
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-tag::before {
          content: '';
          width: 32px;
          height: 1px;
          background: ${GOLD};
        }

        .card-dark {
          background: ${DARK2};
          border: 1px solid rgba(201,169,110,0.12);
        }
        .card-dark:hover {
          border-color: rgba(201,169,110,0.3);
        }

        .noise-bg {
          position: relative;
        }
        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>

      {/* ── NAVIGATION ──────────────────────────────── */}
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 40px',
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(201,169,110,0.15)` : '1px solid transparent',
          transition: 'all 0.4s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px'
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <button onClick={() => scrollToSection(heroRef)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span className="gold-text serif" style={{ fontSize: '28px', fontWeight: 400, letterSpacing: '0.05em', fontStyle: 'italic' }}>
            Atípico
          </span>
        </button>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="hide-mobile">
          {navLinks.map((link, i) => (
            <motion.button key={link.label} className="nav-link" onClick={() => scrollToSection(link.ref)}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              {link.label}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary hide-mobile" style={{ padding: '10px 24px', fontSize: '11px' }}>
            <Phone style={{ width: 14, height: 14 }} />
            Reservar
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: CREAM, display: 'none' }} className="show-mobile">
            {isMenuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 99,
              background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: `1px solid rgba(201,169,110,0.15)`,
              padding: '24px 40px 32px'
            }}
          >
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollToSection(link.ref)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0', fontFamily: "'Jost', sans-serif", fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.8)', borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
                {link.label}
              </button>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '20px', justifyContent: 'center', width: '100%' }}>
              <Phone style={{ width: 14, height: 14 }} />
              Reservar Mesa
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ────────────────────────────────────── */}
      <section ref={heroRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: heroParallax }}>
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipOPwGIogMOjeV7NMRdEhlSgng0qYb-hsnoU7IHl=s680-w680-h510-rw"
            alt="Atípico Food & Drinks"
            style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.8)' }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)' }} />

        {/* Status badge */}
        <motion.div
          style={{ position: 'absolute', top: '100px', right: '40px', zIndex: 10 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px',
            background: isOpen ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
            border: `1px solid ${isOpen ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
            fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: isOpen ? '#4ade80' : '#fbbf24'
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: isOpen ? '#4ade80' : '#fbbf24', animation: 'pulse 2s infinite' }} />
            {isOpen ? 'Abierto ahora' : 'Cerrado'}
          </div>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px' }}>
          <motion.div className="section-tag" style={{ justifyContent: 'center', marginBottom: '32px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Berja, Almería · Desde 2017
          </motion.div>

          <motion.h1
            className="serif gold-text"
            style={{ fontSize: 'clamp(72px, 12vw, 140px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.9, marginBottom: '16px', fontStyle: 'italic' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          >
            Atípico
          </motion.h1>

          <motion.p
            className="sans"
            style={{ fontSize: '13px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.5)', marginBottom: '48px', fontWeight: 200 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          >
            Food &amp; Drinks
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Phone style={{ width: 15, height: 15 }} />
              Reservar Mesa
            </a>
            <button onClick={() => setIsMenuModalOpen(true)} className="btn-ghost">
              <Utensils style={{ width: 15, height: 15 }} />
              Ver Menú
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="sans" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${GOLD}60` }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${GOLD}60, transparent)` }} />
        </motion.div>
      </section>

      {/* ── STATS BAR ───────────────────────────────── */}
      <motion.div
        style={{ background: DARK2, borderTop: `1px solid rgba(201,169,110,0.12)`, borderBottom: `1px solid rgba(201,169,110,0.12)`, padding: '32px 40px' }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { num: '4.5', label: 'Valoración Google' },
            { num: '150+', label: 'Reseñas' },
            { num: '€€', label: 'Precio Medio' },
            { num: '2017', label: 'Desde' }
          ].map((stat, i) => (
            <div key={i} style={{ padding: '8px', borderRight: i < 3 ? `1px solid rgba(201,169,110,0.12)` : 'none' }}>
              <div className="gold-text serif" style={{ fontSize: '36px', fontWeight: 300, marginBottom: '4px' }}>{stat.num}</div>
              <div className="sans" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── ABOUT ───────────────────────────────────── */}
      <section ref={aboutRef} style={{ padding: '120px 40px', background: DARK }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="section-tag" style={{ marginBottom: '24px' }}>Nuestra Historia</div>
              <h2 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '32px', fontStyle: 'italic' }}>
                Más que un restaurante,<br />
                <span className="gold-text">una experiencia</span>
              </h2>
              <p className="sans" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,224,0.6)', fontWeight: 300, marginBottom: '24px' }}>
                Atípico nació en el corazón de Berja con la visión de crear un espacio donde la tradición mediterránea se encuentra con la innovación culinaria. Un lugar donde cada plato cuenta una historia.
              </p>
              <p className="sans" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,224,0.6)', fontWeight: 300, marginBottom: '48px' }}>
                Ingredientes frescos, recetas de autor y un equipo apasionado hacen de cada visita un momento inolvidable. Desde nuestra pasta artesanal hasta los mejores cortes ibéricos.
              </p>
              <div style={{ display: 'flex', gap: '48px' }}>
                {[
                  { icon: ChefHat, label: 'Cocina de Autor' },
                  { icon: Leaf, label: 'Producto Local' },
                  { icon: Wine, label: 'Cócteles Artesanales' }
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <Icon style={{ width: 24, height: 24, color: GOLD }} />
                    <span className="sans" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.5)', textAlign: 'center' }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div style={{ position: 'relative' }} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipMn5F3Z7O8sKJW6pSvc7JlT7dZSUM6Smo_8Bw-i=s680-w680-h510-rw"
                  alt="Interior Atípico"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
              </div>
              {/* Decorative frame */}
              <div style={{ position: 'absolute', top: -16, right: -16, width: '100%', height: '100%', border: `1px solid ${GOLD}20`, zIndex: -1 }} />
              {/* Quote box */}
              <motion.div
                style={{ position: 'absolute', bottom: -32, left: -32, background: DARK2, border: `1px solid rgba(201,169,110,0.2)`, padding: '24px 28px', maxWidth: '260px' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              >
                <Quote style={{ width: 20, height: 20, color: GOLD, marginBottom: '12px', opacity: 0.7 }} />
                <p className="serif" style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.5, fontStyle: 'italic', color: CREAM, marginBottom: '12px' }}>
                  "Sabor auténtico en el corazón de Berja"
                </p>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {renderStars(5)}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: DARK2, overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 60px', padding: '0 40px' }}>
          <motion.div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <div className="section-tag" style={{ marginBottom: '20px' }}>Galería</div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, fontStyle: 'italic' }}>
                Nuestro <span className="gold-text">espacio</span>
              </h2>
            </div>
            <span className="sans" style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${GOLD}70` }}>
              {galleryImages.length} fotografías
            </span>
          </motion.div>
        </div>

        {/* Scrolling strip */}
        <motion.div
          style={{ display: 'flex', gap: '12px' }}
          animate={{ x: [0, -galleryImages.length * 412] }}
          transition={{ duration: galleryImages.length * 6, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        >
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <motion.div key={i} style={{ width: '400px', height: '300px', flexShrink: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
              whileHover={{ scale: 1.02 }} onClick={() => setSelectedImage(img)}>
              <img src={img} alt={`Atípico ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'brightness(0.85)' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0)', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.4)'; e.currentTarget.querySelector('svg').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0)'; e.currentTarget.querySelector('svg').style.opacity = '0'; }}>
                <Maximize2 style={{ width: 28, height: 28, color: 'white', opacity: 0, transition: 'opacity 0.3s' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────── */}
      <section ref={reviewsRef} style={{ padding: '120px 40px', background: DARK }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div style={{ textAlign: 'center', marginBottom: '80px' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '24px' }}>Opiniones</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, fontStyle: 'italic', marginBottom: '40px' }}>
              Lo que dicen nuestros <span className="gold-text">clientes</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <span className="gold-text serif" style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1 }}>4.5</span>
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {renderStars(5)}
                </div>
                <span className="sans" style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.4)' }}>
                  +150 reseñas en Google
                </span>
              </div>
            </div>
          </motion.div>

          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="card-dark"
                style={{ padding: '56px', transition: 'border-color 0.3s' }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
                  {renderStars(reviews[activeReview].rating)}
                </div>
                <p className="serif" style={{ fontSize: '22px', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic', color: CREAM, marginBottom: '40px' }}>
                  "{reviews[activeReview].text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '32px', borderTop: `1px solid rgba(201,169,110,0.12)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}40, ${GOLD_LIGHT}20)`, border: `1px solid ${GOLD}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="serif" style={{ fontSize: '18px', color: GOLD }}>{reviews[activeReview].name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="sans" style={{ fontSize: '14px', fontWeight: 500, color: CREAM, letterSpacing: '0.05em' }}>{reviews[activeReview].name}</div>
                      <div className="sans" style={{ fontSize: '11px', color: 'rgba(245,239,224,0.4)', letterSpacing: '0.1em', marginTop: '2px' }}>{reviews[activeReview].date}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button onClick={() => setLikedReviews(prev => { const s = new Set(prev); s.has(reviews[activeReview].id) ? s.delete(reviews[activeReview].id) : s.add(reviews[activeReview].id); return s; })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: likedReviews.has(reviews[activeReview].id) ? GOLD : 'rgba(245,239,224,0.3)', transition: 'color 0.2s' }}>
                      <Heart style={{ width: 18, height: 18, fill: likedReviews.has(reviews[activeReview].id) ? GOLD : 'none' }} />
                    </button>
                    <button onClick={() => setActiveReview((prev) => (prev + 1) % reviews.length)}
                      style={{ background: 'none', border: `1px solid rgba(201,169,110,0.25)`, cursor: 'pointer', padding: '8px', color: GOLD, transition: 'all 0.2s', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = `rgba(201,169,110,0.1)`}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActiveReview(i)}
                  style={{ width: i === activeReview ? '24px' : '6px', height: '6px', borderRadius: '3px', background: i === activeReview ? GOLD : `${GOLD}30`, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOURS + CONTACT SPLIT ───────────────────── */}
      <section ref={hoursRef} style={{ background: DARK2, borderTop: `1px solid rgba(201,169,110,0.12)`, borderBottom: `1px solid rgba(201,169,110,0.12)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          {/* Hours */}
          <motion.div
            ref={hoursRef}
            style={{ padding: '80px 60px', borderRight: `1px solid rgba(201,169,110,0.12)` }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div className="section-tag" style={{ marginBottom: '24px' }}>Horarios</div>
            <h2 className="serif" style={{ fontSize: '40px', fontWeight: 300, fontStyle: 'italic', marginBottom: '16px' }}>
              Cuando <span className="gold-text">visitarnos</span>
            </h2>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: isOpen ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)', border: `1px solid ${isOpen ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`, marginBottom: '40px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: isOpen ? '#4ade80' : '#fbbf24' }} />
              <span className="sans" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: isOpen ? '#4ade80' : '#fbbf24' }}>
                {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { day: 'Lunes', hours: 'Cerrado', closed: true },
                { day: 'Martes — Jueves', hours: '13:00 – 24:00', closed: false },
                { day: 'Viernes — Sábado', hours: '13:00 – 3:00', closed: false },
                { day: 'Domingo', hours: '13:00 – 20:00', closed: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid rgba(201,169,110,0.08)` }}>
                  <span className="sans" style={{ fontSize: '14px', fontWeight: 300, color: s.closed ? 'rgba(245,239,224,0.3)' : 'rgba(245,239,224,0.7)', letterSpacing: '0.05em' }}>{s.day}</span>
                  <span className="sans" style={{ fontSize: '14px', fontWeight: 400, color: s.closed ? 'rgba(245,158,11,0.5)' : GOLD, letterSpacing: '0.05em' }}>{s.hours}</span>
                </div>
              ))}
            </div>
            <p className="sans" style={{ fontSize: '12px', color: 'rgba(245,239,224,0.3)', marginTop: '20px', fontStyle: 'italic' }}>
              * Horario sujeto a cambios en festivos
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            ref={contactRef}
            style={{ padding: '80px 60px' }}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div className="section-tag" style={{ marginBottom: '24px' }}>Contacto</div>
            <h2 className="serif" style={{ fontSize: '40px', fontWeight: 300, fontStyle: 'italic', marginBottom: '48px' }}>
              Encuéntranos en <span className="gold-text">Berja</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
              {[
                { icon: MapPin, title: 'Dirección', info: 'Av. Manuel Salmerón, 132\n04760 Berja, Almería', href: mapUrl },
                { icon: Phone, title: 'Reservas', info: '+34 678 29 98 20', href: whatsappUrl },
                { icon: Instagram, title: 'Instagram', info: '@atipicofooddrinks', href: instagramUrl },
              ].map(({ icon: Icon, title, info, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', textDecoration: 'none', color: 'inherit', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  <div style={{ width: '40px', height: '40px', border: `1px solid rgba(201,169,110,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 16, height: 16, color: GOLD }} />
                  </div>
                  <div>
                    <div className="sans" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>{title}</div>
                    <div className="sans" style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(245,239,224,0.7)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{info}</div>
                  </div>
                  <ArrowUpRight style={{ width: 14, height: 14, color: `${GOLD}50`, marginLeft: 'auto', flexShrink: 0, marginTop: '4px' }} />
                </a>
              ))}
            </div>

            <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', overflow: 'hidden', position: 'relative' }}>
              <img
                src="https://www.google.com/maps/vt/data=XUSv5_4CbGQh8U-jVBL5X8pyuVYi2rzNR9L4MolWaYP4_oy2Sqpw7nKCibkFbTml6J7GqNNa66T-wEzVXX-JtGsxDxKKfN_89KBPr7OGnS0ykGFT5ZBCKX96ppAYVlATxCQ2YVON-CEhrHbv4QghwaZdFvaYBlLVn7B03AWfagBAAk5aeNHNCS10f7OLHvMhO0Iry9VxHhdZMpNaTf_yccw7V_rELPj3upYlsfjBVdR-LbfLpHTz-wT9y3dI&w=227&h=80"
                alt="Ubicación"
                style={{ width: '100%', height: '160px', objectFit: 'cover', filter: 'grayscale(50%) brightness(0.7)', transition: 'filter 0.3s' }}
                onMouseEnter={e => e.target.style.filter = 'grayscale(0%) brightness(0.9)'}
                onMouseLeave={e => e.target.style.filter = 'grayscale(50%) brightness(0.7)'}
              />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: DARK, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ExternalLink style={{ width: 12, height: 12, color: GOLD }} />
                <span className="sans" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Ver mapa</span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{ background: DARK, padding: '60px 40px', borderTop: `1px solid rgba(201,169,110,0.12)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="gold-text serif" style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'italic', marginBottom: '8px' }}>Atípico</div>
            <div className="sans" style={{ fontSize: '12px', color: 'rgba(245,239,224,0.3)', letterSpacing: '0.15em' }}>FOOD &amp; DRINKS · BERJA, ALMERÍA</div>
          </div>
          <div className="sans" style={{ fontSize: '12px', color: 'rgba(245,239,224,0.25)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Atípico Food &amp; Drinks. Todos los derechos reservados.
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px 28px', fontSize: '11px' }}>
            <Phone style={{ width: 13, height: 13 }} />
            Reservar Mesa
          </a>
        </div>
      </footer>

      {/* ── MENU MODAL ──────────────────────────────── */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(24px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={() => setIsMenuModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }}
              style={{ background: DARK2, border: `1px solid rgba(201,169,110,0.15)`, width: '100%', maxWidth: '700px', maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ padding: '32px 40px 24px', borderBottom: `1px solid rgba(201,169,110,0.12)`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
                <div>
                  <div className="section-tag" style={{ marginBottom: '12px' }}>Carta</div>
                  <h2 className="serif" style={{ fontSize: '36px', fontWeight: 300, fontStyle: 'italic' }}>
                    Nuestro <span className="gold-text">Menú</span>
                  </h2>
                </div>
                <button onClick={() => setIsMenuModalOpen(false)}
                  style={{ background: 'none', border: `1px solid rgba(201,169,110,0.2)`, cursor: 'pointer', padding: '10px', color: GOLD, display: 'flex', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = `rgba(201,169,110,0.08)`}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>

              {/* Search */}
              <div style={{ padding: '20px 40px', borderBottom: `1px solid rgba(201,169,110,0.08)`, flexShrink: 0 }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: `${GOLD}60` }} />
                  <input
                    type="text"
                    placeholder="Buscar en el menú..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px 12px 44px', background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(201,169,110,0.15)`, color: CREAM, fontFamily: "'Jost', sans-serif", fontSize: '14px', outline: 'none', letterSpacing: '0.03em', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = `${GOLD}50`}
                    onBlur={e => e.target.style.borderColor = `rgba(201,169,110,0.15)`}
                  />
                </div>
              </div>

              {/* Menu Categories */}
              <div style={{ overflowY: 'auto', padding: '24px 40px 32px', flexGrow: 1 }}>
                {Object.entries(filteredMenuItems()).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(245,239,224,0.3)' }}>
                    <Utensils style={{ width: 32, height: 32, margin: '0 auto 16px', opacity: 0.3 }} />
                    <p className="sans" style={{ fontSize: '14px' }}>Sin resultados para "{searchQuery}"</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {Object.entries(filteredMenuItems()).map(([cat, items]) => (
                      <div key={cat} style={{ borderBottom: `1px solid rgba(201,169,110,0.08)` }}>
                        <button onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="serif" style={{ fontSize: '20px', fontWeight: 400, color: expandedCategory === cat ? GOLD : CREAM, transition: 'color 0.2s', fontStyle: 'italic' }}>{cat}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="sans" style={{ fontSize: '11px', color: `${GOLD}60`, letterSpacing: '0.1em' }}>{items.length} platos</span>
                            {expandedCategory === cat ? <Minus style={{ width: 14, height: 14, color: GOLD }} /> : <Plus style={{ width: 14, height: 14, color: `${GOLD}60` }} />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedCategory === cat && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                              <div style={{ paddingBottom: '12px' }}>
                                {items.map((item, i) => (
                                  <div key={i} className="menu-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 12px', transition: 'background 0.15s' }}>
                                    <span className="sans" style={{ fontSize: '14px', color: 'rgba(245,239,224,0.75)', fontWeight: 300 }}>{item.name}</span>
                                    <span className="sans" style={{ fontSize: '14px', color: GOLD, fontWeight: 400, flexShrink: 0, marginLeft: '24px' }}>{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '24px 40px', borderTop: `1px solid rgba(201,169,110,0.12)`, textAlign: 'center', flexShrink: 0 }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <Phone style={{ width: 14, height: 14 }} />
                  Reservar Mesa
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── IMAGE LIGHTBOX ──────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
              onClick={e => e.stopPropagation()}>
              <img src={selectedImage} alt="Galería" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
              <button onClick={() => setSelectedImage(null)}
                style={{ position: 'absolute', top: '-48px', right: 0, background: 'none', border: `1px solid rgba(201,169,110,0.25)`, cursor: 'pointer', padding: '10px', color: GOLD, display: 'flex' }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
              {/* Nav arrows */}
              <button onClick={() => setSelectedImage(galleryImages[(galleryImages.indexOf(selectedImage) - 1 + galleryImages.length) % galleryImages.length])}
                style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: `1px solid rgba(201,169,110,0.2)`, cursor: 'pointer', padding: '12px', color: GOLD, display: 'flex' }}>
                <ChevronLeft style={{ width: 18, height: 18 }} />
              </button>
              <button onClick={() => setSelectedImage(galleryImages[(galleryImages.indexOf(selectedImage) + 1) % galleryImages.length])}
                style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: `1px solid rgba(201,169,110,0.2)`, cursor: 'pointer', padding: '12px', color: GOLD, display: 'flex' }}>
                <ChevronRight style={{ width: 18, height: 18 }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
