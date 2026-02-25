import { Link } from "wouter";
import { Menu, Search, User, ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);

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
            <button 
              onClick={() => setShowSearch(true)} 
              className="hover:text-primary transition-colors"
              data-testid="button-search"
            >
              <Search strokeWidth={1.5} size={24} />
            </button>
            <button 
              onClick={() => setShowUser(true)} 
              className="hover:text-primary transition-colors"
              data-testid="button-user"
            >
              <User strokeWidth={1.5} size={24} />
            </button>
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

      {/* Overlay Panels */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >
            <button onClick={() => setShowSearch(false)} className="absolute top-10 right-10 text-white hover:text-primary">
              <X size={32} />
            </button>
            <div className="w-full max-w-2xl">
              <input 
                autoFocus
                type="text" 
                placeholder="Buscar en la colección..." 
                className="w-full bg-transparent border-b-2 border-primary text-3xl font-serif text-white outline-none pb-4 placeholder:text-gray-700"
              />
            </div>
          </motion.div>
        )}

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

        {showUser && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-[#111] border border-white/10 p-12 max-w-md w-full relative">
              <button onClick={() => setShowUser(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="text-3xl font-serif text-white text-center mb-10">Mi Cuenta</h2>
              <div className="space-y-6">
                <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" />
                <input type="password" placeholder="Contraseña" className="w-full bg-black border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" />
                <button className="w-full bg-primary text-black py-4 uppercase tracking-widest text-sm font-medium">
                  Iniciar Sesión
                </button>
                <p className="text-center text-gray-500 text-xs mt-6 underline cursor-pointer hover:text-primary transition-colors">
                  ¿Olvidaste tu contraseña?
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
