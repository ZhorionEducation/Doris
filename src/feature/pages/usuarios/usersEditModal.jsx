import React from 'react'

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`
const bloqueado = `${control} disabled:cursor-not-allowed disabled:bg-[#F9E8EE] disabled:text-[#6B5A64]`

// Etiqueta + campo + texto de ayuda
const Field = ({ id, label, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label>
    {children}
    {hint && <p className="mt-1 text-[13px] text-[#6B5A64]">{hint}</p>}
  </div>
)

const UserEdit = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Usuarios › Gestión de usuarios › Editar usuario</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Editar usuario</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">Modifica los datos que necesites. El documento no se puede cambiar porque identifica a la persona.</p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Datos personales */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Datos personales</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="tipo" label="Tipo de documento *">
              <select id="tipo" defaultValue="Cédula de ciudadanía (CC)" disabled className={bloqueado}>
                <option>Cédula de ciudadanía (CC)</option>
                <option>Cédula de extranjería (CE)</option>
                <option>Tarjeta de identidad (TI)</option>
                <option>Pasaporte</option>
              </select>
            </Field>
            <Field id="documento" label="Número de documento *" hint="Identifica a la persona y no se puede cambiar.">
              <input id="documento" type="text" inputMode="numeric" defaultValue="1020456789" disabled className={bloqueado} />
            </Field>
            <Field id="nombres" label="Nombres *">
              <input id="nombres" type="text" defaultValue="Andrés" className={control} />
            </Field>
            <Field id="apellidos" label="Apellidos *">
              <input id="apellidos" type="text" defaultValue="Ríos Londoño" className={control} />
            </Field>
            <Field id="telefono" label="Teléfono">
              <input id="telefono" type="tel" defaultValue="3115678901" className={control} />
            </Field>
            <Field id="direccion" label="Dirección">
              <input id="direccion" type="text" defaultValue="Cl 33 #65-10" className={control} />
            </Field>
          </div>
        </div>

        <hr className="border-0 border-t border-[#F4D4E0]" />

        {/* Cuenta y acceso */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Cuenta y acceso</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="email" label="Correo electrónico *">
              <input id="email" type="email" defaultValue="andres.rios@doris.com" className={control} />
            </Field>
            <Field id="rol" label="Rol *" hint="El rol define qué módulos puede usar.">
              <select id="rol" defaultValue="Vendedor" className={control}>
                <option>Selecciona un rol</option>
                <option>Administrador</option>
                <option>Gerente</option>
                <option>Vendedor</option>
                <option>Auxiliar de compras</option>
                <option>Esteticista</option>
                <option>Cliente</option>
              </select>
            </Field>
            <Field id="contrasena" label="Contraseña" hint="Solo escribe una contraseña si quieres cambiarla.">
              <input id="contrasena" type="password" placeholder="Dejar vacío para no cambiarla" className={control} />
            </Field>
            <Field id="ingreso" label="Fecha de ingreso" hint="Solo para empleados.">
              <input id="ingreso" type="date" defaultValue="2022-05-10" className={control} />
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" defaultValue="Activo" className={control}>
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
            Guardar cambios
          </button>
        </div>
      </form>
    </section>
  )
}

export default UserEdit