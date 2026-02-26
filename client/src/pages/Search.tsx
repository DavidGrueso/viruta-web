import { useLocation } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import virutex from "@/assets/images/virutex.png";
import productSmall from "@/assets/images/product-small.png";

export default function Search() {
  const [location] = useLocation();
  const query = new URLSearchParams(location.split("?")[1] || "").get("q") || "";

  // Mock search results - in a real app, this would query a backend
  const allProducts = [
    { id: 1, name: "Virutex", image: virutex, href: "/product/virutex", price: "$4,999" },
    { id: 2, name: "Viruta S1", image: productSmall, href: "/category/small", price: "$1,999" },
    { id: 3, name: "Viruta Pro", image: virutex, href: "/product/virutex", price: "$8,999" },
    { id: 4, name: "Mini Viruta", image: productSmall, href: "/category/small", price: "$999" },
  ];

  const results = query
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/">
            <a className="hover:text-primary transition-colors">
              <ArrowLeft size={24} />
            </a>
          </Link>
          <div>
            <h1 className="text-4xl font-serif text-primary mb-2">Resultados de búsqueda</h1>
            <p className="text-gray-400">
              {query ? (
                <>
                  Búsqueda por: <span className="text-white font-semibold">"{query}"</span>
                  <span className="text-gray-500 ml-4">
                    {results.length} {results.length === 1 ? "resultado" : "resultados"} encontrados
                  </span>
                </>
              ) : (
                "Ingresa un término de búsqueda"
              )}
            </p>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {results.map((product) => (
              <motion.div key={product.id} variants={item}>
                <Link href={product.href}>
                  <a className="group block">
                    <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-square mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-light mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary text-lg font-semibold">{product.price}</p>
                  </a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : query ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-gray-400 mb-4">
                No se encontraron resultados
              </h2>
              <p className="text-gray-500 mb-8">
                Intenta con otros términos de búsqueda
              </p>
              <Link href="/">
                <a className="inline-block bg-primary text-black px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  Volver al inicio
                </a>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
