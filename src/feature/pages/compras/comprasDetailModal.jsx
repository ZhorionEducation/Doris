import React from 'react'

// Datos de ejemplo de la compra N.º 1 (solo diseño)
const compra = {
  id: 1,
  estado: 'Recibida',
  proveedor: 'Distribuidora Cosmética Andina S.A.S.',
  nit: '900123456-1',
  encargado: 'Camilo Herrera Díaz',
  fecha: '01/11/2026',
  entrega: '04/11/2026',
  bodega: 'Bodega principal',
  observaciones: 'Reposición mensual de cremas y mascarillas.',
}
const productos = [
  { sku: 'CRE-001', nombre: 'Crema hidratante facial 250 ml', cantidad: 20, valor: '$ 28.000', subtotal: '$ 560.000' },
  { sku: 'CRE-002', nombre: 'Mascarilla de arcilla 1 kg', cantidad: 10, valor: '$ 45.000', subtotal: '$ 450.000' },
]

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
)

// Dato con etiqueta arriba y valor abajo
const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

export const ComprasDetailModal = ({ onClose }) => {
  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#3D2C33]/60 p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="compra-titulo"
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#F4D4E0] bg-white text-[15px] text-[#3D2C33] shadow-xl"
      >
        {/* Encabezado */}
        <header className="flex items-start justify-between gap-3 border-b border-[#F4D4E0] p-4 md:p-6">
          <div>
            <p className="text-[13px] text-[#6B5A64]">Detalle de la compra</p>
            <h2 id="compra-titulo" className="flex flex-wrap items-center gap-3 text-xl font-bold md:text-2xl">
              Compra N.º {compra.id}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EA] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F5A43]">
                <IconCheck /> {compra.estado}
              </span>
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" title="Cerrar" className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#3D2C33] hover:bg-[#F4D4E0] ${focus}`}>
            <IconClose />
          </button>
        </header>

        {/* Contenido con desplazamiento */}
        <div className="space-y-6 overflow-y-auto p-4 md:p-6">
          {/* Datos generales */}
          <section aria-label="Datos generales">
            <h3 className="mb-3 text-lg font-semibold">Datos generales</h3>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Dato etiqueta="Proveedor">{compra.proveedor}</Dato>
              <Dato etiqueta="NIT">{compra.nit}</Dato>
              <Dato etiqueta="Encargado">{compra.encargado}</Dato>
              <Dato etiqueta="Bodega de destino">{compra.bodega}</Dato>
              <Dato etiqueta="Fecha de compra">{compra.fecha}</Dato>
              <Dato etiqueta="Fecha de entrega">{compra.entrega}</Dato>
              <div className="sm:col-span-2">
                <Dato etiqueta="Observaciones"><span className="font-normal">{compra.observaciones}</span></Dato>
              </div>
            </dl>
          </section>

          <hr className="border-0 border-t border-[#F4D4E0]" />

          {/* Productos */}
          <section aria-label="Productos de la compra">
            <h3 className="mb-3 text-lg font-semibold">Productos</h3>

            {/* Tabla (pantallas medianas y grandes) */}
            <div className="hidden overflow-x-auto rounded-xl border border-[#F4D4E0] md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#FDF6F8] text-[13px] font-semibold text-[#6B5A64]">
                    <th className="border-b border-[#F4D4E0] px-4 py-3">Producto</th>
                    <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Cantidad</th>
                    <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Costo unitario</th>
                    <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.sku}>
                      <td className="border-b border-[#F4D4E0] px-4 py-3 last:border-0">
                        <span className="font-semibold">{p.nombre}</span>
                        <code className="ml-2 rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{p.sku}</code>
                      </td>
                      <td className="border-b border-[#F4D4E0] px-4 py-3 text-right tabular-nums">{p.cantidad}</td>
                      <td className="border-b border-[#F4D4E0] px-4 py-3 text-right tabular-nums">{p.valor}</td>
                      <td className="border-b border-[#F4D4E0] px-4 py-3 text-right font-semibold tabular-nums">{p.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tarjetas (celular) */}
            <div className="space-y-3 md:hidden">
              {productos.map((p) => (
                <article key={p.sku} className="rounded-xl border border-[#F4D4E0] p-3.5">
                  <p className="mb-2 font-bold">{p.nombre}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    <dt className="text-[#6B5A64]">Código</dt><dd className="text-right">{p.sku}</dd>
                    <dt className="text-[#6B5A64]">Cantidad</dt><dd className="text-right tabular-nums">{p.cantidad}</dd>
                    <dt className="text-[#6B5A64]">Costo unitario</dt><dd className="text-right tabular-nums">{p.valor}</dd>
                    <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">{p.subtotal}</dd>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          {/* Resumen de valores */}
          <section aria-label="Resumen de valores">
            <dl className="ml-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-2">
              <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">$ 1.010.000</dd>
              <dt className="text-[#6B5A64]">IVA (19 %)</dt><dd className="text-right font-semibold tabular-nums">$ 191.900</dd>
              <dt className="mt-1 border-t border-[#F4D4E0] pt-3 text-lg font-bold">Total</dt>
              <dd className="mt-1 border-t border-[#F4D4E0] pt-3 text-right text-lg font-bold tabular-nums text-[#B83A6E]">$ 1.201.900</dd>
            </dl>
          </section>
        </div>

        {/* Botones */}
        <footer className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onClose} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  )
}