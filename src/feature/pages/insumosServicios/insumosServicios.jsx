import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import InsumosServiciosForm from './insumosServiciosForm'
import { InsumosServiciosDetailModal } from './insumosServiciosDetailModal'
import { InsumosServiciosEditModal } from './insumosServiciosEditModal'

const serviciosDisponibles = [
  'Limpieza facial profunda',
  'Masaje relajante',
  'Manicure tradicional',
]

const insumosDisponibles = [
  'Crema hidratante facial 250 ml',
  'Aceite de almendras 500 ml',
  'Mascarilla de arcilla 1 kg',
  'Toallas desechables x50',
]

const unidadesDisponibles = ['unidad', 'ml', 'g', 'kg', 'par', 'paquete']

const insumosEjemplo = [
  {
    id: 1,
    servicio: 'Limpieza facial profunda',
    insumo: 'Crema hidratante facial 250 ml',
    cantidad: 10,
    unidad: 'ml',
    observaciones: 'Aplicar al finalizar el procedimiento.',
    estado: 'Activo',
  },
  {
    id: 2,
    servicio: 'Masaje relajante',
    insumo: 'Aceite de almendras 500 ml',
    cantidad: 20,
    unidad: 'ml',
    observaciones: 'Uso durante el masaje corporal.',
    estado: 'Activo',
  },
  {
    id: 3,
    servicio: 'Manicure tradicional',
    insumo: 'Toallas desechables x50',
    cantidad: 1,
    unidad: 'unidad',
    observaciones: 'Una toalla por servicio.',
    estado: 'Inactivo',
  },
]

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`

const celda = 'border-b border-[#F4D4E0] px-4 py-3 align-top'

const Estado = ({ estado }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
      estado === 'Activo'
        ? 'bg-[#E3F3EA] text-[#1F5A43]'
        : 'bg-[#F4D4E0] text-[#6B5A64]'
    }`}
  >
    {estado}
  </span>
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

