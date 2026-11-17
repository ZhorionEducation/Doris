import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

// Datos de ejemplo
const citas = [
  { id: 1, fecha: '01/11/2026', horaInicio: '09:00', horaFin: '10:00', cliente: 'Ana Rodríguez', servicio: 'Limpieza Facial Profunda', profesional: 'Laura Gómez', cabina: 'Cabina 1', estadoCita: 'Confirmada', observaciones: 'Cliente nueva' },
  { id: 2, fecha: '01/11/2026', horaInicio: '10:30', horaFin: '11:30', cliente: 'Carlos Mejía', servicio: 'Masaje Relajante', profesional: 'Camilo Herrera', cabina: 'Cabina 2', estadoCita: 'Pendiente', observaciones: '' },
  { id: 3, fecha: '02/11/2026', horaInicio: '14:00', horaFin: '15:00', cliente: 'María Torres', servicio: 'Manicure Semipermanente', profesional: 'Laura Gómez', cabina: 'Cabina 3', estadoCita: 'Cancelada', observaciones: 'Canceló por enfermedad' },
  { id: 4, fecha: '03/11/2026', horaInicio: '11:00', horaFin: '12:00', cliente: 'Sofía Vargas', servicio: 'Depilación Láser', profesional: 'Juan Pérez', cabina: 'Cabina 1', estadoCita: 'Confirmada', observaciones: 'Segunda sesión' },
  { id: 5, fecha: '04/11/2026', horaInicio: '16:00', horaFin: '17:00', cliente: 'Luis Herrera', servicio: 'Tratamiento Capilar', profesional: 'Camilo Herrera', cabina: 'Cabina 4', estadoCita: 'Pendiente', observaciones: '' },
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

// Estados de la cita
const estados = {
  Confirmada: { clase: 'bg-[#E3F3EA] text-[#1F5A43]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg> },
  Pendiente:  { clase: 'bg-[#FDF1D3] text-[#7A4B00]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg> },
  Cancelada:  { clase: 'bg-[#FCE4E7] text-[#8E1F2B]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg> },
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

const Acciones = ({ size = 'h-9 w-9' }) => (
  <div className="flex gap-2">
    <button type="button" title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" title="Editar"      aria-label="Editar"      className={`${iconBtn} ${size}`}><IconEdit /></button>
    <button type="button" title="Cancelar"    aria-label="Cancelar"    className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

export const Agenda = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Agenda › Gestión de agenda</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Agenda</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Gestiona las citas del spa. Registra fecha, horario, cliente, servicio, profesional y estado de cada cita.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por cliente, servicio o profesional" aria-label="Buscar por cliente, servicio o profesional" className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Confirmada</option>
            <option>Pendiente</option>
            <option>Cancelada</option>
          </select>
          <input type="date" aria-label="Desde" className={control} />
          <input type="date" aria-label="Hasta" className={control} />
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            <IconPlus /> Crear cita
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">N.º</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Fecha</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Hora inicio</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Hora fin</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Cliente</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Servicio</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Profesional</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Cabina</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado de la cita</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Observaciones</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((c) => (
                <tr key={c.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{c.id}</code></td>
                  <td className={celda}>{c.fecha}</td>
                  <td className={celda}>{c.horaInicio}</td>
                  <td className={celda}>{c.horaFin}</td>
                  <td className={`${celda} font-semibold`}>{c.cliente}</td>
                  <td className={celda}>{c.servicio}</td>
                  <td className={celda}>{c.profesional}</td>
                  <td className={celda}>{c.cabina}</td>
                  <td className={celda}><Estado estado={c.estadoCita} /></td>
                  <td className={`${celda} max-w-[180px] truncate text-[#6B5A64]`}>{c.observaciones || '—'}</td>
                  <td className={celda}><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {citas.map((c) => (
            <article key={c.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>Cita N.º {c.id}</span>
                <Estado estado={c.estadoCita} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Fecha</dt><dd className="text-right">{c.fecha}</dd>
                <dt className="text-[#6B5A64]">Horario</dt><dd className="text-right">{c.horaInicio} – {c.horaFin}</dd>
                <dt className="text-[#6B5A64]">Cliente</dt><dd className="text-right font-semibold">{c.cliente}</dd>
                <dt className="text-[#6B5A64]">Servicio</dt><dd className="text-right">{c.servicio}</dd>
                <dt className="text-[#6B5A64]">Profesional</dt><dd className="text-right">{c.profesional}</dd>
                <dt className="text-[#6B5A64]">Cabina</dt><dd className="text-right">{c.cabina}</dd>
                {c.observaciones && <><dt className="text-[#6B5A64]">Observaciones</dt><dd className="text-right text-[#6B5A64]">{c.observaciones}</dd></>}
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>Mostrando 1 a 5 de 24 citas</span>
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
        <Modal title="Crear cita" onClose={() => setIsCreateModalOpen(false)}>
          <div className="space-y-4 p-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Fecha</label>
                <input type="date" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Hora inicio</label>
                <input type="time" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Hora fin</label>
                <input type="time" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Cliente</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar cliente</option>
                  <option>Ana Rodríguez</option>
                  <option>Carlos Mejía</option>
                  <option>María Torres</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Servicio</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar servicio</option>
                  <option>Limpieza Facial Profunda</option>
                  <option>Masaje Relajante</option>
                  <option>Manicure Semipermanente</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Profesional</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar profesional</option>
                  <option>Laura Gómez</option>
                  <option>Camilo Herrera</option>
                  <option>Juan Pérez</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Cabina</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar cabina</option>
                  <option>Cabina 1</option>
                  <option>Cabina 2</option>
                  <option>Cabina 3</option>
                  <option>Cabina 4</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Estado de la cita</label>
                <select className={`w-full ${control}`}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-[#3D2C33]">Observaciones</label>
              <textarea rows={3} placeholder="Observaciones adicionales..." className={`w-full resize-none ${control}`} />
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

