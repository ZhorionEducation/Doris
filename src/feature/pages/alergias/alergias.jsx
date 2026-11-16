
import React, { useState } from "react";

const alergiasIniciales = [
  {
    id: 1,
    nombre: "Alergia al látex",
    descripcion: "Reacción al contacto con productos de látex.",
    nivel_riesgo: "Alto",
    observaciones: "Evitar guantes y materiales con látex.",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Alergia a fragancias",
    descripcion: "Sensibilidad a perfumes y fragancias.",
    nivel_riesgo: "Medio",
    observaciones: "Utilizar productos sin fragancia.",
    estado: "Activo",
  },
 
{
  id: 3,
  nombre: "Alergia a parabenos",
  descripcion: "Reacción alérgica a conservantes como los parabenos presentes en algunos productos cosméticos.",
  nivel_riesgo: "Medio",
  observaciones: "Revisar las etiquetas y evitar productos que contengan parabenos si se ha identificado sensibilidad a ellos.",
  estado: "Activo",
},

  {
  id: 4,
  nombre: "Alergia a colorantes",
  descripcion: "Reacción al contacto con colorantes presentes en productos cosméticos.",
  nivel_riesgo: "Medio",
  observaciones: "Evitar productos que contengan colorantes artificiales.",
  estado: "Activo",
},
{
  id: 5,
  nombre: "Alergia a conservantes",
  descripcion: "Reacción alérgica a conservantes utilizados en productos de belleza.",
  nivel_riesgo: "Alto",
  observaciones: "Revisar los ingredientes y utilizar productos libres de conservantes que causen sensibilidad.",
  estado: "Activo",
},
];

const formularioInicial = {
  nombre: "",
  descripcion: "",
  nivel_riesgo: "Bajo",
  observaciones: "",
  estado: "Activo",
};

// Iconos de presentación (sin alterar la lógica del módulo)
const SvgAlergia = ({ children }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">{children}</svg>;
const IconoMas = () => <SvgAlergia><path d="M12 5v14M5 12h14" /></SvgAlergia>;
const IconoBuscar = () => <SvgAlergia><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></SvgAlergia>;
const IconoEditar = () => <SvgAlergia><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></SvgAlergia>;
const IconoEliminar = () => <SvgAlergia><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></SvgAlergia>;
const IconoCerrar = () => <SvgAlergia><path d="M6 6l12 12M18 6L6 18" /></SvgAlergia>;
const enfoqueAlergia = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]";
const campoAlergia = `w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] font-normal text-[#3D2C33] outline-none focus:border-[#B83A6E] ${enfoqueAlergia}`;
const botonIconoAlergia = `grid h-9 w-9 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${enfoqueAlergia}`;

