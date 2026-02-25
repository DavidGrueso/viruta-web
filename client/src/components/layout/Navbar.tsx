import { Link } from "wouter";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const categories = [
    { name: "Máquinas Pequeñas", href: "/category/small" },
    { name: "Máquinas Medianas", href: "/category/medium" },
    { name: "Sistemas Integrales", href: "/category/large" },
    { name: "El Virutex", href: "/product/virutex" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-[#0c2b1a] to-transparent backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Hamburger */}
        <div className="flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white hover:text-primary transition-colors p-2 -ml-2">
                <Menu strokeWidth={1.5} size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0a0a0a] border-r-[#262626] text-white">
              <SheetTitle className="text-primary font-serif text-2xl mb-8 mt-4">Categorías</SheetTitle>
              <nav className="flex flex-col gap-6">
                {categories.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <a className="text-lg font-light text-gray-300 hover:text-primary transition-colors flex items-center gap-4">
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
          <a className="font-serif text-3xl tracking-widest text-primary font-medium">
            VIRUTA
          </a>
        </Link>

        {/* Right: Icons */}
        <div className="flex-1 flex justify-end gap-6 text-white">
          <button className="hover:text-primary transition-colors">
            <Search strokeWidth={1.5} size={24} />
          </button>
          <button className="hover:text-primary transition-colors">
            <User strokeWidth={1.5} size={24} />
          </button>
          <button className="hover:text-primary transition-colors">
            <ShoppingCart strokeWidth={1.5} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
