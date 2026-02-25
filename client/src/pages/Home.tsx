import { Link } from "wouter";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import heroBg from "@/assets/images/hero-bg.png";
import productSmall from "@/assets/images/product-small.png";
import productMedium from "@/assets/images/product-medium.png";
import virutex from "@/assets/images/virutex.png";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  const products = [
    {
      id: 1,
      name: "Viruta S1",
      category: "Máquina Pequeña",
      image: productSmall,
      href: "/category/small"
    },
    {
      id: 2,
      name: "El Virutex",
      category: "Edición Especial",
      image: virutex,
      href: "/product/virutex"
    },
    {
      id: 3,
      name: "Viruta M2",
      category: "Máquina Mediana",
      image: productMedium,
      href: "/category/medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 parallax"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: 'center 20%'
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-primary tracking-[0.2em] text-sm uppercase mb-4">La Evolución del Reciclaje</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
              Puro. <span className="italic text-gray-400">Minimalista.</span><br />
              Sostenible.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link href="/product/virutex">
              <a className="inline-block border border-primary text-primary px-10 py-4 hover:bg-primary hover:text-black transition-all duration-500 tracking-widest text-sm uppercase">
                Explorar la Colección
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">Artesanía en cada detalle</h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Inspirados en la alta relojería y el diseño tecnológico más avanzado, 
            nuestras máquinas de reciclaje no se esconden. Se exhiben. 
            Materiales premium, funcionamiento silencioso y una estética 
            que complementa los espacios más exigentes.
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 pl-6 md:pl-20 border-t border-[#262626] overflow-hidden">
        <div className="mb-12 pr-6 md:pr-20 flex justify-between items-end">
          <h2 className="font-serif text-3xl text-white">Nuestras Creaciones</h2>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 border border-[#262626] rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              &larr;
            </button>
            <button className="w-12 h-12 border border-[#262626] rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              &rarr;
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {products.map((product) => (
              <div key={product.id} className="embla__slide flex-[0_0_85%] md:flex-[0_0_40%] min-w-0">
                <Link href={product.href}>
                  <a className="group block">
                    <div className="relative aspect-square overflow-hidden bg-[#111111] mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex justify-between items-center pr-4">
                      <div>
                        <p className="text-primary text-xs uppercase tracking-widest mb-2">{product.category}</p>
                        <h3 className="font-serif text-2xl text-white group-hover:text-primary transition-colors">{product.name}</h3>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Single Product (Parallax) */}
      <section className="relative h-[80vh] flex items-center justify-start overflow-hidden border-t border-[#262626]">
        <div 
          className="absolute inset-0 z-0 parallax"
          style={{ 
            backgroundImage: `url(${virutex})`,
            backgroundPosition: 'right center',
            backgroundSize: 'contain'
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 to-transparent" />
        
        <div className="relative z-20 px-6 md:px-20 max-w-2xl">
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">El Virutex</h2>
          <p className="text-gray-400 font-light mb-10 text-lg leading-relaxed">
            Nuestra obra maestra. Reciclaje automatizado con una interfaz táctil de cristal zafiro y acabados en oro cepillado. La perfección no es una opción, es nuestro estándar.
          </p>
          <Link href="/product/virutex">
            <a className="inline-block border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-black transition-all duration-500 tracking-widest text-sm uppercase">
              Descubrir Virutex
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
