import { useState } from 'react'
import Modal from '../../../routers/utils/modal'
import { CategoriasProductosDetailModal } from './categoriasProductosDetailModal'
import { CategoriasProductosEditModal } from './categoriasProductosEditModal'

const categoriasEjemplo = [
  { id: 1, nombre: 'Cuidado facial', descripcion: 'Productos para el cuidado del rostro', activa: true },
  { id: 2, nombre: 'Cuidado capilar', descripcion: 'Productos para el cuidado del cabello', activa: true },
  { id: 3, nombre: 'Cuidado corporal', descripcion: 'Productos para el cuidado del cuerpo', activa: false },
  { id: 4, nombre: 'Accesorios', descripcion: 'Accesorios de belleza', activa: true },
]

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`

const Estado = ({ activa }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
      activa ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#F4D4E0] text-[#6B5A64]'
    }`}
  >
    {activa ? 'Activa' : 'Inactiva'}
  </span>
)

const Acciones = ({ onView, onEdit, mobile = false }) => (
  <div className={`flex gap-2 ${mobile ? 'justify-end' : ''}`}>
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

const CategoriaProductoForm = ({ onCancel, onSaved }) => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [estado, setEstado] = useState('Activa')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nombreLimpio = nombre.trim()
    if (!nombreLimpio) {
      setError('El nombre es obligatorio.')
      return
    }

    onSaved({
      nombre: nombreLimpio,
      descripcion: descripcion.trim(),
      activa: estado === 'Activa',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="space-y-4 p-4 md:p-6">
        <div>
          <label htmlFor="nombre-categoria" className="mb-1 block text-sm font-semibold">
            Nombre *
          </label>
          <input
            id="nombre-categoria"
            value={nombre}
            onChange={(event) => {
              setNombre(event.target.value)
              setError('')
            }}
            maxLength={100}
            required
            className={`min-h-11 w-full ${control}`}
          />
          {error && (
            <p role="alert" className="mt-1 text-sm text-[#B3261E]">
              {error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion-categoria" className="mb-1 block text-sm font-semibold">
            Descripción
          </label>
          <textarea
            id="descripcion-categoria"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            rows={3}
            className={`w-full ${control}`}
          />
        </div>

        <div>
          <label htmlFor="estado-categoria" className="mb-1 block text-sm font-semibold">
            Estado
          </label>
          <select
            id="estado-categoria"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            className={`min-h-11 w-full ${control}`}
          >
            <option>Activa</option>
            <option>Inactiva</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button
          type="button"
          onClick={onCancel}
          className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
        >
          Guardar categoría
        </button>
      </div>
    </form>
  )
}

export const CategoriasProductos = () => {
  const [categorias, setCategorias] = useState(categoriasEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('Todas')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [modalActivo, setModalActivo] = useState(null)

  const busquedaNormalizada = busqueda.trim().toLowerCase()

  const categoriasFiltradas = categorias.filter((categoria) => {
    const nombre = categoria.nombre.toLowerCase()
    const descripcion = (categoria.descripcion ?? '').toLowerCase()
    const coincideTexto =
      nombre.includes(busquedaNormalizada) ||
      descripcion.includes(busquedaNormalizada)

    const coincideEstado =
      estadoFiltro === 'Todas' ||
      (estadoFiltro === 'Activas' && categoria.activa) ||
      (estadoFiltro === 'Inactivas' && !categoria.activa)

    return coincideTexto && coincideEstado
  })

  const agregarCategoria = (nuevaCategoria) => {
    setCategorias((actuales) => [
      ...actuales,
      {
        id: Math.max(0, ...actuales.map((categoria) => categoria.id)) + 1,
        ...nuevaCategoria,
      },
    ])
    setIsCreateModalOpen(false)
  }

  const abrirModalAccion = (tipo, categoria) => {
    setCategoriaSeleccionada(categoria)
    setModalActivo(tipo)
  }

  const cerrarModalAccion = () => {
    setModalActivo(null)
    setCategoriaSeleccionada(null)
  }

  const actualizarCategoria = (categoriaActualizada) => {
    setCategorias((actuales) =>
      actuales.map((categoria) =>
        categoria.id === categoriaActualizada.id
          ? categoriaActualizada
          : categoria
      )
    )
    cerrarModalAccion()
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">
          Inicio › Compras › Categorías de productos
        </p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">
          Categorías de productos
        </h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Consulta y administra las categorías usadas para organizar los productos.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar categoría"
            aria-label="Buscar categoría"
            className={`min-w-[200px] flex-1 ${control}`}
          />

          <select
            value={estadoFiltro}
            onChange={(event) => setEstadoFiltro(event.target.value)}
            aria-label="Filtrar por estado"
            className={control}
          >
            <option>Todas</option>
            <option>Activas</option>
            <option>Inactivas</option>
          </select>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            + Crear categoría
          </button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">Categoría</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Descripción</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoriasFiltradas.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-[#FDF6F8]">
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3 font-semibold">
                    {categoria.nombre}
                  </td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">
                    {categoria.descripcion || '—'}
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <Estado activa={categoria.activa} />
                  </td>
                  <td className="whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3">
                    <Acciones
                      onView={() => abrirModalAccion('detail', categoria)}
                      onEdit={() => abrirModalAccion('edit', categoria)}
                    />
                  </td>
                </tr>
              ))}
              {categoriasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-[#6B5A64]">
                    No se encontraron categorías.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {categoriasFiltradas.map((categoria) => (
            <article
              key={categoria.id}
              className="rounded-xl border border-[#F4D4E0] p-3.5"
            >
              <header className="mb-2 flex items-center justify-between gap-2">
                <h2 className="font-bold">{categoria.nombre}</h2>
                <Estado activa={categoria.activa} />
              </header>
              <p className="mb-3 text-sm text-[#6B5A64]">
                {categoria.descripcion || 'Sin descripción'}
              </p>
              <Acciones
                mobile
                onView={() => abrirModalAccion('detail', categoria)}
                onEdit={() => abrirModalAccion('edit', categoria)}
              />
            </article>
          ))}
          {categoriasFiltradas.length === 0 && (
            <p className="py-6 text-center text-[#6B5A64]">
              No se encontraron categorías.
            </p>
          )}
        </div>

        <p className="p-4 text-sm text-[#6B5A64]" aria-live="polite">
          {categoriasFiltradas.length}{' '}
          {categoriasFiltradas.length === 1 ? 'categoría' : 'categorías'}
        </p>
      </div>

      {isCreateModalOpen && (
        <Modal title="Crear categoría" onClose={() => setIsCreateModalOpen(false)}>
          <CategoriaProductoForm
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={agregarCategoria}
          />
        </Modal>
      )}

      {modalActivo === 'detail' && categoriaSeleccionada && (
        <CategoriasProductosDetailModal
          categoria={categoriaSeleccionada}
          onClose={cerrarModalAccion}
        />
      )}

      {modalActivo === 'edit' && categoriaSeleccionada && (
        <CategoriasProductosEditModal
          categoria={categoriaSeleccionada}
          onClose={cerrarModalAccion}
          onSaved={actualizarCategoria}
        />
      )}
    </section>
  )
}

export default CategoriasProductos