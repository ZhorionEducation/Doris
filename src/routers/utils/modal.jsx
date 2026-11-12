import { useEffect } from 'react'

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#3D2C33]/50 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative my-auto w-full max-w-4xl rounded-xl bg-[#FDF6F8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F4D4E0] px-4 py-3 md:px-6">
          <h2 id="modal-title" className="text-xl font-bold text-[#3D2C33]">{title}</h2>
          <button
            type="button"
            title="Cerrar"
            aria-label="Cerrar"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-[10px] text-2xl leading-none text-[#6B5A64] hover:bg-[#F4D4E0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal