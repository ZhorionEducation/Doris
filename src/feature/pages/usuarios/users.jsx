import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import UserForm from './usersForm'

// Datos de ejemplo: solo para que el diseño se vea con información
const usuarios = [
  { documento: '43215678', nombres: 'Laura', apellidos: 'Gómez Restrepo', email: 'laura.gomez@doris.com', telefono: '3104567890', rol: 'Administrador', activo: true },
  { documento: '1020456789', nombres: 'Andrés', apellidos: 'Ríos Londoño', email: 'andres.rios@doris.com', telefono: '3115678901', rol: 'Vendedor', activo: true },
  { documento: '1036789012', nombres: 'Marcela', apellidos: 'Torres Salazar', email: 'marcela.torres@doris.com', telefono: '3126789012', rol: 'Vendedor', activo: false },
  { documento: '71654321', nombres: 'Camilo', apellidos: 'Herrera Díaz', email: 'camilo.herrera@doris.com', telefono: '3137890123', rol: 'Auxiliar de compras', activo: true },
  { documento: '1017890123', nombres: 'Sebastián', apellidos: 'Muñoz Osorio', email: 'sebastian.munoz@gmail.com', telefono: '3148901234', rol: 'Cliente', activo: true },
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
const IconOk = () => <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg>
const IconOff = () => <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg>

// Clases que se repiten
const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`

const Estado = ({ activo }) =>
  activo ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EA] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F5A43]">
      <IconOk /> Activo
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D4E0] px-2.5 py-0.5 text-[13px] font-semibold text-[#6B5A64]">
      <IconOff /> Inactivo
    </span>
  )

// Botones de acciones (ver, editar, eliminar). size cambia entre escritorio y celular
const Acciones = ({ size = 'h-9 w-9' }) => (
  <div className="flex gap-2">
    <button type="button" title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" title="Editar" aria-label="Editar" className={`${iconBtn} ${size}`}><IconEdit /></button>
    <button type="button" title="Eliminar" aria-label="Eliminar" className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Usuarios › Gestión de usuarios</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de usuarios</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra las cuentas del personal y de los clientes. El rol define qué puede hacer cada persona.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por nombre o documento" aria-label="Buscar por nombre o documento" className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por rol" className={control}>
            <option>Rol: Todos</option>
            <option>Administrador</option>
            <option>Vendedor</option>
            <option>Auxiliar de compras</option>
            <option>Esteticista</option>
            <option>Cliente</option>
          </select>
          <select aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconPlus /> Crear usuario
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">Documento</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Nombre</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Correo</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Teléfono</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Rol</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.documento} className="hover:bg-[#FDF6F8]">
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{u.documento}</code>
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3 font-semibold">{u.nombres} {u.apellidos}</td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">{u.email}</td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">{u.telefono}</td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">{u.rol}</td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3"><Estado activo={u.activo} /></td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3"><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {usuarios.map((u) => (
            <article key={u.documento} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>{u.nombres} {u.apellidos}</span>
                <Estado activo={u.activo} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Documento</dt><dd className="text-right">{u.documento}</dd>
                <dt className="text-[#6B5A64]">Correo</dt><dd className="break-all text-right">{u.email}</dd>
                <dt className="text-[#6B5A64]">Teléfono</dt><dd className="text-right">{u.telefono}</dd>
                <dt className="text-[#6B5A64]">Rol</dt><dd className="text-right">{u.rol}</dd>
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>Mostrando 1 a 5 de 24 usuarios</span>
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
        <Modal title="Crear usuario" onClose={() => setIsCreateModalOpen(false)}>
          <UserForm
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      )}
    </section>
  )
}

export default Users