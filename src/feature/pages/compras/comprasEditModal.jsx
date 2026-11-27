import React, { useState } from 'react'
import axios from 'axios'

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

export const CompraEdit = ({ compra, onCancel, onSaved }) => {
  const toDateInput = (value) => value ? new Date(value).toISOString().slice(0, 10) : ''
  const [formData, setFormData] = useState({
    proveedor_id: compra?.proveedorId || '',
    encargado_documento: compra?.encargadoDocumento || '',
    fecha_compra: toDateInput(compra?.fechaCompraOriginal),
    fecha_entrega: toDateInput(compra?.fechaEntregaOriginal),
    bodega_destino: compra?.bodega || 'Bodega principal',
    estado: compra?.estado || 'Pendiente',
    observaciones: compra?.observaciones || ''
  })
  const [guardando, setGuardando] = useState(false)
  const [porcentajeIva, setPorcentajeIva] = useState(compra?.porcentajeIva ?? 19)
  const subtotalCompra = Number(compra?.subtotal || 1010000)
  const ivaCompra = Math.round(subtotalCompra * (Number(porcentajeIva) / 100))
  const totalCompra = subtotalCompra + ivaCompra
  const formatearDinero = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor)

  const handleChange = (event) => {
    setFormData((actual) => ({
      ...actual,
      [event.target.id]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!Number.isFinite(Number(porcentajeIva)) || Number(porcentajeIva) < 0 || Number(porcentajeIva) > 100) {
      return
    }
    setGuardando(true)
    try {
      await axios.put(`http://localhost:5000/api/shopping/${compra.id}`, {
        ...formData,
        proveedor_id: Number(formData.proveedor_id),
        porcentaje_iva: Number(porcentajeIva)
      })
      onSaved?.()
    } catch (error) {
      console.error('Error al editar la compra:', error.response?.data || error.message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Compras › Gestión de compras › Editar compra</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Editar compra N.º {compra?.id}</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">Modifica los datos de la compra y sus productos. Puedes seleccionar el porcentaje de IVA.</p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Datos de la compra */}
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-semibold">Datos de la compra</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="proveedor" label="Proveedor *">
              <select id="proveedor_id" value={formData.proveedor_id} onChange={handleChange} className={control}>
                <option value="">Selecciona un proveedor</option>
                <option value="1">1 · Distribuidora Cosmética Andina S.A.S.</option>
                <option value="2">2 · Aromas y Esencias Ltda.</option>
                <option value="3">3 · Insumos Desechables del Valle S.A.S.</option>
                <option value="4">4 · Natural Spa Suppliers S.A.S.</option>
                <option value="5">5 · Ceras y Aceites Profesionales S.A.S.</option>
              </select>
            </Field>
            <Field id="encargado" label="Encargado *" hint="Persona del equipo que realiza la compra.">
              <select id="encargado_documento" value={formData.encargado_documento} onChange={handleChange} className={control}>
                <option value="">Selecciona un encargado</option>
                <option value="71654321">71654321 · Camilo Herrera Díaz</option>
                <option value="43215678">43215678 · Laura Gómez Restrepo</option>
              </select>
            </Field>
            <Field id="fcompra" label="Fecha de compra *">
              <input id="fecha_compra" type="date" value={formData.fecha_compra} onChange={handleChange} className={control} />
            </Field>
            <Field id="fentrega" label="Fecha de entrega *" hint="No puede ser anterior a la fecha de compra.">
              <input id="fecha_entrega" type="date" value={formData.fecha_entrega} onChange={handleChange} className={control} />
            </Field>
            <Field id="bodega" label="Bodega de destino">
              <select id="bodega_destino" value={formData.bodega_destino} onChange={handleChange} className={control}>
                <option>Bodega principal</option>
                <option>Bodega auxiliar</option>
              </select>
            </Field>
            <Field id="estado" label="Estado *">
              <select id="estado" value={formData.estado} onChange={handleChange} className={control}>
                <option>Pendiente</option>
                <option>Recibida</option>
                <option>Anulada</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field id="obs" label="Observaciones">
                <textarea id="observaciones" rows={3} value={formData.observaciones} onChange={handleChange} className={control} />
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
          <div className="mb-4 ml-auto max-w-sm">
            <Field id="porcentaje_iva" label="Porcentaje de IVA *">
              <input
                id="porcentaje_iva"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={porcentajeIva}
                onChange={(event) => setPorcentajeIva(event.target.value)}
                className={control}
              />
            </Field>
          </div>
          <dl className="ml-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-2">
            <dt className="text-[#6B5A64]">Subtotal</dt><dd className="text-right font-semibold tabular-nums">{formatearDinero(subtotalCompra)}</dd>
            <dt className="text-[#6B5A64]">IVA ({porcentajeIva || 0} %)</dt><dd className="text-right font-semibold tabular-nums">{formatearDinero(ivaCompra)}</dd>
            <dt className="mt-1 border-t border-[#F4D4E0] pt-3 text-lg font-bold">Total</dt>
            <dd className="mt-1 border-t border-[#F4D4E0] pt-3 text-right text-lg font-bold tabular-nums text-[#B83A6E]">{formatearDinero(totalCompra)}</dd>
          </dl>
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#F4D4E0] p-4 sm:flex-row sm:justify-end md:p-6">
          <button type="button" onClick={onCancel} className={`min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] ${focus}`}>Cancelar</button>
          <button type="submit" disabled={guardando} className={`min-h-11 rounded-[10px] bg-[#B83A6E] px-5 text-sm font-semibold text-white hover:brightness-90 disabled:opacity-60 ${focus}`}>{guardando ? 'Guardando...' : 'Guardar cambios'}</button>
        </div>
      </form>
    </section>
  )
}