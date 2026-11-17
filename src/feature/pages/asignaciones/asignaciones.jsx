import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import AsignacionForm from './asignacionesForm'

const asignaciones = [
  { id: 1, servicio: 'Alisado de Keratina', empleado: 'Camila Restrepo', turno: 'Mañana (8:00 AM - 2:00 PM)', fecha: '2026-11-18', observaciones: 'Cabina 2 asignada', estado: 'Activo' },
  { id: 2, servicio: 'Limpieza Facial Profunda', empleado: 'Valentina Ríos', turno: 'Tarde (2:00 PM - 8:00 PM)', fecha: '2026-11-18', observaciones: 'Requiere vaporizador', estado: 'Activo' },
  { id: 3, servicio: 'Masaje Relajante Corporal', empleado: 'Andrés Morales', turno: 'Mañana (8:00 AM - 2:00 PM)', fecha: '2026-11-19', observaciones: 'Suplencia de turno', estado: 'Inactivo' },
]

const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>
)
const IconPlus = () => <Svg><path d="M12 5v14M5 12h14" /></Svg>
const IconEye = () => <Svg><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
const IconEdit = () => <Svg><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></Svg>
const IconTrash = () => <Svg><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Svg>
const IconSearch = () => <Svg><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Svg>

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`
const celda = 'border-b border-[#F4D4E0] px-4 py-3'

const Acciones = ({ size = 'h-9 w-9' }) => (
  <div className="flex gap-2">
    <button type="button" title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" title="Editar" aria-label="Editar" className={`${iconBtn} ${size}`}><IconEdit /></button>
    <button type="button" title="Eliminar" aria-label="Eliminar" className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

const BadgeEstado = ({ estado }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
    estado === 'Activo' ? 'bg-[#F4D4E0] text-[#B83A6E]' : 'bg-[#EFE9EC] text-[#6B5A64]'
  }`}>
    {estado}
  </span>
)

export const Asignaciones = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 p-4 text-[15px] text-[#3D2C33] md:p-6">
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Servicios › Asignación de empleados</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Asignación de empleados</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">Administra los turnos y servicios asignados a cada profesional del centro.</p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por servicio, empleado o turno" aria-label="Buscar por servicio, empleado o turno" className={`w-full pl-10 ${control}`} />
          </div>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconPlus /> Crear asignación
          </button>
        </div>

        {/* Vista Escritorio */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className={celda}>ID</th>
                <th className={celda}>Servicio</th>
                <th className={celda}>Empleado / Profesional</th>
                <th className={celda}>Turno</th>
                <th className={celda}>Fecha asignación</th>
                <th className={celda}>Observaciones</th>
                <th className={celda}>Estado</th>
                <th className={celda}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asig) => (
                <tr key={asig.id} className="hover:bg-[#FDF6F8]">
                  <td className={`${celda} whitespace-nowrap`}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{asig.id}</code></td>
                  <td className={`${celda} whitespace-nowrap font-semibold`}>{asig.servicio}</td>
                  <td className={`${celda} whitespace-nowrap text-[#6B5A64]`}>{asig.empleado}</td>
                  <td className={`${celda} whitespace-nowrap text-[#6B5A64]`}>{asig.turno}</td>
                  <td className={`${celda} whitespace-nowrap text-[#6B5A64]`}>{asig.fecha}</td>
                  <td className={`${celda} text-[#6B5A64]`}>{asig.observaciones}</td>
                  <td className={`${celda} whitespace-nowrap`}><BadgeEstado estado={asig.estado} /></td>
                  <td className={`${celda} whitespace-nowrap`}><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista Mobile */}
        <div className="space-y-3 p-3 md:hidden">
          {asignaciones.map((asig) => (
            <article key={asig.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-1 flex items-center justify-between gap-2 font-bold">
                <span>{asig.servicio}</span>
                <code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-xs">{asig.id}</code>
              </header>
              <p className="text-sm font-medium text-[#3D2C33]">{asig.empleado}</p>
              <p className="mt-1 text-xs text-[#6B5A64]">{asig.turno} · {asig.fecha}</p>
              <p className="mb-2 mt-1 text-sm text-[#6B5A64]">{asig.observaciones}</p>
              <div className="mb-3"><BadgeEstado estado={asig.estado} /></div>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <Modal title="Crear asignación de empleado" onClose={() => setIsCreateModalOpen(false)}>
          <AsignacionForm
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      )}
    </section>
  )
}