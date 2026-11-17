import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

// Datos de ejemplo
const devoluciones = [
  { id: 1, ventaId: 'VT-0045', usuarioRegistraId: 'Laura Gómez', tipo: 'Devolución', motivo: 'Producto defectuoso', montoReintegrado: '$ 85.000', ajustaStock: 'Sí', fechaRegistro: '02/11/2026', numerDocumentoVenta: 'FAC-0045', productoId: 'Crema Hidratante 200ml', cantidadDevuelta: 1, servicioId: '—', estado: 'Aprobada' },
  { id: 2, ventaId: 'VT-0038', usuarioRegistraId: 'Camilo Herrera', tipo: 'Anulación', motivo: 'Error en facturación', montoReintegrado: '$ 320.000', ajustaStock: 'No', fechaRegistro: '01/11/2026', numerDocumentoVenta: 'FAC-0038', productoId: '—', cantidadDevuelta: 0, servicioId: 'Masaje Relajante', estado: 'Aprobada' },
  { id: 3, ventaId: 'VT-0052', usuarioRegistraId: 'Laura Gómez', tipo: 'Devolución', motivo: 'Cliente insatisfecho', montoReintegrado: '$ 150.000', ajustaStock: 'Sí', fechaRegistro: '05/11/2026', numerDocumentoVenta: 'FAC-0052', productoId: 'Sérum Vitamina C', cantidadDevuelta: 2, servicioId: '—', estado: 'Pendiente' },
  { id: 4, ventaId: 'VT-0061', usuarioRegistraId: 'Camilo Herrera', tipo: 'Anulación', motivo: 'Cancelación a tiempo', montoReintegrado: '$ 200.000', ajustaStock: 'No', fechaRegistro: '08/11/2026', numerDocumentoVenta: 'FAC-0061', productoId: '—', cantidadDevuelta: 0, servicioId: 'Depilación Láser', estado: 'Rechazada' },
]

// Iconos de línea (trazo 1.8, 20 x 20)
const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
)
const IconPlus   = () => <Svg><path d="M12 5v14M5 12h14" /></Svg>
const IconEye    = () => <Svg><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
const IconEdit   = () => <Svg><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></Svg>
const IconTrash  = () => <Svg><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Svg>
const IconSearch = () => <Svg><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Svg>

