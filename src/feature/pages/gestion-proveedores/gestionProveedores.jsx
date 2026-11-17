import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

// Datos de ejemplo
const proveedores = [
  { id: 1, razonSocial: 'Distribuidora Cosmética Andina S.A.S.', tipoDocumento: 'NIT', numeroDocumento: '900.123.456-7', nombreComercial: 'CosméticaAndina', nombreContacto: 'Juan Pérez', email: 'juan@cosmeticaandina.com', telefono: '3101234567', direccion: 'Cra 15 # 20-30, Medellín', categoria: 'Cosméticos', estado: 'Activo' },
  { id: 2, razonSocial: 'Aromas y Esencias Ltda.', tipoDocumento: 'NIT', numeroDocumento: '800.456.789-2', nombreComercial: 'AromasLtda', nombreContacto: 'María García', email: 'maria@aromas.com', telefono: '3209876543', direccion: 'Cll 50 # 10-15, Bogotá', categoria: 'Aromaterapia', estado: 'Activo' },
  { id: 3, razonSocial: 'Insumos Desechables del Valle S.A.S.', tipoDocumento: 'NIT', numeroDocumento: '901.234.567-1', nombreComercial: 'InsumoValle', nombreContacto: 'Carlos López', email: 'carlos@insumovalle.com', telefono: '3156789012', direccion: 'Av 3N # 12-40, Cali', categoria: 'Insumos', estado: 'Inactivo' },
  { id: 4, razonSocial: 'Natural Spa Suppliers S.A.S.', tipoDocumento: 'NIT', numeroDocumento: '900.987.654-3', nombreComercial: 'NaturalSpa', nombreContacto: 'Luisa Martínez', email: 'luisa@naturalspa.com', telefono: '3187654321', direccion: 'Cll 10 # 5-20, Pereira', categoria: 'Spa', estado: 'Activo' },
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
  Activo:   { clase: 'bg-[#E3F3EA] text-[#1F5A43]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg> },
  Inactivo: { clase: 'bg-[#FCE4E7] text-[#8E1F2B]', icono: <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg> },
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
    <button type="button" title="Eliminar"    aria-label="Eliminar"    className={`${iconBtn} ${size} !text-[#B3261E]`}><IconTrash /></button>
  </div>
)

export const GestionProveedores = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Proveedores › Gestión de proveedores</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de proveedores</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra los proveedores del spa. Registra razón social, tipo de documento, contacto, categoría y estado de cada proveedor.
        </p>
      </header>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar por razón social o contacto" aria-label="Buscar por razón social o contacto" className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por estado" className={control}>
            <option>Estado: Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <select aria-label="Filtrar por categoría" className={control}>
            <option>Categoría: Todas</option>
            <option>Cosméticos</option>
            <option>Aromaterapia</option>
            <option>Insumos</option>
            <option>Spa</option>
          </select>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            <IconPlus /> Crear proveedor
          </button>
        </div>

        {/* Tabla (pantallas medianas y grandes) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                <th className="border-b border-[#F4D4E0] px-4 py-3">ID</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Razón social</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Tipo doc.</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">N.º documento</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Nombre comercial</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Contacto</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Email</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Teléfono</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Dirección</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Categoría</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Estado</th>
                <th className="border-b border-[#F4D4E0] px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((p) => (
                <tr key={p.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{p.id}</code></td>
                  <td className={`${celda} font-semibold`}>{p.razonSocial}</td>
                  <td className={celda}>{p.tipoDocumento}</td>
                  <td className={celda}>{p.numeroDocumento}</td>
                  <td className={celda}>{p.nombreComercial}</td>
                  <td className={celda}>{p.nombreContacto}</td>
                  <td className={celda}>{p.email}</td>
                  <td className={celda}>{p.telefono}</td>
                  <td className={celda}>{p.direccion}</td>
                  <td className={celda}>{p.categoria}</td>
                  <td className={celda}><Estado estado={p.estado} /></td>
                  <td className={celda}><Acciones /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (celular) */}
        <div className="space-y-3 p-3 md:hidden">
          {proveedores.map((p) => (
            <article key={p.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>{p.razonSocial}</span>
                <Estado estado={p.estado} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Tipo doc.</dt><dd className="text-right">{p.tipoDocumento}</dd>
                <dt className="text-[#6B5A64]">N.º documento</dt><dd className="text-right">{p.numeroDocumento}</dd>
                <dt className="text-[#6B5A64]">Nombre comercial</dt><dd className="text-right">{p.nombreComercial}</dd>
                <dt className="text-[#6B5A64]">Contacto</dt><dd className="text-right">{p.nombreContacto}</dd>
                <dt className="text-[#6B5A64]">Email</dt><dd className="text-right">{p.email}</dd>
                <dt className="text-[#6B5A64]">Teléfono</dt><dd className="text-right">{p.telefono}</dd>
                <dt className="text-[#6B5A64]">Categoría</dt><dd className="text-right">{p.categoria}</dd>
              </dl>
              <div className="flex justify-end"><Acciones size="h-11 w-11" /></div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-[#6B5A64]">
          <span>Mostrando 1 a 4 de 20 proveedores</span>
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
        <Modal title="Crear proveedor" onClose={() => setIsCreateModalOpen(false)}>
          <div className="space-y-4 p-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Razón social</label>
                <input type="text" placeholder="Razón social" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Nombre comercial</label>
                <input type="text" placeholder="Nombre comercial" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Tipo de documento</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar</option>
                  <option value="NIT">NIT</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="CE">Cédula de extranjería</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Número de documento</label>
                <input type="text" placeholder="Número de documento" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Nombre de contacto</label>
                <input type="text" placeholder="Nombre de contacto" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Email</label>
                <input type="email" placeholder="correo@ejemplo.com" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Teléfono</label>
                <input type="tel" placeholder="Teléfono" className={`w-full ${control}`} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#3D2C33]">Categoría</label>
                <select className={`w-full ${control}`}>
                  <option value="">Seleccionar categoría</option>
                  <option value="Cosméticos">Cosméticos</option>
                  <option value="Aromaterapia">Aromaterapia</option>
                  <option value="Insumos">Insumos</option>
                  <option value="Spa">Spa</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-[#3D2C33]">Dirección</label>
              <input type="text" placeholder="Dirección completa" className={`w-full ${control}`} />
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

