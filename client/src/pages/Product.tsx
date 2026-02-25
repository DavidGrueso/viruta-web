import { useState } from "react";
import { motion } from "framer-motion";
import virutexImg from "@/assets/images/virutex.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Product() {
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShowPayment(false);
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0a0a0a] aspect-square rounded-lg flex items-center justify-center p-8 border border-[#262626]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-lg opacity-50" />
            <img 
              src={virutexImg} 
              alt="El Virutex" 
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2">
              <span className="text-primary tracking-[0.2em] text-xs uppercase font-medium">Edición Limitada</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">El Virutex</h1>
            
            <p className="text-3xl font-light text-gray-300 mb-8 border-b border-[#262626] pb-8">
              € 2,450
            </p>

            <div className="prose prose-invert prose-p:text-gray-400 prose-p:font-light mb-10">
              <p>
                El pináculo de la ingeniería de reciclaje doméstico. El Virutex combina un motor de compresión ultra-silencioso con un diseño escultural en aluminio anodizado negro y detalles en oro pulido.
              </p>
              <p>
                Equipado con sensores ópticos para separación automática de residuos y conectividad inteligente. No es solo un electrodoméstico, es una declaración de principios.
              </p>
            </div>

            <button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-primary text-black py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#b5952f] transition-colors mb-8"
            >
              Añadir al Carrito
            </button>

            <div className="grid grid-cols-3 gap-4 border-t border-[#262626] pt-8">
              <div className="flex flex-col items-center text-center text-gray-400">
                <ShieldCheck className="mb-2 text-primary" size={24} strokeWidth={1.5} />
                <span className="text-xs font-light">5 Años de Garantía</span>
              </div>
              <div className="flex flex-col items-center text-center text-gray-400">
                <Truck className="mb-2 text-primary" size={24} strokeWidth={1.5} />
                <span className="text-xs font-light">Envío Premium</span>
              </div>
              <div className="flex flex-col items-center text-center text-gray-400">
                <RotateCcw className="mb-2 text-primary" size={24} strokeWidth={1.5} />
                <span className="text-xs font-light">Devolución 30 Días</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mock Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="bg-[#141414] border-[#262626] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-center text-primary mb-2">Finalizar Compra</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Pasarela de pago segura
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            {isSuccess ? (
              <div className="text-center text-green-500 py-8">
                <ShieldCheck className="mx-auto mb-4" size={48} />
                <p className="text-xl">¡Pago completado con éxito!</p>
                <p className="text-sm text-gray-400 mt-2">Gracias por su compra en VIRUTA.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#262626] pb-4 mb-4">
                  <span className="text-gray-400">Total a pagar</span>
                  <span className="text-xl font-medium">€ 2,450</span>
                </div>
                
                <div className="space-y-4">
                  <input type="text" placeholder="Número de tarjeta" className="w-full bg-[#0a0a0a] border border-[#262626] p-3 focus:border-primary outline-none transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/AA" className="w-full bg-[#0a0a0a] border border-[#262626] p-3 focus:border-primary outline-none transition-colors" />
                    <input type="text" placeholder="CVC" className="w-full bg-[#0a0a0a] border border-[#262626] p-3 focus:border-primary outline-none transition-colors" />
                  </div>
                  <input type="text" placeholder="Nombre en la tarjeta" className="w-full bg-[#0a0a0a] border border-[#262626] p-3 focus:border-primary outline-none transition-colors" />
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-primary text-black py-4 mt-6 text-sm tracking-widest uppercase font-medium hover:bg-[#b5952f] transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Procesando..." : "Pagar € 2,450"}
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
