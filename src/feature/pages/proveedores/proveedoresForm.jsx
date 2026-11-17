const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const CategoriaProveedoresForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="cat-prov-nombre" className="mb-1 block text-sm font-semibold">Nombre *</label>
          <input id="cat-prov-nombre" type="text" placeholder="Ej: Insumos Capilares" required className={control} />
        </div>
        <div>
          <label htmlFor="cat-prov-estado" className="mb-1 block text-sm font-semibold">Estado *</label>
          <select id="cat-prov-estado" defaultValue="Activo" required className={control}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cat-prov-descripcion" className="mb-1 block text-sm font-semibold">Descripción *</label>
          <textarea id="cat-prov-descripcion" rows={3} placeholder="Describe qué tipo de productos agrupa esta categoría" required className={control} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
        <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar categoría</button>
      </div>
    </form>
  )
}

export default CategoriaProveedoresForm