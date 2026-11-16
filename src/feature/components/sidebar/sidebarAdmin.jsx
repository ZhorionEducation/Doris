import { NavLink, useLocation } from 'react-router-dom'

// Iconos de línea (trazo 1.8, 20 x 20)
const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
)
const IconFlower = () => (
  <Svg className="h-[26px] w-[26px]">
    <circle cx="12" cy="6.5" r="3" /><circle cx="12" cy="17.5" r="3" /><circle cx="6.5" cy="12" r="3" /><circle cx="17.5" cy="12" r="3" /><circle cx="12" cy="12" r="1.5" />
  </Svg>
)
const IconChevron = () => <Svg className="h-5 w-5 transition-transform group-open:rotate-180"><path d="M6 9l6 6 6-6" /></Svg>
const IconGear = () => <Svg><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></Svg>
const IconUsers = () => <Svg><circle cx="9" cy="8" r="3" /><path d="M3 20c.4-3.3 2.3-5 6-5s5.6 1.7 6 5M16 5.2a3 3 0 010 5.6M17 15c2.2.4 3.5 2 4 5" /></Svg>
const IconBag = () => <Svg><path d="M6 7h12l1 13H5zM9 7a3 3 0 016 0" /></Svg>
const IconLeaf = () => <Svg><path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14zM5 19l8-8" /></Svg>
const IconCash = () => <Svg><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></Svg>
const IconChart = () => <Svg><path d="M4 20h16M7 20v-6M12 20V6M17 20v-9" /></Svg>

// Macroprocesos y subprocesos de DORIS. "activo" marca la opción donde está el usuario (solo diseño)
const procesos = [
  { nombre: 'Configuración', icono: <IconGear />, items: ['Privilegios', 'Permisos'] },
  { nombre: 'Usuarios', icono: <IconUsers />, items: ['Gestión de usuarios'] },
  { nombre: 'Compras', icono: <IconBag />, items: ['Categoría de proveedores', 'Gestión de proveedores', 'Categorías de productos', 'Gestión de productos', 'Gestión de compras', 'Gestión de lotes'] },
  { nombre: 'Servicios', icono: <IconLeaf />, items: ['Categorías de servicios', 'Gestión de servicios', 'Ficha técnica', 'Insumos de servicios', 'Asignación de empleados', 'Agenda', 'Gestión de alergias', 'Ficha técnica de alergias'] },
  { nombre: 'Ventas', icono: <IconCash />, items: ['Gestión de clientes', 'Gestión de cotizaciones', 'Gestión de pedidos', 'Gestión de ventas', 'Devoluciones y anulaciones'] },
  { nombre: 'Medición y Desempeño', icono: <IconChart />, items: ['Indicadores'] },
]

const rutas = {
  Privilegios: '/privilegios',
  Permisos: '/permisos',
  'Gestión de usuarios': '/usuarios',
  'Gestión de compras': '/compras',
  'Gestión de pedidos': '/pedidos',
   'Gestión de lotes': '/lotes',
   'Gestión de alergias': '/alergias',
   'Ficha técnica de alergias': '/ficha-tecnica-alergias',
   'Gestión de cotizaciones': '/cotizaciones',
}

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const SidebarAdmin = () => {
  const { pathname } = useLocation()

  return (
    <aside
      aria-label="Menú principal"
      className="flex h-full w-72 shrink-0 flex-col overflow-y-auto border-r border-[#F4D4E0] bg-[#FDF6F8] px-3.5 py-5 text-[#3D2C33]"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-2.5 pb-5 pt-1">
        <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[15px] bg-[#F8C9DA] text-[#B83A6E]">
          <IconFlower />
        </span>
        <div>
          <p className="text-[22px] font-bold leading-[1.1]">DORIS</p>
          <p className="max-w-[150px] text-[11px] leading-snug text-[#6B5A64]">
            Desarrollo Operativo de Recursos e Información de Stock
          </p>
        </div>
      </div>

      <p className="px-3 py-2 text-[13px] font-semibold text-[#6B5A64]">Procesos</p>

      {/* Macroprocesos (se abren y cierran con details, sin código) */}
      <nav className="space-y-0.5">
        {procesos.map((p) => {
          const procesoActivo = p.items.some((item) => rutas[item] === pathname)

          return (
            <details key={p.nombre} open={procesoActivo || undefined} className="group">
              <summary
                className={`flex cursor-pointer list-none items-center gap-3 rounded-[10px] px-3 py-2.5 font-semibold [&::-webkit-details-marker]:hidden ${focus} ${
                  procesoActivo ? 'bg-[#B83A6E] text-white' : 'hover:bg-[#F4D4E0]'
                }`}
              >
                {p.icono}
                <span>{p.nombre}</span>
                <span className="ml-auto"><IconChevron /></span>
              </summary>

              <ul className="mt-0.5 space-y-0.5">
                {p.items.map((item) => {
                  const ruta = rutas[item]

                  return (
                    <li key={item}>
                      <NavLink
                        to={ruta || '#'}
                        end
                        className={({ isActive }) => `ml-[34px] block rounded-lg px-3 py-[7px] text-sm ${focus} ${
                          isActive ? 'bg-[#F4D4E0] font-bold' : 'hover:bg-[#F4D4E0]'
                        }`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </details>
          )
        })}
      </nav>
    </aside>
  )
}

export default SidebarAdmin