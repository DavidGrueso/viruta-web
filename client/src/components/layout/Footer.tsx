import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] pt-20 pb-10 text-gray-400">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h3 className="font-serif text-2xl text-primary mb-6">VIRUTA</h3>
          <p className="font-light leading-relaxed max-w-sm">
            Redefiniendo el reciclaje doméstico. Diseños que elevan tu hogar mientras protegen nuestro futuro.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Explorar</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><Link href="/category/small"><a className="hover:text-primary transition-colors">Máquinas Pequeñas</a></Link></li>
            <li><Link href="/category/medium"><a className="hover:text-primary transition-colors">Máquinas Medianas</a></Link></li>
            <li><Link href="/product/virutex"><a className="hover:text-primary transition-colors">El Virutex</a></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Asistencia</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Garantía</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between border-t border-[#262626] pt-8 text-xs font-light">
        <p>&copy; {new Date().getFullYear()} VIRUTA. Todos los derechos reservados.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Términos Legales</a>
          <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
