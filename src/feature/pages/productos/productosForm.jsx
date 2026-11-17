const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const ProductoForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="prod-sku" className="mb-1 block text-sm font-semibold">SKU *</label>
          <input id="prod-sku" type="text" placeholder="Ej: PROD-004" required className={control} />
        </div>
        <div>
          <label htmlFor="prod-nombre" className="mb-1 block text-sm font-semibold">Nombre *</label>
          <input id="prod-nombre" type="text" placeholder="Ej: Shampoo Keratina 500ml" required className={control} />
        </div>
        <div>
          <label htmlFor="prod-categoria" className="mb-1 block text-sm font-semibold">Categoría *</label>
          <select id="prod-categoria" defaultValue="" required className={control}>
            <option value="" disabled>Selecciona una categoría</option>
            <option value="1">Insumos Capilares</option>
            <option value="2">Estética Facial y Corporal</option>
            <option value="3">Descartables y Bioseguridad</option>
          </select>
        </div>
        <div>
          <label htmlFor="prod-proveedor" className="mb-1 block text-sm font-semibold">Proveedor *</label>
          <select id="prod-proveedor" defaultValue="" required className={control}>
            <option value="" disabled>Selecciona un proveedor</option>
            <option value="1">Distribuidora Belleza SAS</option>
            <option value="2">Insumos Spa Medellín</option>
            <option value="3">BioMed Antioquia</option>
          </select>
        </div>
        <div>
          <label htmlFor="prod-stock" className="mb-1 block text-sm font-semibold">Stock *</label>
          <input id="prod-stock" type="number" min="0" placeholder="Ej: 15" required className={control} />
        </div>
        
        <div>
          <label htmlFor="prod-costo" className="mb-1 block text-sm font-semibold">Costo unitario *</label>
          <input id="prod-costo" type="number" min="0" placeholder="Ej: 25000" required className={control} />
        </div>
        <div>
          <label htmlFor="prod-precio" className="mb-1 block text-sm font-semibold">Precio de venta *</label>
          <input id="prod-precio" type="number" min="0" placeholder="Ej: 42000" required className={control} />
        </div>
        <div>
          <label htmlFor="prod-unidad" className="mb-1 block text-sm font-semibold">Unidad de medida *</label>
          <select id="prod-unidad" defaultValue="Unidad" required className={control}>
            <option value="Unidad">Unidad</option>
            <option value="Frasco">Frasco</option>
            <option value="Caja">Caja</option>
            <option value="Mililitros">Mililitros (ml)</option>
          </select>
        </div>
        <div>
          <label htmlFor="prod-estado" className="mb-1 block text-sm font-semibold">Estado *</label>
          <select id="prod-estado" defaultValue="Activo" required className={control}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="prod-observaciones" className="mb-1 block text-sm font-semibold">Observaciones</label>
          <textarea id="prod-observaciones" rows={2} placeholder="Notas adicionales del producto (opcional)" className={control} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
        <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar producto</button>
      </div>
    </form>
  )
}

export default ProductoForm