export const InsumosServicios = () => {
  const [insumos, setInsumos] = useState(insumosEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('Todos')
  const [servicioFiltro, setServicioFiltro] = useState('Todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null)
  const [modalActivo, setModalActivo] = useState(null)

  const busquedaNormalizada = busqueda.trim().toLowerCase()

  const insumosFiltrados = insumos.filter((registro) => {
    const texto = [
      registro.servicio,
      registro.insumo,
      registro.unidad,
      registro.observaciones,
    ]
      .join(' ')
      .toLowerCase()

    const coincideTexto = texto.includes(busquedaNormalizada)
    const coincideEstado =
      estadoFiltro === 'Todos' || registro.estado === estadoFiltro
    const coincideServicio =
      servicioFiltro === 'Todos' || registro.servicio === servicioFiltro

    return coincideTexto && coincideEstado && coincideServicio
  })

  const agregarInsumo = (nuevoInsumo) => {
    setInsumos((actuales) => [
      ...actuales,
      {
        id: Math.max(0, ...actuales.map((registro) => registro.id)) + 1,
        ...nuevoInsumo,
      },
    ])
    setIsCreateModalOpen(false)
  }

  const abrirModalAccion = (tipo, registro) => {
    setInsumoSeleccionado(registro)
    setModalActivo(tipo)
  }

  const cerrarModalAccion = () => {
    setModalActivo(null)
    setInsumoSeleccionado(null)
  }

  const actualizarInsumo = (registroActualizado) => {
    setInsumos((actuales) =>
      actuales.map((registro) =>
        registro.id === registroActualizado.id ? registroActualizado : registro
      )
    )
    cerrarModalAccion()
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">
          Inicio › Servicios › Insumos de servicios
        </p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">
          Insumos de servicios
        </h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra los insumos y cantidades requeridos para cada servicio.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por servicio o insumo"
            aria-label="Buscar insumos de servicios"
            className={`min-w-[200px] flex-1 ${control}`}
          />

          <select
            value={servicioFiltro}
            onChange={(event) => setServicioFiltro(event.target.value)}
            aria-label="Filtrar por servicio"
            className={control}
          >
            <option>Todos</option>
            {serviciosDisponibles.map((servicio) => (
              <option key={servicio}>{servicio}</option>
            ))}
          </select>

          <select
            value={estadoFiltro}
            onChange={(event) => setEstadoFiltro(event.target.value)}
            aria-label="Filtrar por estado"
            className={control}
          >
            <option>Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            + Asignar insumo
          </button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className={celda}>Servicio</th>
                <th className={celda}>Insumo</th>
                <th className={celda}>Cantidad</th>
                <th className={celda}>Unidad</th>
                <th className={celda}>Observaciones</th>
                <th className={celda}>Estado</th>
                <th className={celda}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insumosFiltrados.map((registro) => (
                <tr key={registro.id} className="hover:bg-[#FDF6F8]">
                  <td className={`${celda} min-w-[170px] font-semibold`}>
                    {registro.servicio}
                  </td>
                  <td className={`${celda} min-w-[170px]`}>{registro.insumo}</td>
                  <td className={`${celda} whitespace-nowrap tabular-nums`}>
                    {registro.cantidad}
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>{registro.unidad}</td>
                  <td className={`${celda} min-w-[180px]`}>
                    {registro.observaciones || '—'}
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>
                    <Estado estado={registro.estado} />
                  </td>
                  <td className={`${celda} whitespace-nowrap`}>
                    <Acciones
                      onView={() => abrirModalAccion('detail', registro)}
                      onEdit={() => abrirModalAccion('edit', registro)}
                    />
                  </td>
                </tr>
              ))}
              {insumosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-[#6B5A64]">
                    No se encontraron insumos para servicios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {insumosFiltrados.map((registro) => (
            <article
              key={registro.id}
              className="rounded-xl border border-[#F4D4E0] p-3.5"
            >
              <header className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold">{registro.servicio}</h2>
                  <p className="text-sm text-[#6B5A64]">{registro.insumo}</p>
                </div>
                <Estado estado={registro.estado} />
              </header>

              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Cantidad</dt>
                <dd className="text-right">
                  {registro.cantidad} {registro.unidad}
                </dd>
                <dt className="text-[#6B5A64]">Observaciones</dt>
                <dd className="text-right">
                  {registro.observaciones || '—'}
                </dd>
              </dl>

              <Acciones
                onView={() => abrirModalAccion('detail', registro)}
                onEdit={() => abrirModalAccion('edit', registro)}
              />
            </article>
          ))}
          {insumosFiltrados.length === 0 && (
            <p className="py-6 text-center text-[#6B5A64]">
              No se encontraron insumos para servicios.
            </p>
          )}
        </div>

        <p className="p-4 text-sm text-[#6B5A64]" aria-live="polite">
          {insumosFiltrados.length}{' '}
          {insumosFiltrados.length === 1 ? 'registro' : 'registros'}
        </p>
      </div>

      {isCreateModalOpen && (
        <Modal
          title="Asignar insumo a servicio"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <InsumosServiciosForm
            serviciosDisponibles={serviciosDisponibles}
            insumosDisponibles={insumosDisponibles}
            unidadesDisponibles={unidadesDisponibles}
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={agregarInsumo}
          />
        </Modal>
      )}

      {modalActivo === 'detail' && insumoSeleccionado && (
        <InsumosServiciosDetailModal
          registro={insumoSeleccionado}
          onClose={cerrarModalAccion}
        />
      )}

      {modalActivo === 'edit' && insumoSeleccionado && (
        <InsumosServiciosEditModal
          registro={insumoSeleccionado}
          serviciosDisponibles={serviciosDisponibles}
          insumosDisponibles={insumosDisponibles}
          unidadesDisponibles={unidadesDisponibles}
          onClose={cerrarModalAccion}
          onSaved={actualizarInsumo}
        />
      )}
    </section>
  )
}

export default InsumosServicios