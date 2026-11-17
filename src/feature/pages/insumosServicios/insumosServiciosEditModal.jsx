import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

export const InsumosServiciosEditModal = ({
  registro,
  serviciosDisponibles,
  insumosDisponibles,
  unidadesDisponibles,
  onClose,
  onSaved,
}) => {
  const [servicio, setServicio] = useState(registro.servicio)
  const [insumo, setInsumo] = useState(registro.insumo)
  const [cantidad, setCantidad] = useState(String(registro.cantidad))
  const [unidad, setUnidad] = useState(registro.unidad)
  const [observaciones, setObservaciones] = useState(registro.observaciones)
  const [estado, setEstado] = useState(registro.estado)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const cantidadNumero = Number(cantidad)
    if (!Number.isFinite(cantidadNumero) || cantidadNumero <= 0) {
      setError('La cantidad debe ser mayor que cero.')
      return
    }

    onSaved({
      ...registro,
      servicio,
      insumo,
      cantidad: cantidadNumero,
      unidad,
      observaciones: observaciones.trim(),
      estado,
    })
  }

  return (
    <Modal title="Editar insumo del servicio" onClose={onClose}>
      <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
          <div>
            <label htmlFor="editar-insumo-servicio" className="mb-1 block text-sm font-semibold">
              Servicio *
            </label>
            <select
              id="editar-insumo-servicio"
              value={servicio}
              onChange={(event) => setServicio(event.target.value)}
              required
              className={control}
            >
              {serviciosDisponibles.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="editar-insumo-producto" className="mb-1 block text-sm font-semibold">
              Insumo *
            </label>
            <select
              id="editar-insumo-producto"
              value={insumo}
              onChange={(event) => setInsumo(event.target.value)}
              required
              className={control}
            >
              {insumosDisponibles.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="editar-insumo-cantidad" className="mb-1 block text-sm font-semibold">
              Cantidad *
            </label>
            <input
              id="editar-insumo-cantidad"
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
            <label htmlFor="editar-insumo-unidad" className="mb-1 block text-sm font-semibold">
              Unidad *
            </label>
            <select
              id="editar-insumo-unidad"
              value={unidad}
              onChange={(event) => setUnidad(event.target.value)}
              required
              className={control}
            >
              {unidadesDisponibles.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="editar-insumo-estado" className="mb-1 block text-sm font-semibold">
              Estado *
            </label>
            <select
              id="editar-insumo-estado"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              className={control}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="editar-insumo-observaciones" className="mb-1 block text-sm font-semibold">
              Observaciones
            </label>
            <textarea
              id="editar-insumo-observaciones"
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
            onClick={onClose}
            className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </Modal>
  )
}