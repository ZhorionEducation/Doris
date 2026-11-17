import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`

export const CategoriasProductosEditModal = ({ categoria, onClose, onSaved }) => {
  const [nombre, setNombre] = useState(categoria.nombre)
  const [descripcion, setDescripcion] = useState(categoria.descripcion)
  const [activa, setActiva] = useState(categoria.activa)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nombreLimpio = nombre.trim()
    if (!nombreLimpio) {
      setError('El nombre es obligatorio.')
      return
    }

    onSaved({
      ...categoria,
      nombre: nombreLimpio,
      descripcion: descripcion.trim(),
      activa,
    })
  }

  return (
    <Modal title="Editar categoría" onClose={onClose}>
      <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
        <div className="space-y-4 p-4 md:p-6">
          <div>
            <label htmlFor="editar-nombre-categoria" className="mb-1 block text-sm font-semibold">
              Nombre *
            </label>
            <input
              id="editar-nombre-categoria"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value)
                setError('')
              }}
              maxLength={100}
              required
              className={control}
            />
            {error && <p role="alert" className="mt-1 text-sm text-[#B3261E]">{error}</p>}
          </div>

          <div>
            <label htmlFor="editar-descripcion-categoria" className="mb-1 block text-sm font-semibold">
              Descripción
            </label>
            <textarea
              id="editar-descripcion-categoria"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              rows={3}
              className={control}
            />
          </div>

          <div>
            <label htmlFor="editar-estado-categoria" className="mb-1 block text-sm font-semibold">
              Estado
            </label>
            <select
              id="editar-estado-categoria"
              value={activa ? 'Activa' : 'Inactiva'}
              onChange={(event) => setActiva(event.target.value === 'Activa')}
              className={control}
            >
              <option>Activa</option>
              <option>Inactiva</option>
            </select>
          </div>
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