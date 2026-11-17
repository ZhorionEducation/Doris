import Modal from '../../../routers/utils/modal'

const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

export const RolesDetailModal = ({ rol, onClose }) => (
  <Modal title="Detalle del rol" onClose={onClose}>
    <div className="space-y-5 p-4 text-[15px] text-[#3D2C33] md:p-6">
      <dl className="grid gap-4 sm:grid-cols-2">
        <Dato etiqueta="Código">{rol.codigo}</Dato>
        <Dato etiqueta="Nombre">{rol.nombre}</Dato>
        <Dato etiqueta="Estado">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
              rol.activo
                ? 'bg-[#E3F3EA] text-[#1F5A43]'
                : 'bg-[#F4D4E0] text-[#6B5A64]'
            }`}
          >
            {rol.activo ? 'Activo' : 'Inactivo'}
          </span>
        </Dato>
        <div className="sm:col-span-2">
          <Dato etiqueta="Descripción">{rol.descripcion || 'Sin descripción'}</Dato>
        </div>
      </dl>

      <section aria-label="Permisos asignados">
        <h3 className="mb-2 font-semibold">Permisos asignados</h3>
        {rol.permisosAsignados.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {rol.permisosAsignados.map((permiso) => (
              <li
                key={permiso}
                className="rounded-md bg-[#F9E8EE] px-2.5 py-1 text-sm"
              >
                {permiso}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#6B5A64]">No tiene permisos asignados.</p>
        )}
      </section>

      <div className="flex justify-end border-t border-[#F4D4E0] pt-4">
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold text-[#3D2C33] hover:bg-[#F4D4E0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]"
        >
          Cerrar
        </button>
      </div>
    </div>
  </Modal>
)