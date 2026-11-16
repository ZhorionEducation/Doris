import React from 'react'

// Datos de ejemplo (solo diseño)
const privilegio = {
  id: 4,
  nombre: 'Eliminar',
  descripcion: 'Borrar o inactivar registros',
  permisos: ['Gestión de Pedidos'],
}

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
)

export const PrivilegiosDetailModal = ({ onClose }) => {
  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#3D2C33]/60 p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="privilegio-titulo"
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#F4D4E0] bg-white text-[15px] text-[#3D2C33] shadow-xl"
      >
        {/* Encabezado */}
        <header className="flex items-start justify-between gap-3 border-b border-[#F4D4E0] p-4 md:p-6">
          <div>
            <p className="text-[13px] text-[#6B5A64]">Detalle del privilegio N.º {privilegio.id}</p>
            <h2 id="privilegio-titulo" className="text-xl font-bold md:text-2xl">{privilegio.nombre}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" title="Cerrar" className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white hover:bg-[#F4D4E0] ${focus}`}>
            <IconClose />
          </button>
        </header>

        {/* Contenido con desplazamiento */}
        <div className="space-y-6 overflow-y-auto p-4 md:p-6">
          <dl>
            <dt className="text-[13px] text-[#6B5A64]">Descripción</dt>
            <dd>{privilegio.descripcion}</dd>
          </dl>

          <hr className="border-0 border-t border-[#F4D4E0]" />

          <section aria-label="Permisos asociados">
            <h3 className="mb-3 text-lg font-semibold">Permisos asociados</h3>
            <ul className="flex flex-wrap gap-2">
              {privilegio.permisos.map((p) => (
                <li key={p} className="rounded-md bg-[#F9E8EE] px-2.5 py-1 text-sm">{p}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Botones */}
        <footer className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onClose} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cerrar</button>
        </footer>
      </div>
    </div>
  )
}