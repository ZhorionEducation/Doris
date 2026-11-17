import { useState } from 'react'

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

const GestionServiciosForm = ({ categoriasDisponibles, onCancel, onSaved }) => {
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [duracion, setDuracion] = useState('')
  const [precioBase, setPrecioBase] = useState('')
  const [descuento, setDescuento] = useState('0')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const codigoLimpio = codigo.trim()
    const nombreLimpio = nombre.trim()
    const duracionNumero = Number(duracion)
    const precioNumero = Number(precioBase)
    const descuentoNumero = Number(descuento)

    if (!codigoLimpio || !nombreLimpio) {
      setError('El código y el nombre son obligatorios.')
      return
    }

    if (
      !Number.isFinite(duracionNumero) ||
      duracionNumero <= 0 ||
      !Number.isFinite(precioNumero) ||
      precioNumero < 0 ||
      !Number.isFinite(descuentoNumero) ||
      descuentoNumero < 0 ||
      descuentoNumero > 100
    ) {
      setError('Revisa la duración, el precio y el descuento.')
      return
    }

    onSaved({
      codigo: codigoLimpio,
      nombre: nombreLimpio,
      categoria,
      duracion: duracionNumero,
      precioBase: precioNumero,
      descuento: descuentoNumero,
      descripcion: descripcion.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
        <div>
          <label htmlFor="servicio-codigo" className="mb-1 block text-sm font-semibold">
            Código *
          </label>
          <input
            id="servicio-codigo"
            value={codigo}
            onChange={(event) => {
              setCodigo(event.target.value)
              setError('')
            }}
            maxLength={30}
            required
            className={control}
          />
        </div>

        <div>
          <label htmlFor="servicio-nombre" className="mb-1 block text-sm font-semibold">
            Nombre *
          </label>
          <input
            id="servicio-nombre"
            value={nombre}
            onChange={(event) => {
              setNombre(event.target.value)
              setError('')
            }}
            maxLength={100}
            required
            className={control}
          />
        </div>

        <div>
          <label htmlFor="servicio-categoria" className="mb-1 block text-sm font-semibold">
            Categoría *
          </label>
          <select
            id="servicio-categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            required
            className={control}
          >
            <option value="">Selecciona una categoría</option>
            {categoriasDisponibles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="servicio-duracion" className="mb-1 block text-sm font-semibold">
            Duración (minutos) *
          </label>
          <input
            id="servicio-duracion"
            type="number"
            min="1"
            step="1"
            value={duracion}
            onChange={(event) => setDuracion(event.target.value)}
            required
            className={control}
          />
        </div>

        <div>
          <label htmlFor="servicio-precio" className="mb-1 block text-sm font-semibold">
            Precio base (COP) *
          </label>
          <input
            id="servicio-precio"
            type="number"
            min="0"
            step="1000"
            value={precioBase}
            onChange={(event) => setPrecioBase(event.target.value)}
            required
            className={control}
          />
        </div>

        <div>
          <label htmlFor="servicio-descuento" className="mb-1 block text-sm font-semibold">
            Descuento (%)
          </label>
          <input
            id="servicio-descuento"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={descuento}
            onChange={(event) => setDescuento(event.target.value)}
            className={control}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="servicio-descripcion" className="mb-1 block text-sm font-semibold">
            Descripción
          </label>
          <textarea
            id="servicio-descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
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
          Guardar servicio
        </button>
      </div>
    </form>
  )
}

export default GestionServiciosForm