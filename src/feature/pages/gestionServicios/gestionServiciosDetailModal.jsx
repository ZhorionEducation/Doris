import Modal from '../../../routers/utils/modal'

const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor)

const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

export const GestionServiciosDetailModal = ({ servicio, onClose }) => (
  <Modal title="Detalle del servicio" onClose={onClose}>
    <div className="space-y-5 p-4 text-[15px] text-[#3D2C33] md:p-6">
      <dl className="grid gap-4 sm:grid-cols-2">
        <Dato etiqueta="Código">{servicio.codigo}</Dato>
        <Dato etiqueta="Nombre">{servicio.nombre}</Dato>
        <Dato etiqueta="Categoría">{servicio.categoria}</Dato>
        <Dato etiqueta="Duración">{servicio.duracion} minutos</Dato>
        <Dato etiqueta="Precio base">{formatoPrecio(servicio.precioBase)}</Dato>
        <Dato etiqueta="Descuento">{servicio.descuento} %</Dato>
        <div className="sm:col-span-2">
          <Dato etiqueta="Descripción">
            {servicio.descripcion || 'Sin descripción'}
          </Dato>
        </div>
      </dl>

      <div className="flex justify-end border-t border-[#F4D4E0] pt-4">
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-[10px] border border-[#F4D4E0] bg-white px-5 text-sm font-semibold hover:bg-[#F4D4E0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]"
        >
          Cerrar
        </button>
      </div>
    </div>
  </Modal>
)