// Estados
const estados = {
  Aprobada:  { clase: 'bg-[#E3F3EA] text-[#1F5A43]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg> },
  Pendiente: { clase: 'bg-[#FDF1D3] text-[#7A4B00]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg> },
  Rechazada: { clase: 'bg-[#FCE4E7] text-[#8E1F2B]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg> },
}

// Tipos
const tipos = {
  Devolución: 'bg-[#EDE7F6] text-[#4A148C]',
  Anulación:  'bg-[#FBE9E7] text-[#BF360C]',
}

const focus   = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`
const celda   = 'whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3'

const Estado = ({ estado }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${estados[estado].clase}`}>
    {estados[estado].icono} {estado}
  </span>
)

const TipoBadge = ({ tipo }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${tipos[tipo]}`}>
    {tipo}
  </span>
)

const Acciones = ({ size = 'h-9 w-9' }) => (
  <div className="flex gap-2">
    <button type="button" title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" title="Editar"      aria-label="Editar"      className={`${iconBtn} ${size}`}><IconEdit /></button>
    <button type="button" title="Eliminar"    aria-label="Eliminar"    className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

export const DevolucionesAnulaciones = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Ventas › Devoluciones y Anulaciones</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Devoluciones y Anulaciones</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Registra y gestiona las devoluciones de productos y anulaciones de servicios. Controla el monto reintegrado y el ajuste de stock.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por venta, producto o servicio" aria-label="Buscar por venta, producto o servicio" className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por tipo" className={control}>
            <option>Tipo: Todos</option>
            <option>Devolución</option>
            <option>Anulación</option>
          </select>
          <select aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Aprobada</option>
            <option>Pendiente</option>
            <option>Rechazada</option>
          </select>
          <input type="date" aria-label="Desde" className={control} />
          <input type="date" aria-label="Hasta" className={control} />
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            <IconPlus /> Registrar devolución
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">ID</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Venta ID</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Usuario registra</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Tipo</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Motivo</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3 text-right">Monto reintegrado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Ajusta stock</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Fecha registro</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">N.º doc. venta</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Producto ID</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Cant. devuelta</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Servicio ID</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {devoluciones.map((d) => (
                <tr key={d.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{d.id}</code></td>
                  <td className={`${celda} font-semibold`}>{d.ventaId}</td>
                  <td className={celda}>{d.usuarioRegistraId}</td>
                  <td className={celda}><TipoBadge tipo={d.tipo} /></td>
                  <td className={`${celda} max-w-[160px] truncate`}>{d.motivo}</td>
                  <td className={`${celda} text-right font-semibold tabular-nums`}>{d.montoReintegrado}</td>
                  <td className={celda}>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${d.ajustaStock === 'Sí' ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#F4F4F5] text-[#6B5A64]'}`}>
                      {d.ajustaStock}
                    </span>
                  </td>
                  <td className={celda}>{d.fechaRegistro}</td>
                  <td className={celda}>{d.numerDocumentoVenta}</td>
                  <td className={celda}>{d.productoId}</td>
                  <td className={`${celda} text-center`}>{d.cantidadDevuelta || '—'}</td>
                  <td className={celda}>{d.servicioId}</td>
                  <td className={celda}><Estado estado={d.estado} /></td>
                  <td className={celda}><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {devoluciones.map((d) => (
            <article key={d.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>{d.ventaId}</span>
                <Estado estado={d.estado} />
              </header>
              <div className="mb-2">
                <TipoBadge tipo={d.tipo} />
              </div>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Usuario</dt><dd className="text-right">{d.usuarioRegistraId}</dd>
                <dt className="text-[#6B5A64]">Motivo</dt><dd className="text-right">{d.motivo}</dd>
                <dt className="text-[#6B5A64]">Monto</dt><dd className="text-right font-semibold tabular-nums">{d.montoReintegrado}</dd>
                <dt className="text-[#6B5A64]">Ajusta stock</dt><dd className="text-right">{d.ajustaStock}</dd>
                <dt className="text-[#6B5A64]">Fecha</dt><dd className="text-right">{d.fechaRegistro}</dd>
                <dt className="text-[#6B5A64]">N.º doc. venta</dt><dd className="text-right">{d.numerDocumentoVenta}</dd>
                {d.productoId !== '—' && <><dt className="text-[#6B5A64]">Producto</dt><dd className="text-right">{d.productoId}</dd></>}
                {d.servicioId !== '—' && <><dt className="text-[#6B5A64]">Servicio</dt><dd className="text-right">{d.servicioId}</dd></>}
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>Mostrando 1 a 4 de 16 registros</span>
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
        <Modal title="Registrar devolución / anulación" onClose={() => setIsCreateModalOpen(false)}>
          <div className="space-y-4 p-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Venta ID</label>
                <input type="text" placeholder="Ej: VT-0045" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">N.º documento venta</label>
                <input type="text" placeholder="Ej: FAC-0045" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Tipo</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar</option>
                  <option value="Devolución">Devolución</option>
                  <option value="Anulación">Anulación</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Monto reintegrado</label>
                <input type="number" placeholder="$ 0.00" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Producto ID</label>
                <select className={`w-full ${control}`}>
                  <option value="">Sin producto</option>
                  <option>Crema Hidratante 200ml</option>
                  <option>Sérum Vitamina C</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Cantidad devuelta</label>
                <input type="number" min="0" placeholder="0" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Servicio ID</label>
                <select className={`w-full ${control}`}>
                  <option value="">Sin servicio</option>
                  <option>Masaje Relajante</option>
                  <option>Depilación Láser</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Ajusta stock</label>
                <select className={`w-full ${control}`}>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Fecha de registro</label>
                <input type="date" className={`w-full ${control}`} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-[#3D2C33]">Motivo</label>
              <textarea rows={3} placeholder="Describe el motivo de la devolución o anulación..." className={`w-full resize-none ${control}`} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className={`rounded-[10px] border border-[#D9BCC8] px-4 py-2.5 text-sm font-semibold text-[#3D2C33] hover:bg-[#FDF6F8] ${focus}`}>
                Cancelar
              </button>
              <button type="button" className={`rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
                Guardar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}

