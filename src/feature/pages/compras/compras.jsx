import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../../../routers/utils/modal'
import { CompraForm } from './comprasForm'
import { ComprasDetailModal } from './comprasDetailModal'
import { CompraEdit } from './comprasEditModal'



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
  Recibida: { clase: 'bg-[#E3F3EA] text-[#1F5A43]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg> },
  Anulada: { clase: 'bg-[#FCE4E7] text-[#8E1F2B]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg> },
}

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`
const iconBtn = `grid place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`
const IconReport = () => <Svg><path d="M4 4h16v16H4z" /><path d="M8 2v4M16 2v4M4 8h16" /></Svg>
const celda = 'whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3'


const Estado = ({ estado }) => {
  const estadoSeguro = estados[estado] ? estado : 'Pendiente'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${estados[estadoSeguro].clase}`}>
      {estados[estadoSeguro].icono} {estadoSeguro}
    </span>
  )
}

const formatearFecha = (fecha) => {
  if (!fecha) return '-'
  const valor = new Date(fecha)
  if (Number.isNaN(valor.getTime())) return fecha
  return valor.toLocaleDateString('es-CO', { timeZone: 'UTC' })
}

const formatearDinero = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number(valor) || 0)

const fetchCompras = async (page) => {
  try {
    const [comprasResponse, usuariosResponse] = await Promise.all([
      axios.get(`http://localhost:5000/api/shopping?page=${page}&limit=10`),
      axios.get('http://localhost:5000/api/users?page=1&limit=50')
    ])

    const usuarios = new Map(
      (usuariosResponse.data.data || []).map((usuario) => [
        String(usuario.numero_documento),
        `${usuario.nombres} ${usuario.apellidos}`.trim()
      ])
    )

    return {
      compras: (comprasResponse.data.data || []).map((compra) => ({
        id: compra.id,
        fecha: formatearFecha(compra.fecha_compra),
        entrega: formatearFecha(compra.fecha_entrega),
        proveedor: `Proveedor ${compra.proveedor_id}`,
        proveedorId: compra.proveedor_id,
        encargado: usuarios.get(String(compra.encargado_documento)) || compra.encargado_documento,
        encargadoDocumento: compra.encargado_documento,
        total: Number(compra.total),
        subtotal: compra.subtotal,
        iva: compra.iva,
        porcentajeIva: Number(compra.subtotal) > 0
          ? Number(((Number(compra.iva) / Number(compra.subtotal)) * 100).toFixed(2))
          : 19,
        estado: compra.estado,
        bodega: compra.bodega_destino,
        observaciones: compra.observaciones,
        fechaCompraOriginal: compra.fecha_compra,
        fechaEntregaOriginal: compra.fecha_entrega
      })),
      pagination: comprasResponse.data.pagination
    }
  } catch (error) {
    console.error('Error fetching compras:', error.response?.data || error.message)
    return { compras: [], pagination: null }
  }
}

// Acciones: ver, editar y anular. size cambia entre escritorio y celular
const Acciones = ({ size = 'h-9 w-9', onView, onEdit }) => (
  <div className="flex gap-2">
    <button type="button" onClick={onView} title="Ver detalle" aria-label="Ver detalle" className={`${iconBtn} ${size}`}><IconEye /></button>
    <button type="button" onClick={onEdit} title="Editar" aria-label="Editar" className={`${iconBtn} ${size}`}><IconEdit /></button>
    {/* <button type="button" title="Anular" aria-label="Anular" className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button> */}
  </div>
)

