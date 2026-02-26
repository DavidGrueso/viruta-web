import { Link } from "wouter";
import { useState } from "react";

export default function Profile() {
  const [mode, setMode] = useState("general");

  const sections = [
    { id: "general", label: "General" },
    { id: "pedidos", label: "Pedidos" },
    { id: "pago", label: "Pago" },
    { id: "reembolsos", label: "Reembolsos" },
    { id: "valoraciones", label: "Valoraciones" },
    { id: "ajustes", label: "Ajustes" },
    { id: "envio", label: "Dirección de envío" },
  ];

  const renderContent = () => {
    switch (mode) {
      case "general":
        return (
          <>
            <h2 className="text-xl text-white mb-3">Configuración de la cuenta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre" className="p-3 bg-black border border-white/10 text-white outline-none" />
              <input type="email" placeholder="Email" className="p-3 bg-black border border-white/10 text-white outline-none" />
            </div>
            <div className="mt-4 flex gap-4">
              <button className="bg-primary text-black px-4 py-2 rounded-full">Guardar cambios</button>
              <button className="border border-white/10 px-4 py-2 rounded-full">Cambiar contraseña</button>
            </div>
          </>
        );
      case "pedidos":
        return (
          <>
            <h2 className="text-xl text-white mb-3">Compras previas</h2>
            <div className="space-y-3">
              <div className="bg-black p-4 border border-white/5 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Pedido #12345 — 12 Feb 2026</div>
                    <div className="text-white">El Virutex — €2,450</div>
                  </div>
                  <Link href="/order/12345">
                    <a className="text-primary underline">Ver pedido</a>
                  </Link>
                </div>
              </div>
              <div className="bg-black p-4 border border-white/5 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Pedido #12200 — 03 Ene 2026</div>
                    <div className="text-white">Viruta M2 — €1,199</div>
                  </div>
                  <Link href="/order/12200">
                    <a className="text-primary underline">Ver pedido</a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <p className="text-gray-400">Sección en construcción</p>;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="container mx-auto px-6 flex">
        {/* sidebar */}
        <nav className="w-64 pr-6 hidden lg:block">
          <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-serif text-white">Cuenta</h2>
            <ul className="space-y-2">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded ${mode === sec.id ? "bg-primary text-black" : "text-gray-300 hover:bg-white/5"}`}
                    onClick={() => setMode(sec.id)}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* main content */}
        <div className="flex-1 bg-[#0b0b0b] border border-white/5 p-8 rounded-lg">
          <h1 className="text-3xl font-serif text-white mb-4">Mi Perfil</h1>
          {renderContent()}
          {mode === "general" && (
            <section className="mt-8">
              <h2 className="text-xl text-white mb-3">Sesión</h2>
              <div className="flex gap-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-full">Cerrar sesión</button>
                <button className="border border-white/10 px-4 py-2 rounded-full">Eliminar cuenta</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
