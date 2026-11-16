import React from 'react'

// Datos de ejemplo del pedido N.º 3 (los mismos del listado, solo diseño)
const pedido = {
  id: 3,
  estado: 'Venta',
  cliente: 'Juliana Vélez Pineda',
  clienteDoc: '1001234567',
  vendedor: 'Andrés Ríos Londoño',
  vendedorDoc: '1020456789',
  fecha: '10/11/2026',
  direccion: 'Cl 5 Sur #40-8',
  observaciones: 'Pago realizado.',
}
const productos = [
  { codigo: 'AROM-001', nombre: 'Aceite esencial de lavanda 30 ml', cantidad: 2, valor: '$ 34.000', subtotal: '$ 68.000' },
]
const servicios = [
  { codigo: 'SRV-003', nombre: 'Masaje descontracturante', cantidad: 1, valor: '$ 160.000', subtotal: '$ 160.000' },
]

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
)
const IconCash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
)

// Dato con etiqueta arriba y valor abajo
const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

const celda = 'border-b border-[#F4D4E0] px-4 py-3'

// Detalle de productos o de servicios (tabla en escritorio, tarjetas en celular)
const TablaDetalle = ({ titulo, columna, filas }) => (
  <section aria-label={titulo}>
    <h3 className="mb-3 text-lg font-semibold">{titulo}</h3>

    <div className="hidden overflow-x-auto rounded-xl border border-[#F4D4E0] md:block">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#FDF6F8] text-[13px] font-semibold text-[#6B5A64]">
            <th className="border-b border-[#F4D4E0] px-4 py-3">{columna}</th>
            <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Cantidad</th>
            <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Valor unitario</th>
            <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.codigo}>
              <td className={celda}>
                <span className="font-semibold">{f.nombre}</span>
                <code className="ml-2 rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{f.codigo}</code>
              </td>
              <td className={`${celda} text-right tabular-nums`}>{f.cantidad}</td>
              <td className={`${celda} text-right tabular-nums`}>{f.valor}</td>
              <td className={`${celda} text-right font-semibold tabular-nums`}>{f.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="space-y-3 md:hidden">
      {filas.map((f) => (
        <article key={f.codigo} className="rounded-xl border border-[#F4D4E0] p-3.5">
          <p className="mb-2 font-bold">{f.nombre}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-[#6B5A64]">Código</dt><dd className="text-right">{f.codigo}</dd>
            <dt className="text-[#6B5A64]">Cantidad</dt><dd className="text-right tabular-nums">{f.cantidad}</dd>
            <dt className="text-[#6B5A64]">Valor unitario</dt><dd className="text-right tabular-nums">{f.valor}</dd>
            <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">{f.subtotal}</dd>
          </dl>
        </article>
      ))}
    </div>
  </section>
)

export const PedidosDetailModal = ({ onClose }) => {
  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#3D2C33]/60 p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pedido-titulo"
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#F4D4E0] bg-white text-[15px] text-[#3D2C33] shadow-xl"
      >
        {/* Encabezado */}
        <header className="flex items-start justify-between gap-3 border-b border-[#F4D4E0] p-4 md:p-6">
          <div>
            <p className="text-[13px] text-[#6B5A64]">Detalle del pedido</p>
            <h2 id="pedido-titulo" className="flex flex-wrap items-center gap-3 text-xl font-bold md:text-2xl">
              Pedido N.º {pedido.id}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EA] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F5A43]">
                <IconCash /> {pedido.estado}
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
              <Dato etiqueta="Cliente">{pedido.cliente} <span className="font-normal text-[#6B5A64]">· {pedido.clienteDoc}</span></Dato>
              <Dato etiqueta="Vendedor">{pedido.vendedor} <span className="font-normal text-[#6B5A64]">· {pedido.vendedorDoc}</span></Dato>
              <Dato etiqueta="Fecha del pedido">{pedido.fecha}</Dato>
              <Dato etiqueta="Dirección de entrega">{pedido.direccion}</Dato>
              <div className="sm:col-span-2">
                <Dato etiqueta="Observaciones"><span className="font-normal">{pedido.observaciones}</span></Dato>
              </div>
            </dl>
          </section>

          <hr className="border-0 border-t border-[#F4D4E0]" />

          <TablaDetalle titulo="Productos" columna="Producto" filas={productos} />
          <TablaDetalle titulo="Servicios" columna="Servicio" filas={servicios} />

          {/* Resumen de valores */}
          <section aria-label="Resumen de valores">
            <dl className="ml-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-2">
              <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">$ 228.000</dd>
              <dt className="text-[#6B5A64]">IVA (19 %)</dt><dd className="text-right font-semibold tabular-nums">$ 43.320</dd>
              <dt className="mt-1 border-t border-[#F4D4E0] pt-3 text-lg font-bold">Total</dt>
              <dd className="mt-1 border-t border-[#F4D4E0] pt-3 text-right text-lg font-bold tabular-nums text-[#B83A6E]">$ 271.320</dd>
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