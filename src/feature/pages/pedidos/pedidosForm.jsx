import React from 'react'

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

// Datos de ejemplo del pedido (solo diseño)
const productos = [
  { nombre: 'Crema hidratante facial 250 ml', cantidad: 2, valor: 52000, subtotal: '$ 104.000' },
  { nombre: 'Aceite de almendras 500 ml', cantidad: 1, valor: 60000, subtotal: '$ 60.000' },
]
const servicios = [
  { nombre: 'Limpieza facial profunda', cantidad: 1, valor: 90000, subtotal: '$ 90.000' },
  { nombre: 'Masaje relajante', cantidad: 1, valor: 120000, subtotal: '$ 120.000' },
]
const opcionesProductos = ['Crema hidratante facial 250 ml', 'Aceite de almendras 500 ml', 'Mascarilla de arcilla 1 kg', 'Toallas desechables x50']
const opcionesServicios = ['Limpieza facial profunda', 'Masaje relajante', 'Masaje descontracturante', 'Hidratación corporal']

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
)
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
)

// Etiqueta + campo
const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label>
    {children}
  </div>
)



// Columnas de las filas de detalle: nombre, cantidad, valor unitario, subtotal y quitar
const columnas = 'md:grid-cols-[1fr_110px_150px_150px_44px]'
const etiquetaMovil = 'mb-1 block text-[13px] text-[#6B5A64] md:hidden'

// Bloque de detalle reutilizado para productos y servicios
const Detalle = ({ titulo, columna, opciones, filas, agregar, prefijo }) => (
  <div className="p-4 md:p-6">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      <button type="button" className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#B83A6E] bg-white px-4 text-sm font-semibold text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`}>
        <IconPlus /> {agregar}
      </button>
    </div>

    {/* Encabezados (solo escritorio) */}
    <div className={`hidden gap-3 px-1 pb-2 text-[13px] font-semibold text-[#6B5A64] md:grid ${columnas}`}>
      <span>{columna}</span><span>Cantidad</span><span>Valor unitario</span><span className="text-right">Subtotal</span><span />
    </div>

    <div className="space-y-3">
      {filas.map((f, i) => (
        <div key={f.nombre} className={`grid gap-3 rounded-xl border border-[#F4D4E0] p-3 md:items-center md:border-0 md:p-0 ${columnas}`}>
          <div>
            <span className={etiquetaMovil}>{columna}</span>
            <select aria-label={columna} defaultValue={f.nombre} className={control}>
              {opciones.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <span className={etiquetaMovil}>Cantidad</span>
            <input type="number" min="1" aria-label="Cantidad" defaultValue={f.cantidad} className={control} />
          </div>
          <div>
            <span className={etiquetaMovil}>Valor unitario</span>
            <input type="text" inputMode="numeric" aria-label="Valor unitario" defaultValue={f.valor.toLocaleString('es-CO')} className={`${control} tabular-nums`} />
          </div>
          <div>
            <span className={etiquetaMovil}>Subtotal</span>
            <p className="font-semibold tabular-nums md:text-right">{f.subtotal}</p>
          </div>
          <button type="button" aria-label={`Quitar ${prefijo} ${i + 1}`} title="Quitar" className={`grid h-11 w-11 place-items-center justify-self-end rounded-[10px] border border-[#F4D4E0] bg-white text-[#B3261E] hover:bg-[#F4D4E0] ${focus}`}>
            <IconTrash />
          </button>
        </div>
      ))}
    </div>
  </div>
)

const separador = <hr className="border-0 border-t border-[#F4D4E0]" />

export const PedidoForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="p-4 md:p-6">
        <p className="text-[#6B5A64]">Registra los datos del pedido y agrega los productos y servicios. Los totales se calculan con el IVA del 19 %.</p>
      </div>
        {/* Datos del pedido */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Datos del pedido</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="cliente" label="Cliente *">
              <select id="cliente" className={control}>
                <option>Selecciona un cliente</option>
                <option>1017890123 · Sebastián Muñoz Osorio</option>
                <option>1152345678 · Daniela Cárdenas Mejía</option>
                <option>1001234567 · Juliana Vélez Pineda</option>
              </select>
            </Field>
            <Field id="vendedor" label="Vendedor *">
              <select id="vendedor" className={control}>
                <option>Selecciona un vendedor</option>
                <option>1020456789 · Andrés Ríos Londoño</option>
                <option>1036789012 · Marcela Torres Salazar</option>
              </select>
            </Field>
            <Field id="fecha" label="Fecha del pedido *">
              <input id="fecha" type="date" className={control} />
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" className={control}>
                <option>Pendiente</option>
                <option>Confirmado</option>
                <option>Venta</option>
                <option>Anulado</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field id="direccion" label="Dirección de entrega">
                <input id="direccion" type="text" placeholder="Ej: Cl 10 #35-20 Apto 301" className={control} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field id="obs" label="Observaciones">
                <textarea id="obs" rows={3} placeholder="Notas para el pedido" className={control} />
              </Field>
            </div>
          </div>
        </div>

        {separador}
        <Detalle titulo="Productos" columna="Producto" opciones={opcionesProductos} filas={productos} agregar="Agregar producto" prefijo="producto" />
        {separador}
        <Detalle titulo="Servicios" columna="Servicio" opciones={opcionesServicios} filas={servicios} agregar="Agregar servicio" prefijo="servicio" />
        {separador}

        {/* Resumen de valores */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
          <dl className="ml-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-2">
            <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">$ 374.000</dd>
            <dt className="text-[#6B5A64]">IVA (19 %)</dt><dd className="text-right font-semibold tabular-nums">$ 71.060</dd>
            <dt className="mt-1 border-t border-[#F4D4E0] pt-3 text-lg font-bold">Total</dt>
            <dd className="mt-1 border-t border-[#F4D4E0] pt-3 text-right text-lg font-bold tabular-nums text-[#B83A6E]">$ 445.060</dd>
          </dl>
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
          <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar pedido</button>
        </div>
    </form>
  )
}