import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import RolesForm from './rolesForm'
import { RolesDetailModal } from './rolesDetailModal'
import { RolesEditModal } from './rolesEditModal'

const permisosDisponibles = [
  'Permisos',
  'Gestión de Usuarios',
  'Ficha Técnica',
  'Gestión de Pedidos',
  'Gestión de Compras',
]

const rolesEjemplo = [
  {
    id: 1,
    codigo: 'ROL-001',
    nombre: 'Administrador',
    descripcion: 'Acceso a la administración del sistema.',
    activo: true,
    permisosAsignados: [...permisosDisponibles],
  },
  {
    id: 2,
    codigo: 'ROL-002',
    nombre: 'Gerente',
    descripcion: 'Administra las operaciones del negocio.',
    activo: true,
    permisosAsignados: ['Gestión de Pedidos', 'Gestión de Compras'],
  },
  {
    id: 3,
    codigo: 'ROL-003',
    nombre: 'Vendedor',
    descripcion: 'Gestiona la atención y las ventas a clientes.',
    activo: true,
    permisosAsignados: ['Gestión de Pedidos'],
  },
  {
    id: 4,
    codigo: 'ROL-004',
    nombre: 'Auxiliar de compras',
    descripcion: 'Apoya la gestión de compras.',
    activo: false,
    permisosAsignados: ['Gestión de Compras'],
  },
]

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`

const Estado = ({ activo }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
      activo ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#F4D4E0] text-[#6B5A64]'
    }`}
  >
    {activo ? 'Activo' : 'Inactivo'}
  </span>
)

const PermisosAsignados = ({ permisos }) => (
  <div className="flex flex-wrap gap-1.5">
    {permisos.length > 0 ? (
      permisos.map((permiso) => (
        <span
          key={permiso}
          className="rounded-md bg-[#F9E8EE] px-2 py-0.5 text-[13px] text-[#3D2C33]"
        >
          {permiso}
        </span>
      ))
    ) : (
      <span className="text-sm text-[#6B5A64]">Sin permisos asignados</span>
    )}
  </div>
)

const Acciones = ({ onView, onEdit }) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={onView}
      className={`rounded-[10px] border border-[#F4D4E0] bg-white px-3 py-2 text-sm hover:bg-[#F4D4E0] ${focus}`}
    >
      Ver
    </button>
    <button
      type="button"
      onClick={onEdit}
      className={`rounded-[10px] border border-[#F4D4E0] bg-white px-3 py-2 text-sm hover:bg-[#F4D4E0] ${focus}`}
    >
      Editar
    </button>
  </div>
)

export const Roles = () => {
  const [roles, setRoles] = useState(rolesEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('Todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [rolSeleccionado, setRolSeleccionado] = useState(null)
  const [modalActivo, setModalActivo] = useState(null)

  const busquedaNormalizada = busqueda.trim().toLowerCase()

  const rolesFiltrados = roles.filter((rol) => {
    const textoRol = [
      rol.codigo,
      rol.nombre,
      rol.descripcion,
      ...rol.permisosAsignados,
    ]
      .join(' ')
      .toLowerCase()

    const coincideTexto = textoRol.includes(busquedaNormalizada)
    const coincideEstado =
      estadoFiltro === 'Todos' ||
      (estadoFiltro === 'Activos' && rol.activo) ||
      (estadoFiltro === 'Inactivos' && !rol.activo)

    return coincideTexto && coincideEstado
  })

  const agregarRol = (nuevoRol) => {
    setRoles((actuales) => [
      ...actuales,
      {
        id: Math.max(0, ...actuales.map((rol) => rol.id)) + 1,
        ...nuevoRol,
      },
    ])
    setIsCreateModalOpen(false)
  }

  const abrirModalAccion = (tipo, rol) => {
    setRolSeleccionado(rol)
    setModalActivo(tipo)
  }

  const cerrarModalAccion = () => {
    setModalActivo(null)
    setRolSeleccionado(null)
  }

  const actualizarRol = (rolActualizado) => {
    setRoles((actuales) =>
      actuales.map((rol) =>
        rol.id === rolActualizado.id ? rolActualizado : rol
      )
    )
    cerrarModalAccion()
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Configuración › Roles</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Roles</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra los roles y los permisos asignados a cada uno.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por código, nombre o permiso"
            aria-label="Buscar roles"
            className={`min-w-[200px] flex-1 ${control}`}
          />

          <select
            value={estadoFiltro}
            onChange={(event) => setEstadoFiltro(event.target.value)}
            aria-label="Filtrar por estado"
            className={control}
          >
            <option>Todos</option>
            <option>Activos</option>
            <option>Inactivos</option>
          </select>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            + Crear rol
          </button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">Código</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Nombre</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Descripción</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Permisos asignados</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rolesFiltrados.map((rol) => (
                <tr key={rol.id} className="hover:bg-[#FDF6F8]">
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">
                      {rol.codigo}
                    </code>
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3 font-semibold">
                    {rol.nombre}
                  </td>
                  <td className="min-w-[180px] border-b border-[#F4D4E0] px-4 py-3">
                    {rol.descripcion || '—'}
                  </td>
                  <td className="min-w-[220px] border-b border-[#F4D4E0] px-4 py-3">
                    <PermisosAsignados permisos={rol.permisosAsignados} />
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <Estado activo={rol.activo} />
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <Acciones
                      onView={() => abrirModalAccion('detail', rol)}
                      onEdit={() => abrirModalAccion('edit', rol)}
                    />
                  </td>
                </tr>
              ))}
              {rolesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-[#6B5A64]">
                    No se encontraron roles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {rolesFiltrados.map((rol) => (
            <article
              key={rol.id}
              className="rounded-xl border border-[#F4D4E0] p-3.5"
            >
              <header className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold">{rol.nombre}</h2>
                  <code className="font-mono text-[13px] text-[#6B5A64]">
                    {rol.codigo}
                  </code>
                </div>
                <Estado activo={rol.activo} />
              </header>

              <p className="mb-3 text-sm text-[#6B5A64]">
                {rol.descripcion || 'Sin descripción'}
              </p>

              <div className="mb-3">
                <p className="mb-1 text-[13px] text-[#6B5A64]">Permisos asignados</p>
                <PermisosAsignados permisos={rol.permisosAsignados} />
              </div>

              <Acciones
                onView={() => abrirModalAccion('detail', rol)}
                onEdit={() => abrirModalAccion('edit', rol)}
              />
            </article>
          ))}
          {rolesFiltrados.length === 0 && (
            <p className="py-6 text-center text-[#6B5A64]">
              No se encontraron roles.
            </p>
          )}
        </div>

        <p className="p-4 text-sm text-[#6B5A64]" aria-live="polite">
          {rolesFiltrados.length} {rolesFiltrados.length === 1 ? 'rol' : 'roles'}
        </p>
      </div>

      {isCreateModalOpen && (
        <Modal title="Crear rol" onClose={() => setIsCreateModalOpen(false)}>
          <RolesForm
            permisosDisponibles={permisosDisponibles}
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={agregarRol}
          />
        </Modal>
      )}

      {modalActivo === 'detail' && rolSeleccionado && (
        <RolesDetailModal rol={rolSeleccionado} onClose={cerrarModalAccion} />
      )}

      {modalActivo === 'edit' && rolSeleccionado && (
        <RolesEditModal
          rol={rolSeleccionado}
          permisosDisponibles={permisosDisponibles}
          onClose={cerrarModalAccion}
          onSaved={actualizarRol}
        />
      )}
    </section>
  )
}

export default Roles