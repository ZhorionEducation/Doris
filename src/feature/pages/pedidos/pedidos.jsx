import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import { PedidoForm } from './pedidosForm'

// Datos de ejemplo: solo para que el diseño se vea con información
const pedidos = [
  { id: 1, fecha: '05/11/2026', cliente: 'Sebastián Muñoz Osorio', vendedor: 'Andrés Ríos Londoño', total: '$ 230.860', estado: 'Pendiente' },
  { id: 2, fecha: '07/11/2026', cliente: 'Daniela Cárdenas Mejía', vendedor: 'Marcela Torres Salazar', total: '$ 214.200', estado: 'Confirmado' },
  { id: 3, fecha: '10/11/2026', cliente: 'Juliana Vélez Pineda', vendedor: 'Andrés Ríos Londoño', total: '$ 271.320', estado: 'Venta' },
  { id: 4, fecha: '14/11/2026', cliente: 'Sebastián Muñoz Osorio', vendedor: 'Marcela Torres Salazar', total: '$ 261.800', estado: 'Pendiente' },
  { id: 5, fecha: '18/11/2026', cliente: 'Daniela Cárdenas Mejía', vendedor: 'Andrés Ríos Londoño', total: '$ 252.280', estado: 'Anulado' },
]

// Iconos de línea (trazo 1.8, 20 x 20)
const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
)
const IconPlus = () => <Svg><path d="M12 5v14M5 12h14" /></Svg>
const IconEye = () => <Svg><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
const IconEdit = () => <Svg><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></Svg>
const IconTrash = () => <Svg><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Svg>
const IconSearch = () => <Svg><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Svg>

// Estados: color + icono + texto
const estados = {
  Pendiente: { clase: 'bg-[#FDF1D3] text-[#7A4B00]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg> },
  Confirmado: { clase: 'bg-[#E3EFF9] text-[#1F4E79]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg> },
  Venta: { clase: 'bg-[#E3F3EA] text-[#1F5A43]', icono: <Svg className="h-3.5 w-3.5"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></Svg> },
  Anulado: { clase: 'bg-[#FCE4E7] text-[#8E1F2B]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg> },
}

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`
const celda = 'whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3'

const Estado = ({ estado }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${estados[estado].clase}`}>
    {estados[estado].icono} {estado}
  </span>
)

// Acciones: ver, editar y anular. size cambia entre escritorio y celular
const Acciones = ({ size = 'h-9 w-9' }) => (
  <div className="flex gap-2">
    <button type="button" title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" title="Editar" aria-label="Editar" className={`${iconBtn} ${size}`}><IconEdit /></button>
    <button type="button" title="Anular" aria-label="Anular" className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

export const Pedidos = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Ventas › Gestión de pedidos</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de pedidos</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Consulta los pedidos de productos y servicios. Un pedido pasa de Pendiente a Confirmado y luego a Venta, o puede quedar Anulado.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por cliente o vendedor" aria-label="Buscar por cliente o vendedor" className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Pendiente</option>
            <option>Confirmado</option>
            <option>Venta</option>
            <option>Anulado</option>
          </select>
          <input type="date" aria-label="Desde" className={control} />
          <input type="date" aria-label="Hasta" className={control} />
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconPlus /> Crear pedido
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">N.º</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Fecha</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Cliente</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Vendedor</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Total</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{p.id}</code></td>
                  <td className={celda}>{p.fecha}</td>
                  <td className={`${celda} font-semibold`}>{p.cliente}</td>
                  <td className={celda}>{p.vendedor}</td>
                  <td className={`${celda} text-right font-semibold tabular-nums`}>{p.total}</td>
                  <td className={celda}><Estado estado={p.estado} /></td>
                  <td className={celda}><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {pedidos.map((p) => (
            <article key={p.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>Pedido N.º {p.id}</span>
                <Estado estado={p.estado} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Fecha</dt><dd className="text-right">{p.fecha}</dd>
                <dt className="text-[#6B5A64]">Cliente</dt><dd className="text-right">{p.cliente}</dd>
                <dt className="text-[#6B5A64]">Vendedor</dt><dd className="text-right">{p.vendedor}</dd>
                <dt className="text-[#6B5A64]">Total</dt><dd className="text-right font-semibold tabular-nums">{p.total}</dd>
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>Mostrando 1 a 5 de 32 pedidos</span>
          <div className="flex gap-1">
            <button type="button" disabled aria-label="Página anterior" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold opacity-45 ${focus}`}>‹</button>
            <button type="button" aria-current="page" className={`h-9 min-w-9 rounded-[10px] border border-[#B83A6E] bg-[#B83A6E] font-semibold text-white ${focus}`}>1</button>
            <button type="button" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold text-[#3D2C33] hover:bg-[#F4D4E0] ${focus}`}>2</button>
            <button type="button" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold text-[#3D2C33] hover:bg-[#F4D4E0] ${focus}`}>3</button>
            <button type="button" aria-label="Página siguiente" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold text-[#3D2C33] hover:bg-[#F4D4E0] ${focus}`}>›</button>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <Modal title="Crear pedido" onClose={() => setIsCreateModalOpen(false)}>
          <PedidoForm
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      )}
    </section>
  )
}