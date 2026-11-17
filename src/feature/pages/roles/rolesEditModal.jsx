import { useState } from 'react'
import Modal from '../../../routers/utils/modal'

const focus =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'

const control =
  `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

export const RolesEditModal = ({ rol, permisosDisponibles, onClose, onSaved }) => {
  const [codigo, setCodigo] = useState(rol.codigo)
  const [nombre, setNombre] = useState(rol.nombre)
  const [descripcion, setDescripcion] = useState(rol.descripcion)
  const [activo, setActivo] = useState(rol.activo)
  const [permisosAsignados, setPermisosAsignados] = useState(rol.permisosAsignados)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!codigo.trim() || !nombre.trim()) {
      setError('El código y el nombre son obligatorios.')
      return
    }

    if (permisosAsignados.length === 0) {
      setError('Selecciona al menos un permiso.')
      return
    }

    onSaved({
      ...rol,
      codigo: codigo.trim(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      activo,
      permisosAsignados,
    })
  }

  return (
    <Modal title="Editar rol" onClose={onClose}>
      <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
          <div>
            <label htmlFor="editar-rol-codigo" className="mb-1 block text-sm font-semibold">
              Código *
            </label>
            <input
              id="editar-rol-codigo"
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
            <label htmlFor="editar-rol-nombre" className="mb-1 block text-sm font-semibold">
              Nombre *
            </label>
            <input
              id="editar-rol-nombre"
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

          <div className="md:col-span-2">
            <label htmlFor="editar-rol-descripcion" className="mb-1 block text-sm font-semibold">
              Descripción
            </label>
            <textarea
              id="editar-rol-descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              rows={3}
              className={control}
            />
          </div>

          <div>
            <label htmlFor="editar-rol-estado" className="mb-1 block text-sm font-semibold">
              Estado *
            </label>
            <select
              id="editar-rol-estado"
              value={activo ? 'Activo' : 'Inactivo'}
              onChange={(event) => setActivo(event.target.value === 'Activo')}
              className={control}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="editar-rol-permisos" className="mb-1 block text-sm font-semibold">
              Permisos asignados *
            </label>
            <select
              id="editar-rol-permisos"
              multiple
              required
              value={permisosAsignados}
              onChange={(event) => {
                setPermisosAsignados(
                  Array.from(event.target.selectedOptions, (option) => option.value)
                )
                setError('')
              }}
              className={`${control} min-h-32`}
            >
              {permisosDisponibles.map((permiso) => (
                <option key={permiso} value={permiso}>
                  {permiso}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[13px] text-[#6B5A64]">
              Usa Ctrl o Cmd para seleccionar varios permisos.
            </p>
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