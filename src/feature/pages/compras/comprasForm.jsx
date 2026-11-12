import React from 'react'

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const control = `min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-base text-[#3D2C33] ${focus}`

// Datos de ejemplo de la compra (solo diseño)
const productos = [
  { nombre: 'Crema hidratante facial 250 ml', cantidad: 20, valor: 28000, subtotal: '$ 560.000' },
  { nombre: 'Mascarilla de arcilla 1 kg', cantidad: 10, valor: 45000, subtotal: '$ 450.000' },
]
const opcionesProductos = ['Crema hidratante facial 250 ml', 'Aceite de almendras 500 ml', 'Mascarilla de arcilla 1 kg', 'Toallas desechables x50']

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
)
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
)

// Etiqueta + campo + texto de ayuda
const Field = ({ id, label, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label>
    {children}
    {hint && <p className="mt-1 text-[13px] text-[#6B5A64]">{hint}</p>}
  </div>
)

// Columnas de las filas de detalle: producto, cantidad, costo unitario, subtotal y quitar
const columnas = 'md:grid-cols-[1fr_110px_150px_150px_44px]'
const etiquetaMovil = 'mb-1 block text-[13px] text-[#6B5A64] md:hidden'
const separador = <hr className="border-0 border-t border-[#F4D4E0]" />

export const CompraForm = ({ onCancel, onSaved }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="text-[15px] text-[#3D2C33]">
      <div className="p-4 md:p-6">
        <p className="text-[#6B5A64]">Registra los datos de la compra y los productos que se piden al proveedor. Los totales se calculan con el IVA del 19 %.</p>
      </div>
        {/* Datos de la compra */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Datos de la compra</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="proveedor" label="Proveedor *">
              <select id="proveedor" className={control}>
                <option>Selecciona un proveedor</option>
                <option>900123456-1 · Distribuidora Cosmética Andina S.A.S.</option>
                <option>800234567-2 · Aromas y Esencias Ltda.</option>
                <option>901345678-3 · Insumos Desechables del Valle S.A.S.</option>
              </select>
            </Field>
            <Field id="encargado" label="Encargado *" hint="Persona del equipo que realiza la compra.">
              <select id="encargado" className={control}>
                <option>Selecciona un encargado</option>
                <option>71654321 · Camilo Herrera Díaz</option>
                <option>43215678 · Laura Gómez Restrepo</option>
              </select>
            </Field>
            <Field id="fcompra" label="Fecha de compra *">
              <input id="fcompra" type="date" className={control} />
            </Field>
            <Field id="fentrega" label="Fecha de entrega *" hint="No puede ser anterior a la fecha de compra.">
              <input id="fentrega" type="date" className={control} />
            </Field>
            <Field id="bodega" label="Bodega de destino">
              <select id="bodega" className={control}>
                <option>Bodega principal</option>
                <option>Bodega auxiliar</option>
              </select>
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" className={control}>
                <option>Pendiente</option>
                <option>Recibida</option>
                <option>Anulada</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field id="obs" label="Observaciones">
                <textarea id="obs" rows={3} placeholder="Notas para la compra" className={control} />
              </Field>
            </div>
          </div>
        </div>

        {separador}

        {/* Productos de la compra */}
        <div className="p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Productos</h2>
            <button type="button" className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#B83A6E] bg-white px-4 text-sm font-semibold text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`}>
              <IconPlus /> Agregar producto
            </button>
          </div>

          {/* Encabezados (solo escritorio) */}
          <div className={`hidden gap-3 px-1 pb-2 text-[13px] font-semibold text-[#6B5A64] md:grid ${columnas}`}>
            <span>Producto</span><span>Cantidad</span><span>Costo unitario</span><span className="text-right">Subtotal</span><span />
          </div>

          <div className="space-y-3">
            {productos.map((f, i) => (
              <div key={f.nombre} className={`grid gap-3 rounded-xl border border-[#F4D4E0] p-3 md:items-center md:border-0 md:p-0 ${columnas}`}>
                <div>
                  <span className={etiquetaMovil}>Producto</span>
                  <select aria-label="Producto" defaultValue={f.nombre} className={control}>
                    {opcionesProductos.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <span className={etiquetaMovil}>Cantidad</span>
                  <input type="number" min="1" aria-label="Cantidad" defaultValue={f.cantidad} className={control} />
                </div>
                <div>
                  <span className={etiquetaMovil}>Costo unitario</span>
                  <input type="text" inputMode="numeric" aria-label="Costo unitario" defaultValue={f.valor.toLocaleString('es-CO')} className={`${control} tabular-nums`} />
                </div>
                <div>
                  <span className={etiquetaMovil}>Subtotal</span>
                  <p className="font-semibold tabular-nums md:text-right">{f.subtotal}</p>
                </div>
                <button type="button" aria-label={`Quitar producto ${i + 1}`} title="Quitar" className={`grid h-11 w-11 place-items-center justify-self-end rounded-[10px] border border-[#F4D4E0] bg-white text-[#B3261E] hover:bg-[#F4D4E0] ${focus}`}>
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {separador}

        {/* Resumen de valores */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
          <dl className="ml-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-2">
            <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">$ 1.010.000</dd>
            <dt className="text-[#6B5A64]">IVA (19 %)</dt><dd className="text-right font-semibold tabular-nums">$ 191.900</dd>
            <dt className="mt-1 border-t border-[#F4D4E0] pt-3 text-lg font-bold">Total</dt>
            <dd className="mt-1 border-t border-[#F4D4E0] pt-3 text-right text-lg font-bold tabular-nums text-[#B83A6E]">$ 1.201.900</dd>
          </dl>
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
          <button type="submit" className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>Guardar compra</button>
        </div>
    </form>
  )
}