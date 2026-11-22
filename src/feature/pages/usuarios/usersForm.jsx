import React, { useState } from 'react'
import axios from 'axios'

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
  const [formData, setFormData] = useState({
    tipo_documento: '',
    numero_documento: '',
    nombres: '',
    apellidos: '',
    alergias: '',
    telefono: '',
    direccion: '',
    email: '',
    rol_codigo: '',
    contrasena: '',
    fecha_ingreso: '',
    estado: 'Activo'
  })

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.id]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        ...formData,
        contrasena: formData.contrasena.trim() || null,
        telefono: formData.telefono.trim() || null,
        direccion: formData.direccion.trim() || null,
        alergias: formData.alergias.trim() || null,
        fecha_ingreso: formData.fecha_ingreso || null
      }

      const apiUrl = 'http://localhost:5000/api/users'
      await axios.post(apiUrl, payload)
      console.log('Datos enviados correctamente:', payload)
      onSaved?.()
    } catch (error) {
      console.error('Error al enviar los datos:', error, formData)
      
    }
   
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
            <Field id="tipo_documento" label="Tipo de documento *">
              <select id="tipo_documento" value={formData.tipo_documento} onChange={handleChange} required className={control}>
                <option value="">Selecciona un tipo de documento</option>
                <option value="CC">Cédula de ciudadanía (CC)</option>
                <option value="CE">Cédula de extranjería (CE)</option>
                <option value="TI">Tarjeta de identidad (TI)</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </Field>
            <Field id="numero_documento" label="Número de documento *" hint="Es el identificador único de la persona.">
              <input id="numero_documento" value={formData.numero_documento} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]{6,10}" title="Ingresa entre 6 y 10 dígitos." required placeholder="Ej: 1020456789" className={control} />
            </Field>
            <Field id="nombres" label="Nombres *">
              <input id="nombres" value={formData.nombres} onChange={handleChange} type="text" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,50}" title="Ingresa entre 2 y 50 letras." required placeholder="Ej: Andrés" className={control} />
            </Field>
            <Field id="apellidos" label="Apellidos *">
              <input id="apellidos" value={formData.apellidos} onChange={handleChange} type="text" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,50}" title="Ingresa entre 2 y 50 letras." required placeholder="Ej: Ríos Londoño" className={control} />
            </Field>
            <Field id="alergias" label="Alergias" hint="Si no tiene, escriba 'Ninguna'.">
              <input id="alergias" value={formData.alergias} onChange={handleChange} type="text" placeholder="Ej: Ninguna" className={control} />
            </Field>
            <Field id="telefono" label="Teléfono">
              <input id="telefono" value={formData.telefono} onChange={handleChange} type="tel" inputMode="numeric" pattern="[0-9]{7,10}" title="Ingresa entre 7 y 10 dígitos." placeholder="Ej: 3115678901" className={control} />
            </Field>
            <Field id="direccion" label="Dirección">
              <input id="direccion" value={formData.direccion} onChange={handleChange} type="text" placeholder="Ej: Cl 33 #65-10" className={control} />
            </Field>
          </div>
        </div>

        <hr className="border-0 border-t border-[#F4D4E0]" />

        {/* Cuenta y acceso */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Cuenta y acceso</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="email" label="Correo electrónico *">
              <input id="email" value={formData.email} onChange={handleChange} type="email" required placeholder="nombre@doris.com" className={control} />
            </Field>
            <Field id="rol_codigo" label="Rol *" hint="El rol define qué módulos puede usar.">
              <select id="rol_codigo" value={formData.rol_codigo} onChange={handleChange} required defaultValue="" className={control}>
                <option value="" disabled>Selecciona un rol</option>
                <option value="ADM">Administrador</option>
                <option value="GER">Gerente</option>
                <option value="VEN">Vendedor</option>
                <option value="AUX">Auxiliar de compras</option>
                <option value="EST">Esteticista</option>
                <option value="CLI">Cliente</option>
              </select>
            </Field>
            <Field id="contrasena" label="Contraseña" hint="Solo para el personal. Los clientes no inician sesión.">
              <input id="contrasena" value={formData.contrasena} onChange={handleChange} type="password" minLength={8} pattern=".{8,}" title="La contraseña debe tener al menos 8 caracteres." placeholder="Mínimo 8 caracteres" className={control} />
            </Field>
            <Field id="fecha_ingreso" label="Fecha de ingreso" hint="Solo para empleados.">
              <input id="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} type="date" className={control} />
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" value={formData.estado} onChange={handleChange} required className={control}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
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