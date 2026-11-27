import React from 'react'
import { useNavigate } from 'react-router-dom';


// Iconos de línea (trazo 1.8)
const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
)
const IconFlower = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="6.5" r="3" /><circle cx="12" cy="17.5" r="3" /><circle cx="6.5" cy="12" r="3" /><circle cx="17.5" cy="12" r="3" /><circle cx="12" cy="12" r="1.5" />
  </Svg>
)
const IconMail = () => <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>
const IconLock = () => <Svg><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></Svg>
const IconEye = () => <Svg><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
const IconCheck = () => <Svg className="h-5 w-5 shrink-0"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg>

const focus = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]'
const campo = `min-h-12 w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white py-2.5 pl-11 text-base text-[#3D2C33] placeholder:text-[#6B5A64] ${focus}`

const beneficios = [
  'Agenda de citas sin cruces de horarios',
  'Control de stock y de insumos por servicio',
  'Ventas de servicios y productos en un solo lugar',
]

export const Login = () => {
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()
    navigate('/usuarios')
  }

  return (
    <main className="grid min-h-screen bg-[#F9E8EE] text-[#3D2C33] lg:grid-cols-2">
      {/* Panel de marca (solo pantallas grandes) */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#B83A6E] to-[#8E2C55] p-12 text-white lg:flex">
        {/* Decoración suave */}
        <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E8A0BF]/25" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#E8A0BF]/20" aria-hidden="true" />

        <div className="relative flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F8C9DA] text-[#B83A6E]"><IconFlower className="h-7 w-7" /></span>
          <span className="text-2xl font-bold">DORIS</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Bienvenida a tu centro de estética y bienestar</h2>
          <p className="mt-4 text-lg text-white/90">Organiza compras, servicios y ventas sin papel ni cuadernos.</p>
          <ul className="mt-8 space-y-3">
            {beneficios.map((b) => (
              <li key={b} className="flex items-center gap-3"><IconCheck />{b}</li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/80">Desarrollo Operativo de Recursos e Información de Stock</p>
      </section>

      {/* Formulario */}
      <section className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Marca (solo celular y tablet) */}
          <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F8C9DA] text-[#B83A6E]"><IconFlower className="h-6 w-6" /></span>
            <span className="text-2xl font-bold">DORIS</span>
          </div>

          <div className="rounded-2xl border border-[#F4D4E0] bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Iniciar sesión</h1>
            <p className="mt-1 text-[#6B5A64]">Ingresa con tu correo y tu contraseña.</p>

            <form className="mt-6 space-y-5" onSubmit={submitForm}>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold">Correo electrónico</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconMail /></span>
                  <input id="email" type="email" autoComplete="email" placeholder="nombre@doris.com" className={campo} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold">Contraseña</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconLock /></span>
                  <input id="password" type="password" autoComplete="current-password" placeholder="Tu contraseña" className={`${campo} pr-12`} />
                  <button type="button" aria-label="Mostrar contraseña" title="Mostrar contraseña" className={`absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-[#6B5A64] hover:bg-[#F4D4E0] ${focus}`}>
                    <IconEye />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex min-h-11 cursor-pointer items-center gap-2">
                  <input type="checkbox" className={`h-5 w-5 accent-[#B83A6E] ${focus}`} />
                  Recordarme
                </label>
                <a href="#" className={`font-semibold text-[#B83A6E] underline ${focus}`}>¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className={`min-h-12 w-full rounded-[10px] bg-[#B83A6E] text-base font-semibold text-white hover:brightness-90 ${focus}`}>
                Iniciar sesión
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[13px] text-[#6B5A64]">&copy; 2026 DORIS. Todos los derechos reservados.</p>
        </div>
      </section>
    </main>
  )
}