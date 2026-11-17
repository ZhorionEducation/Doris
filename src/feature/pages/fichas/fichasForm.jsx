const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const FichaForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="ficha-codigo" className="mb-1 block text-sm font-semibold">Código *</label>
          <input id="ficha-codigo" type="text" placeholder="Ej: FT-004" required className={control} />
        </div>
        <div>
          <label htmlFor="ficha-nombre" className="mb-1 block text-sm font-semibold">Nombre *</label>
          <input id="ficha-nombre" type="text" placeholder="Ej: Protocolo Alisado Orgánico" required className={control} />
        </div>
        <div>
          <label htmlFor="ficha-servicio" className="mb-1 block text-sm font-semibold">Servicio asociado *</label>
          <select id="ficha-servicio" defaultValue="" required className={control}>
            <option value="" disabled>Selecciona un servicio</option>
            <option value="1">Alisado de Keratina</option>
            <option value="2">Limpieza Facial Profunda</option>
            <option value="3">Masaje Relajante Corporal</option>
          </select>
        </div>
        <div>
          <label htmlFor="ficha-estado" className="mb-1 block text-sm font-semibold">Estado *</label>
          <select id="ficha-estado" defaultValue="Activo" required className={control}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ficha-descripcion" className="mb-1 block text-sm font-semibold">Descripción *</label>
          <textarea id="ficha-descripcion" rows={3} placeholder="Describe el procedimiento técnico paso a paso" required className={control} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ficha-observaciones" className="mb-1 block text-sm font-semibold">Observaciones</label>
          <textarea id="ficha-observaciones" rows={2} placeholder="Precauciones, contraindicaciones o recomendaciones (opcional)" className={control} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
        <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar ficha</button>
      </div>
    </form>
  )
}

export default FichaForm