export const Alergias = () => {
  const [alergias, setAlergias] = useState(alergiasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);

  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const abrirNuevo = () => {
    setFormulario({ ...formularioInicial });
    setEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (alergia) => {
    setFormulario({
      nombre: alergia.nombre,
      descripcion: alergia.descripcion,
      nivel_riesgo: alergia.nivel_riesgo,
      observaciones: alergia.observaciones,
      estado: alergia.estado,
    });

    setEditando(alergia.id);
    setModalAbierto(true);
  };

  const guardarAlergia = (e) => {
    e.preventDefault();

    if (editando !== null) {
      setAlergias((anteriores) =>
        anteriores.map((alergia) =>
          alergia.id === editando
            ? { ...formulario, id: editando }
            : alergia
        )
      );
    } else {
      const nuevoId =
        Math.max(0, ...alergias.map((a) => a.id)) + 1;

      setAlergias((anteriores) => [
        ...anteriores,
        { ...formulario, id: nuevoId },
      ]);
    }

    setModalAbierto(false);
    setEditando(null);
  };

  const eliminarAlergia = (id) => {
    if (window.confirm("¿Deseas eliminar esta alergia?")) {
      setAlergias((anteriores) =>
        anteriores.filter((alergia) => alergia.id !== id)
      );
    }
  };

  const alergiasFiltradas = alergias.filter((alergia) =>
    `${alergia.nombre} ${alergia.descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const total = alergias.length;
  const activas = alergias.filter(
    (a) => a.estado === "Activo"
  ).length;

  const altoRiesgo = alergias.filter(
    (a) => a.nivel_riesgo === "Alto"
  ).length;

  return (
    <section className="space-y-6 p-4 text-[15px] text-[#3D2C33] md:p-6">
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Servicios › Gestión de alergias</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de alergias</h1>
        <p className="mt-1 text-[#6B5A64]">Administra los tipos de alergias y sus niveles de riesgo.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5"><p className="text-sm text-[#6B5A64]">Total de alergias</p><p className="mt-2 text-3xl font-bold">{total}</p></div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5"><p className="text-sm text-[#6B5A64]">Alergias activas</p><p className="mt-2 text-3xl font-bold text-[#1F5A43]">{activas}</p></div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5"><p className="text-sm text-[#6B5A64]">Alergias de alto riesgo</p><p className="mt-2 text-3xl font-bold text-[#8E1F2B]">{altoRiesgo}</p></div>
      </div>

      <section className="overflow-hidden rounded-xl border border-[#F4D4E0] bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[190px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconoBuscar /></span>
            <input type="search" placeholder="Buscar alergia..." aria-label="Buscar alergia" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className={`${campoAlergia} pl-10`} />
          </div>
          <button type="button" onClick={abrirNuevo} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${enfoqueAlergia}`}><IconoMas /> Nueva alergia</button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead><tr className="text-[13px] font-semibold text-[#6B5A64]">{['ID', 'Nombre', 'Descripción', 'Nivel de riesgo', 'Estado', 'Acciones'].map((titulo) => <th key={titulo} className="border-b border-[#F4D4E0] px-4 py-3">{titulo}</th>)}</tr></thead>
            <tbody>
              {alergiasFiltradas.map((alergia) => (
                <tr key={alergia.id} className="hover:bg-[#FDF6F8]">
                  <td className="border-b border-[#F4D4E0] px-4 py-3">{alergia.id}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3 font-semibold">{alergia.nombre}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">{alergia.descripcion}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${alergia.nivel_riesgo === 'Alto' ? 'bg-[#FCE4E7] text-[#8E1F2B]' : alergia.nivel_riesgo === 'Medio' ? 'bg-[#FFF2D5] text-[#805600]' : 'bg-[#E3F3EA] text-[#1F5A43]'}`}>{alergia.nivel_riesgo}</span></td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${alergia.estado === 'Activo' ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#FCE4E7] text-[#8E1F2B]'}`}>{alergia.estado}</span></td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3"><div className="flex gap-2"><button type="button" title="Editar" aria-label={`Editar ${alergia.nombre}`} onClick={() => abrirEditar(alergia)} className={botonIconoAlergia}><IconoEditar /></button><button type="button" title="Eliminar" aria-label={`Eliminar ${alergia.nombre}`} onClick={() => eliminarAlergia(alergia.id)} className={`${botonIconoAlergia} !text-[#B3261E]`}><IconoEliminar /></button></div></td>
                </tr>
              ))}
              {alergiasFiltradas.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-[#6B5A64]">No se encontraron alergias.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-[#F4D4E0] md:hidden">
          {alergiasFiltradas.map((alergia) => (
            <article key={alergia.id} className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2"><div><p className="text-xs text-[#6B5A64]">ID {alergia.id}</p><h3 className="font-bold">{alergia.nombre}</h3></div><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${alergia.estado === 'Activo' ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#FCE4E7] text-[#8E1F2B]'}`}>{alergia.estado}</span></div>
              <p className="text-sm text-[#6B5A64]">{alergia.descripcion}</p>
              <p className="text-sm"><span className="font-semibold">Nivel de riesgo:</span> {alergia.nivel_riesgo}</p>
              <div className="flex gap-2 pt-1"><button type="button" onClick={() => abrirEditar(alergia)} className={botonIconoAlergia} aria-label={`Editar ${alergia.nombre}`}><IconoEditar /></button><button type="button" onClick={() => eliminarAlergia(alergia.id)} className={`${botonIconoAlergia} !text-[#B3261E]`} aria-label={`Eliminar ${alergia.nombre}`}><IconoEliminar /></button></div>
            </article>
          ))}
          {alergiasFiltradas.length === 0 && <p className="p-8 text-center text-[#6B5A64]">No se encontraron alergias.</p>}
        </div>
      </section>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#23161D]/60 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="titulo-alergia" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#F4D4E0] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F4D4E0] px-5 py-4">
              <h2 id="titulo-alergia" className="text-xl font-bold">{editando !== null ? 'Editar alergia' : 'Registrar alergia'}</h2>
              <button type="button" aria-label="Cerrar formulario" onClick={() => setModalAbierto(false)} className={`grid h-9 w-9 place-items-center rounded-lg text-[#6B5A64] hover:bg-[#F4D4E0] ${enfoqueAlergia}`}><IconoCerrar /></button>
            </div>
            <form onSubmit={guardarAlergia} className="space-y-4 p-5">
              <label className="block text-sm font-semibold">Nombre<input type="text" name="nombre" value={formulario.nombre} onChange={cambiarCampo} required className={`mt-2 ${campoAlergia}`} /></label>
              <label className="block text-sm font-semibold">Descripción<textarea name="descripcion" value={formulario.descripcion} onChange={cambiarCampo} required rows="3" className={`mt-2 ${campoAlergia}`} /></label>
              <label className="block text-sm font-semibold">Nivel de riesgo<select name="nivel_riesgo" value={formulario.nivel_riesgo} onChange={cambiarCampo} className={`mt-2 ${campoAlergia}`}><option value="Bajo">Bajo</option><option value="Medio">Medio</option><option value="Alto">Alto</option></select></label>
              <label className="block text-sm font-semibold">Observaciones<textarea name="observaciones" value={formulario.observaciones} onChange={cambiarCampo} rows="3" className={`mt-2 ${campoAlergia}`} /></label>
              <label className="block text-sm font-semibold">Estado<select name="estado" value={formulario.estado} onChange={cambiarCampo} className={`mt-2 ${campoAlergia}`}><option value="Activo">Activo</option><option value="Inactivo">Inactivo</option></select></label>
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#F4D4E0] pt-4"><button type="button" onClick={() => setModalAbierto(false)} className={`rounded-[10px] border border-[#D9BCC8] px-5 py-2.5 font-semibold hover:bg-[#FDF6F8] ${enfoqueAlergia}`}>Cancelar</button><button type="submit" className={`rounded-[10px] bg-[#B83A6E] px-5 py-2.5 font-semibold text-white hover:brightness-90 ${enfoqueAlergia}`}>{editando !== null ? 'Guardar cambios' : 'Registrar alergia'}</button></div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
