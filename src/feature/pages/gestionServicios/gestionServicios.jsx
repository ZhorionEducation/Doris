import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import GestionServiciosForm from './gestionServiciosForm'
import { GestionServiciosDetailModal } from './gestionServiciosDetailModal'
import { GestionServiciosEditModal } from './gestionServiciosEditModal'

const categoriasDisponibles = [
  'Facial',
  'Corporal',
  'Masajes',
  'Manicure y pedicure',
]

const serviciosEjemplo = [
  {
    id: 1,
    codigo: 'SRV-001',
    nombre: 'Limpieza facial profunda',
    categoria: 'Facial',
    duracion: 60,
    precioBase: 95000,
    descuento: 10,
    descripcion: 'Limpieza facial profunda con productos especializados.',
  },
  {
    id: 2,
    codigo: 'SRV-002',
    nombre: 'Masaje relajante',
    categoria: 'Masajes',
    duracion: 60,
    precioBase: 120000,
    descuento: 0,
    descripcion: 'Masaje corporal para relajación y bienestar.',
  },
  {
    id: 3,
    codigo: 'SRV-003',
    nombre: 'Manicure tradicional',
    categoria: 'Manicure y pedicure',
    duracion: 45,
    precioBase: 45000,
    descuento: 5,
    descripcion: 'Limado, cuidado de uñas y aplicación de esmalte.',
  },
]

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`

const celda = 'border-b border-[#F4D4E0] px-4 py-3 align-top'

const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor)

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

export const GestionServicios = () => {
  const [servicios, setServicios] = useState(serviciosEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [modalActivo, setModalActivo] = useState(null)

  const busquedaNormalizada = busqueda.trim().toLowerCase()

  const serviciosFiltrados = servicios.filter((servicio) => {
    const textoServicio = [
      servicio.codigo,
      servicio.nombre,
      servicio.categoria,
      servicio.descripcion,
    ]
      .join(' ')
      .toLowerCase()

    const coincideTexto = textoServicio.includes(busquedaNormalizada)
    const coincideCategoria =
      categoriaFiltro === 'Todas' || servicio.categoria === categoriaFiltro

    return coincideTexto && coincideCategoria
  })

  const agregarServicio = (nuevoServicio) => {
    setServicios((actuales) => [
      ...actuales,
      {
        id: Math.max(0, ...actuales.map((servicio) => servicio.id)) + 1,
        ...nuevoServicio,
      },
    ])
    setIsCreateModalOpen(false)
  }

  const abrirModalAccion = (tipo, servicio) => {
    setServicioSeleccionado(servicio)
    setModalActivo(tipo)
  }

  const cerrarModalAccion = () => {
    setModalActivo(null)
    setServicioSeleccionado(null)
  }

  const actualizarServicio = (servicioActualizado) => {
    setServicios((actuales) =>
      actuales.map((servicio) =>
        servicio.id === servicioActualizado.id ? servicioActualizado : servicio
      )
    )
    cerrarModalAccion()
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">
          Inicio › Servicios › Gestión de servicios
        </p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">
          Gestión de servicios
        </h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Consulta y administra los servicios ofrecidos.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por código, nombre o categoría"
            aria-label="Buscar servicios"
            className={`min-w-[200px] flex-1 ${control}`}
          />

          <select
            value={categoriaFiltro}
            onChange={(event) => setCategoriaFiltro(event.target.value)}
            aria-label="Filtrar por categoría"
            className={control}
          >
            <option>Todas</option>
            {categoriasDisponibles.map((categoria) => (
              <option key={categoria}>{categoria}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            + Crear servicio
          </button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className={celda}>Código</th>
                <th className={celda}>Nombre</th>
                <th className={celda}>Categoría</th>
                <th className={celda}>Duración</th>
                <th className={`${celda} text-right`}>Precio base</th>
                <th className={celda}>Descuento</th>
                <th className={celda}>Descripción</th>
                <th className={celda}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {serviciosFiltrados.map((servicio) => (
                <tr key={servicio.id} className="hover:bg-[#FDF6F8]">
                  <td className={`${celda} whitespace-nowrap`}>
                    <code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">
                      {servicio.codigo}
                    </code>
                  </td>
                  <td className={`${celda} min-w-[160px] font-semibold`}>
                    {servicio.nombre}
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>{servicio.categoria}</td>
                  <td className={`${celda} whitespace-nowrap`}>
                    {servicio.duracion} min
                  </td>
                  <td className={`${celda} whitespace-nowrap text-right font-semibold tabular-nums`}>
                    {formatoPrecio(servicio.precioBase)}
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>
                    {servicio.descuento} %
                  </td>
                  <td className={`${celda} min-w-[200px]`}>
                    {servicio.descripcion || '—'}
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>
                    <Acciones
                      onView={() => abrirModalAccion('detail', servicio)}
                      onEdit={() => abrirModalAccion('edit', servicio)}
                    />
                  </td>
                </tr>
              ))}
              {serviciosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-[#6B5A64]">
                    No se encontraron servicios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {serviciosFiltrados.map((servicio) => (
            <article
              key={servicio.id}
              className="rounded-xl border border-[#F4D4E0] p-3.5"
            >
              <header className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold">{servicio.nombre}</h2>
                  <code className="font-mono text-[13px] text-[#6B5A64]">
                    {servicio.codigo}
                  </code>
                </div>
                <span className="rounded-full bg-[#F9E8EE] px-2.5 py-0.5 text-sm">
                  {servicio.categoria}
                </span>
              </header>

              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Duración</dt>
                <dd className="text-right">{servicio.duracion} min</dd>
                <dt className="text-[#6B5A64]">Precio base</dt>
                <dd className="text-right font-semibold tabular-nums">
                  {formatoPrecio(servicio.precioBase)}
                </dd>
                <dt className="text-[#6B5A64]">Descuento</dt>
                <dd className="text-right">{servicio.descuento} %</dd>
              </dl>

              <p className="mb-3 text-sm text-[#6B5A64]">
                {servicio.descripcion || 'Sin descripción'}
              </p>

              <Acciones
                onView={() => abrirModalAccion('detail', servicio)}
                onEdit={() => abrirModalAccion('edit', servicio)}
              />
            </article>
          ))}
          {serviciosFiltrados.length === 0 && (
            <p className="py-6 text-center text-[#6B5A64]">
              No se encontraron servicios.
            </p>
          )}
        </div>

        <p className="p-4 text-sm text-[#6B5A64]" aria-live="polite">
          {serviciosFiltrados.length}{' '}
          {serviciosFiltrados.length === 1 ? 'servicio' : 'servicios'}
        </p>
      </div>

      {isCreateModalOpen && (
        <Modal title="Crear servicio" onClose={() => setIsCreateModalOpen(false)}>
          <GestionServiciosForm
            categoriasDisponibles={categoriasDisponibles}
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={agregarServicio}
          />
        </Modal>
      )}

      {modalActivo === 'detail' && servicioSeleccionado && (
        <GestionServiciosDetailModal
          servicio={servicioSeleccionado}
          onClose={cerrarModalAccion}
        />
      )}

      {modalActivo === 'edit' && servicioSeleccionado && (
        <GestionServiciosEditModal
          servicio={servicioSeleccionado}
          categoriasDisponibles={categoriasDisponibles}
          onClose={cerrarModalAccion}
          onSaved={actualizarServicio}
        />
      )}
    </section>
  )
}

export default GestionServicios