export const Compras = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [compras, setCompras] = useState([])
  const [selectedCompra, setSelectedCompra] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const [search, setSearch] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('Estado: Todos')

  const cargarCompras = async (page = currentPage) => {
    const { compras: comprasData, pagination: paginationData } =
      await fetchCompras(page)
    setCompras(comprasData)
    setPagination(paginationData)
  }

  useEffect(() => {
    cargarCompras(currentPage)
  }, [currentPage])

  const comprasFiltradas = compras.filter((compra) => {
    const coincideBusqueda =
      !search ||
      `${compra.id} ${compra.proveedor} ${compra.encargado}`
        .toLowerCase()
        .includes(search.toLowerCase())
    const coincideEstado =
      estadoFiltro === 'Estado: Todos' || compra.estado === estadoFiltro
    return coincideBusqueda && coincideEstado
  })

  return (
    <section className="mx-auto max-w-[1800px] space-y-6 px-6 py-8 text-[15px] text-[#3D2C33] md:px-10 md:py-10">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de compras</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Registra las compras de productos a los proveedores.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por proveedor o encargado" aria-label="Buscar por proveedor o encargado" className={`w-full pl-10 ${control}`} />
          </div>
          <select value={estadoFiltro} onChange={(event) => setEstadoFiltro(event.target.value)} aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Pendiente</option>
            <option>Recibida</option>
            <option>Anulada</option>
          </select>
          <input type="date" aria-label="Desde" className={control} />
          <input type="date" aria-label="Hasta" className={control} />
          <button type="button" className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconReport /> Generar reporte
          </button>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconPlus /> Crear compra
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">N.º</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Fecha</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Entrega</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Proveedor</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Encargado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comprasFiltradas.map((c) => (
                <tr key={c.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{c.id}</code></td>
                  <td className={celda}>{c.fecha}</td>
                  <td className={celda}>{c.entrega}</td>
                  <td className={`${celda} font-semibold`}>{c.proveedor}</td>
                  <td className={celda}>{c.encargado}</td>
                  <td className={celda}><Estado estado={c.estado} /></td>
                  <td className={celda}><Acciones onView={() => { setSelectedCompra(c); setActiveModal('detail') }} onEdit={() => { setSelectedCompra(c); setActiveModal('edit') }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {comprasFiltradas.map((c) => (
            <article key={c.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>Compra N.º {c.id}</span>
                <Estado estado={c.estado} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Proveedor</dt><dd className="text-right">{c.proveedor}</dd>
                <dt className="text-[#6B5A64]">Encargado</dt><dd className="text-right">{c.encargado}</dd>
                <dt className="text-[#6B5A64]">Fecha</dt><dd className="text-right">{c.fecha}</dd>
                <dt className="text-[#6B5A64]">Entrega</dt><dd className="text-right">{c.entrega}</dd>
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" onView={() => { setSelectedCompra(c); setActiveModal('detail') }} onEdit={() => { setSelectedCompra(c); setActiveModal('edit') }} /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>
            {pagination
              ? `Mostrando página ${pagination.page} de ${pagination.totalPages} (${pagination.total} compras)`
              : 'No hay información de paginación'}
          </span>
          <div className="flex gap-1">
            <button type="button" disabled={!pagination || currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Página anterior" className={`h-9 min-w-9 rounded-[10px] border border-[#F4D4E0] bg-white font-semibold disabled:opacity-45 ${focus}`}>‹</button>
            {pagination && Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
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
        <Modal title="Crear compra" onClose={() => setIsCreateModalOpen(false)}>
          <CompraForm
            onCancel={() => setIsCreateModalOpen(false)}
            onSaved={() => {
              setIsCreateModalOpen(false)
              cargarCompras(1)
              setCurrentPage(1)
            }}
          />
        </Modal>
      )}
      {activeModal === 'detail' && (
        <ComprasDetailModal
          compra={selectedCompra}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'edit' && (
        <Modal title="Editar compra" onClose={() => setActiveModal(null)}>
          <CompraEdit
            compra={selectedCompra}
            onCancel={() => setActiveModal(null)}
            onSaved={() => {
              setActiveModal(null)
              cargarCompras(currentPage)
            }}
          />
        </Modal>
      )}
    </section>
  )
}