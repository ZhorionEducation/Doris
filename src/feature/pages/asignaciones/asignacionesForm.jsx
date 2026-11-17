const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const AsignacionForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="asig-servicio" className="mb-1 block text-sm font-semibold">Servicio *</label>
          <select id="asig-servicio" defaultValue="" required className={control}>
            <option value="" disabled>Selecciona un servicio</option>
            <option value="1">Alisado de Keratina</option>
            <option value="2">Limpieza Facial Profunda</option>
            <option value="3">Masaje Relajante Corporal</option>
          </select>
        </div>
        <div>
          <label htmlFor="asig-empleado" className="mb-1 block text-sm font-semibold">Empleado / Profesional *</label>
          <select id="asig-empleado" defaultValue="" required className={control}>
            <option value="" disabled>Selecciona un profesional</option>
            <option value="1">Camila Restrepo</option>
            <option value="2">Valentina Ríos</option>
            <option value="3">Andrés Morales</option>
          </select>
        </div>
        <div>
          <label htmlFor="asig-turno" className="mb-1 block text-sm font-semibold">Turno *</label>
          <select id="asig-turno" defaultValue="Mañana" required className={control}>
            <option value="Mañana">Mañana (8:00 AM - 2:00 PM)</option>
            <option value="Tarde">Tarde (2:00 PM - 8:00 PM)</option>
            <option value="Completo">Jornada Completa</option>
          </select>
        </div>
        <div>
          <label htmlFor="asig-fecha" className="mb-1 block text-sm font-semibold">Fecha de asignación *</label>
          <input id="asig-fecha" type="date" required className={control} />
        </div>
        <div>
          <label htmlFor="asig-estado" className="mb-1 block text-sm font-semibold">Estado *</label>
          <select id="asig-estado" defaultValue="Activo" required className={control}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="asig-observaciones" className="mb-1 block text-sm font-semibold">Observaciones</label>
          <textarea id="asig-observaciones" rows={3} placeholder="Notas sobre cabina, equipos o novedades del turno (opcional)" className={control} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
        <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar asignación</button>
      </div>
    </form>
  )
}

export default AsignacionForm