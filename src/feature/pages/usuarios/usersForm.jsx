import React from 'react'

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

// Etiqueta + campo + texto de ayuda
const Field = ({ id, label, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label>
    {children}
    {hint && <p className="mt-1 text-[13px] text-[#6B5A64]">{hint}</p>}
  </div>
)

const UserForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="p-4 md:p-6">
        <p className="text-[#6B5A64]">Completa los datos. Los campos con * son obligatorios.</p>
      </div>
        {/* Datos personales */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Datos personales</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="tipo" label="Tipo de documento *">
              <select id="tipo" className={control}>
                <option>Cédula de ciudadanía (CC)</option>
                <option>Cédula de extranjería (CE)</option>
                <option>Tarjeta de identidad (TI)</option>
                <option>Pasaporte</option>
              </select>
            </Field>
            <Field id="documento" label="Número de documento *" hint="Es el identificador único de la persona.">
              <input id="documento" type="text" inputMode="numeric" placeholder="Ej: 1020456789" className={control} />
            </Field>
            <Field id="nombres" label="Nombres *">
              <input id="nombres" type="text" placeholder="Ej: Andrés" className={control} />
            </Field>
            <Field id="apellidos" label="Apellidos *">
              <input id="apellidos" type="text" placeholder="Ej: Ríos Londoño" className={control} />
            </Field>
            <Field id="telefono" label="Teléfono">
              <input id="telefono" type="tel" placeholder="Ej: 3115678901" className={control} />
            </Field>
            <Field id="direccion" label="Dirección">
              <input id="direccion" type="text" placeholder="Ej: Cl 33 #65-10" className={control} />
            </Field>
          </div>
        </div>

        <hr className="border-0 border-t border-[#F4D4E0]" />

        {/* Cuenta y acceso */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Cuenta y acceso</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="email" label="Correo electrónico *">
              <input id="email" type="email" placeholder="nombre@doris.com" className={control} />
            </Field>
            <Field id="rol" label="Rol *" hint="El rol define qué módulos puede usar.">
              <select id="rol" className={control}>
                <option>Selecciona un rol</option>
                <option>Administrador</option>
                <option>Gerente</option>
                <option>Vendedor</option>
                <option>Auxiliar de compras</option>
                <option>Esteticista</option>
                <option>Cliente</option>
              </select>
            </Field>
            <Field id="contrasena" label="Contraseña" hint="Solo para el personal. Los clientes no inician sesión.">
              <input id="contrasena" type="password" placeholder="Mínimo 8 caracteres" className={control} />
            </Field>
            <Field id="ingreso" label="Fecha de ingreso" hint="Solo para empleados.">
              <input id="ingreso" type="date" className={control} />
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" className={control}>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </Field>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>
            Cancelar
          </button>
          <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            Guardar
          </button>
        </div>
    </form>
  )
}

export default UserForm