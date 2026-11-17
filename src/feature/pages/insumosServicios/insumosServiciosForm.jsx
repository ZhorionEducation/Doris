import { useState } from 'react'

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const InsumosServiciosForm = ({
  serviciosDisponibles,
  insumosDisponibles,
  unidadesDisponibles,
  onCancel,
  onSaved,
}) => {
  const [servicio, setServicio] = useState('')
  const [insumo, setInsumo] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [unidad, setUnidad] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const cantidadNumero = Number(cantidad)
    if (!Number.isFinite(cantidadNumero) || cantidadNumero <= 0) {
      setError('La cantidad debe ser mayor que cero.')
      return
    }

    onSaved({
      servicio,
      insumo,
      cantidad: cantidadNumero,
      unidad,
      observaciones: observaciones.trim(),
      estado,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="insumo-servicio" className="mb-1 block text-sm font-semibold">
            Servicio *
          </label>
          <select
            id="insumo-servicio"
            value={servicio}
            onChange={(event) => setServicio(event.target.value)}
            required
            className={control}
          >
            <option value="">Selecciona un servicio</option>
            {serviciosDisponibles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="insumo-producto" className="mb-1 block text-sm font-semibold">
            Insumo *
          </label>
          <select
            id="insumo-producto"
            value={insumo}
            onChange={(event) => setInsumo(event.target.value)}
            required
            className={control}
          >
            <option value="">Selecciona un insumo</option>
            {insumosDisponibles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="insumo-cantidad" className="mb-1 block text-sm font-semibold">
            Cantidad *
          </label>
          <input
            id="insumo-cantidad"
            type="number"
            min="0.01"
            step="any"
            value={cantidad}
            onChange={(event) => {
              setCantidad(event.target.value)
              setError('')
            }}
            required
            className={control}
          />
        </div>

        <div>
          <label htmlFor="insumo-unidad" className="mb-1 block text-sm font-semibold">
            Unidad *
          </label>
          <select
            id="insumo-unidad"
            value={unidad}
            onChange={(event) => setUnidad(event.target.value)}
            required
            className={control}
          >
            <option value="">Selecciona una unidad</option>
            {unidadesDisponibles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="insumo-estado" className="mb-1 block text-sm font-semibold">
            Estado *
          </label>
          <select
            id="insumo-estado"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            className={control}
          >
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="insumo-observaciones" className="mb-1 block text-sm font-semibold">
            Observaciones
          </label>
          <textarea
            id="insumo-observaciones"
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
            rows={3}
            className={control}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-[#B3261E] md:col-span-2">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
        <button
          type="button"
          onClick={onCancel}
          className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
        >
          Guardar asignación
        </button>
      </div>
    </form>
  )
}

export default InsumosServiciosForm