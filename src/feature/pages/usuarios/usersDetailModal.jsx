import React from 'react'

// Datos de ejemplo (solo diseño)
const usuario = {
  tipo: 'Cédula de ciudadanía (CC)',
  documento: '1020456789',
  nombres: 'Andrés',
  apellidos: 'Ríos Londoño',
  email: 'andres.rios@doris.com',
  telefono: '3115678901',
  direccion: 'Cl 33 #65-10',
  rol: 'Vendedor',
  ingreso: '10/05/2022',
}

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
)
const IconOk = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
)

// Dato con etiqueta arriba y valor abajo
const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

export const UsersDetailModal = ({ onClose }) => {
  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#3D2C33]/60 p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="usuario-titulo"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#F4D4E0] bg-white text-[15px] text-[#3D2C33] shadow-xl"
      >
        {/* Encabezado */}
        <header className="flex items-start justify-between gap-3 border-b border-[#F4D4E0] p-4 md:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E8A0BF] text-lg font-bold">{usuario.nombres[0]}</span>
            <div>
              <p className="text-[13px] text-[#6B5A64]">Detalle del usuario</p>
              <h2 id="usuario-titulo" className="flex flex-wrap items-center gap-3 text-xl font-bold md:text-2xl">
                {usuario.nombres} {usuario.apellidos}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EA] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F5A43]">
                  <IconOk /> Activo
                </span>
              </h2>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" title="Cerrar" className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white hover:bg-[#F4D4E0] ${focus}`}>
            <IconClose />
          </button>
        </header>

        {/* Contenido con desplazamiento */}
        <div className="space-y-6 overflow-y-auto p-4 md:p-6">
          <section aria-label="Datos personales">
            <h3 className="mb-3 text-lg font-semibold">Datos personales</h3>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Dato etiqueta="Tipo de documento">{usuario.tipo}</Dato>
              <Dato etiqueta="Número de documento">{usuario.documento}</Dato>
              <Dato etiqueta="Teléfono">{usuario.telefono}</Dato>
              <Dato etiqueta="Dirección">{usuario.direccion}</Dato>
            </dl>
          </section>

          <hr className="border-0 border-t border-[#F4D4E0]" />

          <section aria-label="Cuenta y acceso">
            <h3 className="mb-3 text-lg font-semibold">Cuenta y acceso</h3>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Dato etiqueta="Correo electrónico"><span className="break-all">{usuario.email}</span></Dato>
              <Dato etiqueta="Rol">{usuario.rol}</Dato>
              <Dato etiqueta="Fecha de ingreso">{usuario.ingreso}</Dato>
              <Dato etiqueta="Contraseña"><span className="font-normal text-[#6B5A64]">Por seguridad, no se muestra</span></Dato>
            </dl>
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