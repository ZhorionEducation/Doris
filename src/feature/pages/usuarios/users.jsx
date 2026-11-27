import { useState, useEffect } from 'react'
import Modal from '../../../routers/utils/modal'
import UserForm from './usersForm'
import { UsersDetailModal } from './usersDetailModal'
import UserEdit from './usersEditModal'
import axios from 'axios'

const estaActivo = (estado) => {
  if (typeof estado === 'boolean') return estado
  if (typeof estado === 'number') return estado === 1

  const valor = String(estado ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return ['activo', '1', 'true', 'si', 'enabled', 'active'].includes(valor)
}

const fetchUsuarios = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users?page=${page}&limit=10`
    );

    return {
      usuarios: response.data.data.map((usuario) => ({
        documento: usuario.numero_documento,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol_codigo,
        alergia: usuario.alergias,
        activo: estaActivo(usuario.estado)
      })),
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error(
      "Error fetching usuarios:",
      error.response?.data || error.message
    );

    return {
      usuarios: [],
      pagination: null
    };
  }
};





// Datos de ejemplo: solo para que el diseño se vea con información

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
const IconReport = () => <Svg><path d="M4 4h16v16H4z" /><path d="M8 2v4M16 2v4M4 8h16" /></Svg>

// Clases que se repiten
const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`

const Estado = ({ activo }) =>
  estaActivo(activo) ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EA] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F5A43]">
      <IconOk /> Activo
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D4E0] px-2.5 py-0.5 text-[13px] font-semibold text-[#6B5A64]">
      <IconOff /> Inactivo
    </span>
  )

// Botones de acciones (ver, editar, eliminar). size cambia entre escritorio y celular
const Acciones = ({ size = 'h-9 w-9', onView, onEdit }) => (
  <div className="flex gap-2">
    <button type="button" onClick={onView} title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" onClick={onEdit} title="Editar" aria-label="Editar" className={`${iconBtn} ${size}`}><IconEdit /></button>
    {/* <button type="button" title="Eliminar" aria-label="Eliminar" className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button> */}
  </div>
)

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  const [usuarios, setUsuarios] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { usuarios: usuariosData, pagination: paginationData } =
        await fetchUsuarios(currentPage);

      setUsuarios(usuariosData);
      setPagination(paginationData);
    };
    fetchData();
  }, [currentPage]);

  return (
    <section className="mx-auto max-w-[1800px] space-y-6 px-6 py-8 text-[15px] text-[#3D2C33] md:px-10 md:py-10">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de usuarios</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra las cuentas del personal y de los clientes.
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
          <button type="button" className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconReport /> Generar reporte
          </button>
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
                  
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">{u.rol}</td>
                 
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <Estado activo={u.activo} />
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3"><Acciones onView={() => setActiveModal('detail')} onEdit={() => setActiveModal('edit')} /></td>
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
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Documento</dt><dd className="text-right">{u.documento}</dd>
                <dt className="text-[#6B5A64]">Correo</dt><dd className="break-all text-right">{u.email}</dd>
                <dt className="text-[#6B5A64]">Teléfono</dt><dd className="text-right">{u.telefono}</dd>
                <dt className="text-[#6B5A64]">Rol</dt><dd className="text-right">{u.rol}</dd>
                <dt className="text-[#6B5A64]">Alergia</dt><dd className="text-right">{u.alergia}</dd>
                <dt className="text-[#6B5A64]">Estado</dt>
                <dd className="text-right"><Estado activo={u.activo} /></dd>
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" onView={() => setActiveModal('detail')} onEdit={() => setActiveModal('edit')} /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>
            {pagination
              ? `Mostrando página ${pagination.page} de ${pagination.totalPages} (${pagination.total} usuarios)`
              : 'No hay información de paginación'}
          </span>
          <div className="flex gap-1">
            <button type="button" disabled={!pagination || currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Página anterior" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold disabled:opacity-45 ${focus}`}>‹</button>
            {pagination && Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`h-9 min-w-9 rounded-[10px] border ${currentPage === page ? 'border-[#B83A6E] bg-[#B83A6E] text-white' : 'border-[#F4D4E0] bg-white text-[#3D2C33] hover:bg-[#F4D4E0]'} font-semibold ${focus}`}
              >
                {page}
              </button>
            ))}
            <button type="button" disabled={!pagination || currentPage === pagination.totalPages} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Página siguiente" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold disabled:opacity-45 ${focus}`}>›</button>
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
      {activeModal === 'detail' && <UsersDetailModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'edit' && (
        <Modal title="Editar usuario" onClose={() => setActiveModal(null)}>
          <UserEdit onCancel={() => setActiveModal(null)} onSaved={() => setActiveModal(null)} />
        </Modal>
      )}
    </section>
  )
}

export default Users