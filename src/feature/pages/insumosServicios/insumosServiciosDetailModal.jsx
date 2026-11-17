import Modal from '../../../routers/utils/modal'

const Dato = ({ etiqueta, children }) => (
  <div>
    <dt className="text-[13px] text-[#6B5A64]">{etiqueta}</dt>
    <dd className="font-semibold">{children}</dd>
  </div>
)

export const InsumosServiciosDetailModal = ({ registro, onClose }) => (
  <Modal title="Detalle de insumo del servicio" onClose={onClose}>
    <div className="space-y-5 p-4 text-[15px] text-[#3D2C33] md:p-6">
      <dl className="grid gap-4 sm:grid-cols-2">
        <Dato etiqueta="Servicio">{registro.servicio}</Dato>
        <Dato etiqueta="Insumo">{registro.insumo}</Dato>
        <Dato etiqueta="Cantidad">
          {registro.cantidad} {registro.unidad}
        </Dato>
        <Dato etiqueta="Estado">{registro.estado}</Dato>
        <div className="sm:col-span-2">
          <Dato etiqueta="Observaciones">
            {registro.observaciones || 'Sin observaciones'}
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