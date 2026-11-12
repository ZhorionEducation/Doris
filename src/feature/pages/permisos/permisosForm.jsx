const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const PermisoForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="permiso-nombre" className="mb-1 block text-sm font-semibold">Nombre del módulo *</label>
          <input id="permiso-nombre" type="text" placeholder="Ej: Gestión de usuarios" required className={control} />
        </div>
        <div>
          <label htmlFor="permiso-privilegio" className="mb-1 block text-sm font-semibold">Privilegio *</label>
          <select id="permiso-privilegio" required className={control}>
            <option value="">Selecciona un privilegio</option>
            <option>Consultar</option>
            <option>Crear</option>
            <option>Editar</option>
            <option>Eliminar</option>
            <option>Exportar</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="permiso-descripcion" className="mb-1 block text-sm font-semibold">Descripción *</label>
          <textarea id="permiso-descripcion" rows={3} placeholder="Describe el módulo o recurso protegido" required className={control} />
        </div>
        <div>
          <label htmlFor="permiso-roles" className="mb-1 block text-sm font-semibold">Roles con acceso *</label>
          <select id="permiso-roles" multiple required className={`${control} min-h-32`}>
            <option>Administrador</option>
            <option>Gerente</option>
            <option>Vendedor</option>
            <option>Auxiliar de compras</option>
            <option>Esteticista</option>
            <option>Cliente</option>
          </select>
          <p className="mt-1 text-[13px] text-[#6B5A64]">Usa Ctrl o Cmd para seleccionar varios roles.</p>
        </div>
        <div>
          <label htmlFor="permiso-estado" className="mb-1 block text-sm font-semibold">Estado *</label>
          <select id="permiso-estado" className={control}>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
        <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar permiso</button>
      </div>
    </form>
  )
}

export default PermisoForm
