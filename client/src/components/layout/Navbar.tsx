import { Link, useLocation } from "wouter";
import { Menu, Search, User, ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import virutex from "@/assets/images/virutex.png";
import productSmall from "@/assets/images/product-small.png";

export default function Navbar() {
  const [, navigate] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const suggestions = [
    { name: "Virutex", image: virutex, href: "/product/virutex" },
    { name: "Viruta S1", image: productSmall, href: "/category/small" },
  ];
  const searchWidth = 320;
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const categories = [
    { name: "Máquinas Pequeñas", href: "/category/small" },
    { name: "Máquinas Medianas", href: "/category/medium" },
    { name: "Sistemas Integrales", href: "/category/large" },
    { name: "El Virutex", href: "/product/virutex" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-[#0c2b1a] to-transparent backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Hamburger */}
          <div className="flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white hover:text-primary transition-colors p-2 -ml-2" data-testid="button-menu">
                  <Menu strokeWidth={1.5} size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#0a0a0a] border-r-[#262626] text-white">
                <SheetTitle className="text-primary font-serif text-2xl mb-8 mt-4">Categorías</SheetTitle>
                <nav className="flex flex-col gap-6">
                  {categories.map((cat) => (
                    <Link key={cat.name} href={cat.href}>
                      <a className="text-lg font-light text-gray-300 hover:text-primary transition-colors flex items-center gap-4 group">
                        <span className="h-[1px] w-4 bg-primary/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-8"></span>
                        {cat.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Logo */}
          <Link href="/">
            <a className="font-serif text-3xl tracking-widest text-primary font-medium" data-testid="link-home">
              VIRUTA
            </a>
          </Link>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end gap-6 text-white">
            <div ref={searchRef} className="relative">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: showSearch ? searchWidth : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute right-0 top-0 h-full bg-[#222] rounded-md overflow-hidden flex items-center"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchTerm.trim()) {
                      const updated = [searchTerm.trim(), ...recentSearches.filter(r => r !== searchTerm.trim())].slice(0,5);
                      setRecentSearches(updated);
                      localStorage.setItem("recentSearches", JSON.stringify(updated));
                      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                      setShowSearch(false);
                      setSearchTerm("");
                    }
                  }}
                  placeholder="Buscar..."
                  className="flex-grow bg-transparent text-white px-3 py-1 outline-none"
                />
              </motion.div>

              <button
                onClick={() => setShowSearch((v) => !v)}
                className="hover:text-primary transition-colors"
                data-testid="button-search"
              >
                <Search strokeWidth={1.5} size={24} />
              </button>

              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute right-0 top-full mt-2 bg-[#222] border border-white/10 rounded-lg shadow-lg z-50 p-4"
                  layout
                >
                  <div style={{ width: searchWidth }} className="mx-auto">
                  
                    {recentSearches.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-400 uppercase mb-1">Recientes</div>
                        <ul className="space-y-2">
                          {recentSearches.map((r) => (
                            <li key={r} className="flex justify-between items-center text-white text-sm hover:text-primary">
                              <span className="cursor-pointer" onClick={() => { navigate(`/search?q=${encodeURIComponent(r)}`); setShowSearch(false); }}>{r}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = recentSearches.filter(x => x !== r);
                                  setRecentSearches(updated);
                                  localStorage.setItem("recentSearches", JSON.stringify(updated));
                                }}
                                className="text-gray-400 hover:text-red-500 ml-2"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-gray-400 uppercase mb-1">Sugeridos</div>
                      <ul className="space-y-2">
                        {suggestions.map((s) => (
                          <li key={s.name} className="flex items-center gap-4 hover:bg-white/5 p-2 rounded">
                            <img src={s.image} alt={s.name} className="w-16 h-16 object-cover" />
                            <Link href={s.href}><a className="text-white text-sm">{s.name}</a></Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfile((v) => !v)}
                className="hover:text-primary transition-colors"
                data-testid="button-user"
              >
                <User strokeWidth={1.5} size={24} />
              </button>

              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute right-0 top-full mt-2 bg-[#222] border border-white/10 rounded-lg shadow-lg z-50 p-4"
                  layout
                >
                  <div className="w-56">
                    {isLoggedIn ? (
                      <>
                        <div className="mb-4">
                          <p className="text-white font-light text-sm mb-3">¡Bienvenido de vuelta!</p>
                          <Link href="/profile">
                            <a className="block w-full bg-primary text-black py-2 px-4 rounded text-center hover:bg-primary/90 transition-colors font-medium text-sm">
                              Ir a mi perfil
                            </a>
                          </Link>
                        </div>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setShowProfile(false);
                          }}
                          className="w-full border border-white/20 text-white py-2 px-4 rounded hover:border-white/40 transition-colors font-light text-sm"
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-white font-light text-sm mb-4">Inicia sesión para acceder a tu perfil</p>
                        <button
                          onClick={() => {
                            setIsLoggedIn(true);
                            setShowProfile(false);
                          }}
                          className="w-full bg-primary text-black py-2 px-4 rounded hover:bg-primary/90 transition-colors font-medium text-sm"
                        >
                          Iniciar sesión
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
            <button 
              onClick={() => setShowCart(true)} 
              className="hover:text-primary transition-colors relative"
              data-testid="button-cart"
            >
              <ShoppingCart strokeWidth={1.5} size={24} />
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>


        {showCart && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[100] h-full w-full max-w-md bg-[#111] border-l border-white/10 p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif text-white">Carrito</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingCart size={64} className="text-gray-800 mb-6" />
              <p className="text-gray-500 font-light">Tu carrito está vacío</p>
            </div>
            <button className="w-full bg-primary text-black py-4 uppercase tracking-widest text-sm font-medium mt-auto">
              Seguir Comprando
            </button>
          </motion.div>
        )}

    </>
  );
}
