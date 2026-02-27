import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Clock,
  Star, ArrowRight, Menu, X, Camera, Quote, Heart,
  CheckCircle, AlertTriangle, ExternalLink, Plus, Minus, Maximize2, Search,
  Award, Utensils, GlassWater, Wine, Users, ChefHat, Leaf, Instagram
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactRef = useRef(null);
  const hoursRef = useRef(null);

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
    {
      id: 1,
      name: "motoclub LINARES",
      rating: 5,
      date: "Hace un año",
      text: "Muy buena cocina y excelente trato personal.",
      type: "Local Guide"
    },
    {
      id: 2,
      name: "ARS",
      rating: 5,
      date: "Hace 4 años",
      text: "Muy buen sitio en el corazón de Berja. Se respira familiaridad y buen rollo. Buenos precios, comida casera y tapas de buen tamaño. Repetiré sin duda, ya que pasó bastante por allí. El servicio es rápido tanto fuera como dentro.",
      type: "Local Guide"
    },
    {
      id: 3,
      name: "Alejandro Navarro",
      rating: 5,
      date: "Hace 8 años",
      text: "Sitio estupendo, con buenas tapas y buen ambiente. Sitio barato y pasar un rato muy agradable. Muy recomendable!",
      type: "Local Guide"
    },
    {
      id: 4,
      name: "Alba Jimenez",
      rating: 5,
      date: "Hace 6 años",
      text: "Bar nuevo (traspasado) de Berja con muy buenas tapas y tinto con limón!! Recomiendo!!",
      type: "Local Guide"
    },
    {
      id: 5,
      name: "Ayelen Giambroni Brac",
      rating: 5,
      date: "Hace 2 años",
      text: "Hemos comido muy bien, el servicio ha sido rápido y bueno, volveremos a tapear otra vez seguro. 7 tapas y 4 bebidas nos salió a 20€ dos personas.",
      type: "Reseña"
    },
    {
      id: 6,
      name: "Eva Tarin",
      rating: 5,
      date: "Hace 6 años",
      text: "Me encanta la decoración. Además hoy llueve y he podido entrar con perrita 🐶🐶🐶",
      type: "Local Guide"
    },
    {
      id: 7,
      name: "Rodrigo y loreto",
      rating: 5,
      date: "Hace 4 años",
      text: "Ruta gastronómica. Tapa al fino romero. Buena presentación. Muy rica",
      type: "Local Guide"
    }
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
      { name: "T-Bone", price: "" },
      { name: "Lomo Bajo Wagyu", price: "" }
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
      { name: "Anchoas De Santoña", price: "" },
      { name: "Anchoas De Mantequilla 14-16 uds.", price: "18,00 €" },
      { name: "Tabla De Quesos", price: "14,00 €" },
      { name: "Jamón Ibérico Pata Negra", price: "22,00 €" },
      { name: "Jamón Cebo De Campo", price: "18,00 €" },
      { name: "Carpaccio Carabinero", price: "24,00 €" },
      { name: "Croquetas De Jamón 6 uds.", price: "12,00 €" },
      { name: "Croquetas De Carabinero 6 uds.", price: "14,00 €" },
      { name: "Huevos Revueltos Con Jamón Cebo De Campo Y Aceite De Trufa", price: "16,00€" },
      { name: "Huevos Revueltos Con Gulas Y Trufa", price: "18,00 €" },
      { name: "Gambas Pil Pil", price: "18,00 €" }
    ]
  };

  useEffect(() => {
    // Set SEO meta tags
    document.title = "Atípico Food & Drinks | Mejor Restaurante en Berja, Almería";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Atípico Food & Drinks - Restaurante gourmet en Berja, Almería. Cocina de autor, tapas, cócteles y ambiente tropical. ¡Reserva tu mesa ahora!');
    }

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
        0: { open: 13*60, close: 20*60 },
        1: { open: null, close: null },
        2: { open: 13*60, close: 24*60 },
        3: { open: 13*60, close: 24*60 },
        4: { open: 13*60, close: 24*60 },
        5: { open: 13*60, close: 3*60+24*60 },
        6: { open: 13*60, close: 3*60+24*60 }
      };

      if (day === 1) {
        setIsOpen(false);
      } else {
        const hours = openingHours[day];
        if (hours.open !== null && hours.close !== null) {
          if (hours.close > 24*60) {
            setIsOpen(currentTime >= hours.open || currentTime < (hours.close - 24*60));
          } else {
            setIsOpen(currentTime >= hours.open && currentTime < hours.close);
          }
        } else {
          setIsOpen(false);
        }
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToHours = () => {
    setTimeout(() => {
      if (hoursRef.current) {
        hoursRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const renderStars = (rating, showHalf = false) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-red-400 fill-red-400" />
        );
      } else if (showHalf && i === Math.floor(rating)) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-red-400 fill-red-400 opacity-50" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-400" />
        );
      }
    }
    return stars;
  };

  const mapUrl = "https://www.google.com/maps/dir//Av.+Manuel+Salmerón,+132,+04760+Berja,+Almería";
  const whatsappUrl = "https://wa.link/2pvamg";
  const instagramUrl = "https://www.instagram.com/atipicofooddrinks/?hl=es";
  const mapImageUrl = "https://www.google.com/maps/vt/data=XUSv5_4CbGQh8U-jVBL5X8pyuVYi2rzNR9L4MolWaYP4_oy2Sqpw7nKCibkFbTml6J7GqNNa66T-wEzVXX-JtGsxDxKKfN_89KBPr7OGnS0ykGFT5ZBCKX96ppAYVlATxCQ2YVON-CEhrHbv4QghwaZdFvaYBlLVn7B03AWfagBAAk5aeNHNCS10f7OLHvMhO0Iry9VxHhdZMpNaTf_yccw7V_rELPj3upYlsfjBVdR-LbfLpHTz-wT9y3dI&w=227&h=80";

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const toggleLike = (reviewId) => {
    setLikedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const filteredMenuItems = () => {
    if (!searchQuery.trim()) {
      return menuItems;
    }
    const query = searchQuery.toLowerCase();
    const filtered = {};
    Object.entries(menuItems).forEach(([category, items]) => {
      const matchingItems = items.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      if (matchingItems.length > 0) {
        filtered[category] = matchingItems;
      }
    });
    return filtered;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans" style={{ fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* SEO Meta Tags */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          .font-elegant {
            font-family: 'Playfair Display', serif;
          }
          
          .font-body {
            font-family: 'Montserrat', sans-serif;
          }
          
          .tropical-gradient {
            background: linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #06b6d4 100%);
          }
          
          .tropical-text {
            background: linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      {/* SEO Meta Tags - These would normally be in the head section */}
      <div style={{ display: 'none' }}>
        <meta name="description" content="Atípico Food & Drinks - Restaurante gourmet en Berja, Almería. Cocina de autor, tapas, cócteles y ambiente tropical. ¡Reserva tu mesa ahora!" />
        <meta name="keywords" content="restaurante berja, atipico berja, food drinks, restaurante almeria, tapas berja, cocina gourmet, restaurante tropical, berja almeria" />
        <meta name="author" content="Atípico Food & Drinks" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Atípico Food & Drinks | Mejor Restaurante en Berja, Almería" />
        <meta property="og:description" content="Restaurante gourmet en Berja, Almería. Cocina de autor, tapas, cócteles y ambiente tropical." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Atípico Food & Drinks | Berja, Almería" />
        <meta name="twitter:description" content="Restaurante gourmet con cocina de autor y ambiente tropical en Berja." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Atípico Food & Drinks",
            "image": "https://lh3.googleusercontent.com/p/AF1QipOPwGIogMOjeV7NMRdEhlSgng0qYb-hsnoU7IHl=s680-w680-h510-rw",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Manuel Salmerón, 132",
              "addressLocality": "Berja",
              "addressRegion": "Almería",
              "postalCode": "04760",
              "addressCountry": "ES"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.8409",
              "longitude": "-2.9448"
            },
            "url": "https://www.atipicoberja.com",
            "telephone": "+34600000000",
            "servesCuisine": "Mediterranean, Spanish, Gourmet",
            "priceRange": "€€",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Monday",
                "opens": "Closed",
                "closes": "Closed"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
                "opens": "13:00",
                "closes": "24:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Friday", "Saturday"],
                "opens": "13:00",
                "closes": "03:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "13:00",
                "closes": "20:00"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": "150"
            }
          })}
        </script>
      </div>

      {/* Navigation */}
      <nav className="bg-teal-950/90 backdrop-blur-md fixed w-full z-50 border-b border-teal-500/30 shadow-lg shadow-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.button
              onClick={() => scrollToSection(heroRef)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold tracking-wide text-teal-400 flex items-center gap-3"
            >
              <span className="tropical-text font-elegant">
                Atípico
              </span>
            </motion.button>

            <div className="hidden md:flex space-x-8">
              {['Inicio', 'Quiénes Somos', 'Reseñas', 'Horarios'].map((item, index) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05, color: "#2dd4bf" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (item === 'Horarios') scrollToHours();
                    else scrollToSection([heroRef, aboutRef, reviewsRef, contactRef][index]);
                  }}
                  className="hover:text-teal-400 transition-colors font-medium relative group text-gray-300 font-body"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 tropical-gradient group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-teal-400" />
              ) : (
                <Menu className="w-6 h-6 text-teal-400" />
              )}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-teal-950/95 backdrop-blur-md border-t border-teal-500/30"
          >
            <div className="px-4 pt-2 pb-3 space-y-3">
              {['Inicio', 'Quiénes Somos', 'Reseñas', 'Horarios'].map((item, index) => (
                <motion.button
                  key={item}
                  whileHover={{ backgroundColor: 'rgba(45, 212, 191, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (item === 'Horarios') scrollToHours();
                    else scrollToSection([heroRef, aboutRef, reviewsRef, contactRef][index]);
                  }}
                  className="block px-3 py-2 rounded-md hover:bg-teal-900/50 font-medium w-full text-left text-gray-300 font-body"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-900/70 to-transparent z-10"></div>
        <motion.img
          src="https://lh3.googleusercontent.com/p/AF1QipOPwGIogMOjeV7NMRdEhlSgng0qYb-hsnoU7IHl=s680-w680-h510-rw"
          alt="Atípico Bar Restaurante Berja Almería"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-wide tropical-text font-elegant leading-tight drop-shadow-2xl"
            style={{ textShadow: "0 0 40px rgba(45, 212, 191, 0.5)" }}
          >
            Atípico
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-teal-100 mb-10 font-light drop-shadow-lg font-body tracking-widest"
            style={{ letterSpacing: "0.3em" }}
          >
            FOOD & DRINKS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            {isOpen ? (
              <motion.div 
                className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-sm"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold font-body">Abierto ahora</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 backdrop-blur-sm">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold font-body">Cerrado</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -5px rgba(45, 212, 191, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="tropical-gradient text-white font-semibold py-4 px-10 rounded-full transition-all text-lg shadow-2xl shadow-teal-500/30 font-body"
            >
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Reservar Mesa
              </div>
            </motion.a>
            
            <motion.button
              onClick={() => setIsMenuModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -5px rgba(45, 212, 191, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-teal-950 font-semibold py-4 px-10 rounded-full transition-all text-lg shadow-xl backdrop-blur-sm font-body"
            >
              <div className="flex items-center">
                <Utensils className="w-5 h-5 mr-2" />
                Ver Menú
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-teal-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-24 bg-gradient-to-b from-teal-950 to-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold mb-4 tropical-text font-elegant"
            >
              <Users className="w-10 h-10 inline mr-3 text-teal-400" />
              Quiénes Somos
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-teal-200/70 max-w-3xl mx-auto font-light text-lg font-body"
            >
              Descubre nuestra historia, valores y compromiso con la excelencia
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 p-8 rounded-2xl shadow-2xl border border-teal-500/20 backdrop-blur-sm">
                <div className="flex items-start mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ChefHat className="text-teal-400 w-10 h-10 mr-4" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-teal-400 font-elegant">Nuestra Historia</h3>
                    <p className="text-teal-100/70 font-light leading-relaxed font-body">
                      Atípico nació en Berja con la visión de crear un espacio único donde la tradición 
                      se encuentra con la innovación. Un lugar donde cada cóctel cuenta una historia 
                      y cada visita se convierte en una experiencia memorable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 p-8 rounded-2xl shadow-2xl border border-teal-500/20 backdrop-blur-sm">
                <div className="flex items-start mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Leaf className="text-emerald-400 w-10 h-10 mr-4" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-emerald-400 font-elegant">Nuestro Compromiso</h3>
                    <p className="text-teal-100/70 font-light leading-relaxed font-body">
                      Utilizamos ingredientes frescos y de calidad premium para crear cócteles 
                      excepcionales. Nuestro equipo de bartenders está constantemente innovando 
                      para sorprenderte con nuevas creaciones.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipMn5F3Z7O8sKJW6pSvc7JlT7dZSUM6Smo_8Bw-i=s680-w680-h510-rw"
                  alt="Atípico Interior Restaurante Berja"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-elegant">Más que un bar, una experiencia</h3>
                  <p className="text-teal-100/70 font-light font-body">
                    Un espacio donde la música, la decoración y el ambiente se fusionan perfectamente.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Award, title: "Calidad Premium", desc: "Ingredientes seleccionados y recetas exclusivas" },
              { icon: Users, title: "Ambiente Único", desc: "Un espacio diseñado para crear momentos inolvidables" },
              { icon: Wine, title: "Cócteles Artesanales", desc: "Cada bebida es una obra de arte" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-gradient-to-b from-teal-900/30 to-emerald-900/30 rounded-2xl border border-teal-500/20 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "rgba(45, 212, 191, 0.5)",
                  boxShadow: "0 10px 40px rgba(45, 212, 191, 0.2)"
                }}
              >
                <feature.icon className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-teal-400 font-elegant">{feature.title}</h3>
                <p className="text-teal-100/60 font-light font-body">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-emerald-950 to-cyan-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold mb-4 tropical-text font-elegant"
            >
              <Camera className="w-10 h-10 inline mr-3 text-teal-400" />
              Galería
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-teal-200/70 max-w-2xl mx-auto font-light font-body"
            >
              Descubre nuestro espacio a través de nuestras imágenes
            </motion.p>
          </motion.div>
        </div>

        {/* Full-width gallery container - only on desktop */}
        <div className="hidden lg:block overflow-hidden relative w-full">
          <motion.div
            className="flex"
            animate={{
              x: [0, -galleryImages.length * 450]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: galleryImages.length * 5,
                ease: "linear"
              }
            }}
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="w-[400px] h-[350px] overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer relative group mx-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openImageModal(img)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={img}
                  alt={`Galería Atípico Berja ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-10 h-10 text-white drop-shadow" />
                </div>
              </motion.div>
            ))}
            {galleryImages.map((img, index) => (
              <motion.div
                key={`duplicate-${index}`}
                className="w-[400px] h-[350px] overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer relative group mx-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openImageModal(img)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={img}
                  alt={`Galería Atípico Berja duplicate ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-10 h-10 text-white drop-shadow" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile gallery */}
        <div className="lg:hidden overflow-hidden relative max-w-7xl mx-auto px-4">
          <motion.div
            className="flex space-x-4"
            animate={{
              x: [0, -galleryImages.length * 300]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: galleryImages.length * 5,
                ease: "linear"
              }
            }}
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="w-72 h-64 overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer relative group rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openImageModal(img)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={img}
                  alt={`Galería Atípico Berja ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white drop-shadow" />
                </div>
              </motion.div>
            ))}
            {galleryImages.map((img, index) => (
              <motion.div
                key={`duplicate-${index}`}
                className="w-72 h-64 overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer relative group rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openImageModal(img)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={img}
                  alt={`Galería Atípico Berja duplicate ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white drop-shadow" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section ref={reviewsRef} id="reviews" className="py-24 bg-gradient-to-b from-cyan-950 to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold mb-4 tropical-text font-elegant"
            >
              <Quote className="w-10 h-10 inline mr-3 text-teal-400" />
              Reseñas
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-teal-200/70 max-w-2xl mx-auto font-light font-body"
            >
              Descubre lo que nuestros clientes dicen sobre nosotros
            </motion.p>

            {/* Average Rating Display */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="text-5xl font-bold tropical-text">4.5</div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {renderStars(4.5, true)}
                </div>
                <span className="text-teal-200/60 text-sm font-body">Basado en {reviews.length}+ reseñas</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, x: 300, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -300, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 p-8 rounded-2xl shadow-2xl border border-teal-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start mb-6">
                  <div className="mr-6">
                    <motion.div 
                      className="w-16 h-16 tropical-gradient rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {reviews[activeReview].name.charAt(0)}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white font-elegant">{reviews[activeReview].name}</h3>
                    <div className="flex items-center mt-2">
                      {renderStars(reviews[activeReview].rating)}
                      <span className="ml-3 text-sm text-teal-200/60 font-body">{reviews[activeReview].date}</span>
                    </div>
                    {reviews[activeReview].type && (
                      <span className="inline-block mt-2 text-xs tropical-gradient text-white px-3 py-1.5 rounded-full font-medium font-body">
                        {reviews[activeReview].type}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-teal-100/80 mb-8 leading-relaxed text-lg font-light font-body">
                  {reviews[activeReview].text}
                </p>

                {/* Photos removed from reviews */}

                <div className="flex justify-between items-center pt-6 border-t border-teal-500/20">
                  <div className="flex space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(reviews[activeReview].id)}
                      className="text-teal-200/60 transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 ${likedReviews.has(reviews[activeReview].id) ? 'text-teal-400 fill-teal-400' : ''}`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextReview}
                      className="text-teal-200/60 transition-colors"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section ref={hoursRef} id="hours" className="py-24 bg-gradient-to-b from-teal-950 to-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold mb-4 tropical-text font-elegant"
            >
              <Clock className="w-10 h-10 inline mr-3 text-teal-400" />
              Horarios
            </motion.h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 p-8 rounded-2xl shadow-2xl border border-teal-500/20 backdrop-blur-sm text-center"
            >
              <div className="mb-8">
                {isOpen ? (
                  <motion.div 
                    className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-lg font-semibold"
                  >
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Abierto ahora
                  </motion.div>
                ) : (
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-lg font-semibold">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Cerrado
                  </div>
                )}
              </div>

              <div className="space-y-4 text-lg font-body">
                {[
                  { day: "Lunes", hours: "Cerrado" },
                  { day: "Martes", hours: "13:00 - 24:00" },
                  { day: "Miércoles", hours: "13:00 - 24:00" },
                  { day: "Jueves", hours: "13:00 - 24:00" },
                  { day: "Viernes", hours: "13:00 - 3:00" },
                  { day: "Sábado", hours: "13:00 - 3:00" },
                  { day: "Domingo", hours: "13:00 - 20:00" }
                ].map((schedule, index) => (
                  <motion.div 
                    key={schedule.day}
                    className="flex justify-between border-b border-teal-500/20 pb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
                  >
                    <span className="font-medium text-teal-100/80">{schedule.day}</span>
                    <span className={`font-bold ${schedule.hours === 'Cerrado' ? 'text-amber-400' : 'text-teal-400'}`}>{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-sm text-amber-400/70 italic font-body">
                *El horario podría cambiar durante fechas festivas
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-24 bg-gradient-to-b from-emerald-950 to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold mb-4 tropical-text font-elegant"
            >
              <MapPin className="w-10 h-10 inline mr-3 text-teal-400" />
              Contacto
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-10">
              {[
                { icon: MapPin, title: "Dirección", content: "Av. Manuel Salmerón, 132\n04760 Berja, Almería" },
                { icon: Phone, title: "Teléfono", content: "+34 678 29 98 20" },
                { icon: Clock, title: "Horarios", content: "Martes - Jueves: 13:00 - 24:00\nViernes - Sábado: 13:00 - 3:00\nDomingo: 13:00 - 20:00\nLunes: Cerrado" }
              ].map((info, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <info.icon className="text-teal-400 w-10 h-10 mt-1 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-teal-400 font-elegant">{info.title}</h3>
                    <p className="text-teal-100/70 text-lg font-light whitespace-pre-line font-body">{info.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Instagram only - Facebook removed */}
              <div className="flex space-x-6 pt-6">
                <motion.a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#2dd4bf" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-teal-200/60 hover:text-teal-400 transition-colors"
                >
                  <Instagram className="w-8 h-8" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold mb-6 text-teal-400 font-elegant">Ubicación</h3>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <motion.img
                    src={mapImageUrl}
                    alt="Mapa de Atípico Food & Drinks Berja Almería"
                    className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                </a>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-teal-200/60 text-sm mt-3 font-body"
                >
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Haz clic para ver en Google Maps
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-950 py-12 border-t border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <motion.img
              src="https://lh3.googleusercontent.com/p/AF1QipMDRiRitpu5tZ2c5MjhwW2TPmniFKECiS7QgnXw=s680-w680-h510-rw"
              alt="Atípico Food & Drinks Logo Berja"
              className="w-16 h-16"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <p className="text-teal-100/60 text-lg font-light font-body">
            © {new Date().getFullYear()} Atípico Food & Drinks. Todos los derechos reservados.
          </p>
          <p className="text-sm text-teal-100/40 mt-2 font-light font-body">
            Av. Manuel Salmerón, 132, 04760 Berja, Almería
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex justify-center space-x-4"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="tropical-gradient text-white font-semibold py-2 px-6 rounded-full text-sm font-body"
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Contactar
            </motion.a>
          </motion.div>
        </div>
      </footer>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-teal-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsMenuModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-teal-900 to-emerald-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-teal-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-teal-400 tracking-wide flex items-center font-elegant">
                  <Utensils className="w-8 h-8 mr-3" />
                  Nuestro Menú
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(45, 212, 191, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuModalOpen(false)}
                  className="text-teal-200/60 hover:text-teal-400 transition-colors p-2 rounded-full"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-200/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar en el menú..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-teal-800/50 border border-teal-500/30 rounded-full text-white placeholder-teal-200/60 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all w-full text-lg font-body"
                />
              </div>

              <div className="space-y-6">
                {Object.entries(filteredMenuItems()).map(([category, items]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-teal-800/30 rounded-xl p-4 border border-teal-500/20"
                  >
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(45, 212, 191, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleCategory(category)}
                      className="flex justify-between items-center w-full text-left p-2 rounded-lg"
                    >
                      <h3 className="text-xl font-bold text-teal-400 mb-2 font-elegant">
                        {category}
                      </h3>
                      {expandedCategory === category ? (
                        <Minus className="w-5 h-5 text-teal-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-teal-400" />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {expandedCategory === category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mt-3">
                            {items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex justify-between items-center bg-gradient-to-r from-teal-800/50 to-emerald-800/50 p-4 rounded-lg hover:from-teal-700/50 hover:to-emerald-700/50 transition-all border border-teal-500/20"
                              >
                                <span className="text-white font-medium font-body">{item.name}</span>
                                {item.price && (
                                  <span className="text-teal-400 font-bold font-body">{item.price}</span>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {searchQuery.trim() && Object.keys(filteredMenuItems()).length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 text-teal-200/60"
                  >
                    <Award className="w-12 h-12 mx-auto mb-4 text-teal-400/40" />
                    <p className="text-lg font-body">No se encontraron productos que coincidan con "{searchQuery}"</p>
                    <p className="text-sm mt-2 font-body">Prueba con otra búsqueda</p>
                  </motion.div>
                )}
              </div>

              <div className="mt-8 text-center">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -5px rgba(45, 212, 191, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block tropical-gradient text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg shadow-teal-500/30 font-body"
                >
                  <div className="flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Reservar Mesa Ahora
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-teal-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] bg-teal-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-teal-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Galería ampliada Atípico Berja"
                className="max-w-full max-h-full object-contain"
              />
              <motion.button
                whileHover={{ backgroundColor: 'rgba(45, 212, 191, 0.3)' }}
                whileTap={{ scale: 0.9 }}
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white hover:text-teal-400 p-2 bg-teal-950/50 rounded-full backdrop-blur-sm border border-teal-500/30"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
