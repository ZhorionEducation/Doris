
import React, { useState } from "react";

// Datos de prueba
const fichasIniciales = [
  {
    id: 1,
    codigo: "FTA-001",
    alergia_id: "1",
    alergia: "Alergia al látex",
    sintomas: "Irritación, enrojecimiento y picazón.",
    recomendaciones: "Evitar productos que contengan látex.",
    observaciones: "Verificar materiales antes del servicio.",
    estado: "Activo",
  },
  {
    id: 2,
    codigo: "FTA-002",
    alergia_id: "2",
    alergia: "Alergia a fragancias",
    sintomas: "Estornudos, irritación y sensibilidad.",
    recomendaciones: "Utilizar productos sin fragancias.",
    observaciones: "Consultar los ingredientes.",
    estado: "Activo",
  },
  {
    id: 3,
    codigo: "FTA-003",
    alergia_id: "3",
    alergia: "Alergia a parabenos",
    sintomas: "Enrojecimiento, picazón y dermatitis de contacto.",
    recomendaciones: "Evitar productos con parabenos cuando exista sensibilidad confirmada.",
    observaciones: "Revisar la lista de ingredientes de los cosméticos.",
    estado: "Activo",
  },
  {
    id: 4,
    codigo: "FTA-004",
    alergia_id: "4",
    alergia: "Alergia a colorantes",
    sintomas: "Irritación cutánea, sarpullido y picazón.",
    recomendaciones: "Evitar los colorantes que hayan provocado reacciones.",
    observaciones: "Verificar la composición antes de aplicar productos.",
    estado: "Activo",
  },
  {
    id: 5,
    codigo: "FTA-005",
    alergia_id: "5",
    alergia: "Alergia a conservantes",
    sintomas: "Dermatitis, ardor y enrojecimiento de la piel.",
    recomendaciones: "Identificar y evitar los conservantes que causen alergia.",
    observaciones: "Consultar antecedentes de sensibilidad del cliente.",
    estado: "Activo",
  },
];

// Catálogo temporal de alergias
const tiposAlergias = [
  { id: "1", nombre: "Alergia al látex" },
  { id: "2", nombre: "Alergia a fragancias" },
  { id: "3", nombre: "Alergia a parabenos" },
  { id: "4", nombre: "Alergia a colorantes" },
  { id: "5", nombre: "Alergia a conservantes" },
];

const formularioInicial = {
  codigo: "",
  alergia_id: "",
  sintomas: "",
  recomendaciones: "",
  observaciones: "",
  estado: "Activo",
};


// Iconos visuales del diseño DORIS
const SvgFicha = ({ children, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>
);
const IconoMas = () => <SvgFicha><path d="M12 5v14M5 12h14" /></SvgFicha>;
const IconoBuscar = () => <SvgFicha><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></SvgFicha>;
const IconoEditar = () => <SvgFicha><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></SvgFicha>;
const IconoEliminar = () => <SvgFicha><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></SvgFicha>;
const IconoCerrar = () => <SvgFicha><path d="M6 6l12 12M18 6L6 18" /></SvgFicha>;
const enfoqueFicha = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]";
const campoFicha = `w-full rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] font-normal text-[#3D2C33] outline-none focus:border-[#B83A6E] ${enfoqueFicha}`;
const botonIconoFicha = `grid h-9 w-9 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${enfoqueFicha}`;

export const FichaTecnicaAlergias = () => {
  const [fichas, setFichas] = useState(fichasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);

  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const abrirNuevo = () => {
    setFormulario({ ...formularioInicial });
    setEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (ficha) => {
    setFormulario({
      codigo: ficha.codigo,
      alergia_id: ficha.alergia_id,
      sintomas: ficha.sintomas,
      recomendaciones: ficha.recomendaciones,
      observaciones: ficha.observaciones,
      estado: ficha.estado,
    });

    setEditando(ficha.id);
    setModalAbierto(true);
  };

  const guardarFicha = (e) => {
    e.preventDefault();

    const alergiaSeleccionada = tiposAlergias.find(
      (alergia) => alergia.id === formulario.alergia_id
    );

    if (!alergiaSeleccionada) {
      alert("Selecciona un tipo de alergia.");
      return;
    }

    const datosFicha = {
      ...formulario,
      alergia: alergiaSeleccionada.nombre,
    };

    if (editando !== null) {
      setFichas((anteriores) =>
        anteriores.map((ficha) =>
          ficha.id === editando
            ? { ...datosFicha, id: editando }
            : ficha
        )
      );
    } else {
      const nuevoId =
        Math.max(0, ...fichas.map((f) => f.id)) + 1;

      setFichas((anteriores) => [
        ...anteriores,
        { ...datosFicha, id: nuevoId },
      ]);
    }

    setModalAbierto(false);
    setEditando(null);
  };

  const eliminarFicha = (id) => {
    if (window.confirm("¿Deseas eliminar esta ficha técnica?")) {
      setFichas((anteriores) =>
        anteriores.filter((ficha) => ficha.id !== id)
      );
    }
  };

  const fichasFiltradas = fichas.filter((ficha) => {
    const texto =
      `${ficha.codigo} ${ficha.alergia} ${ficha.sintomas}`
        .toLowerCase();

    const coincideBusqueda = texto.includes(
      busqueda.toLowerCase()
    );

    const coincideEstado =
      filtro === "Todos" || ficha.estado === filtro;

    return coincideBusqueda && coincideEstado;
  });

  const total = fichas.length;

  const activas = fichas.filter(
    (ficha) => ficha.estado === "Activo"
  ).length;

  const inactivas = fichas.filter(
    (ficha) => ficha.estado === "Inactivo"
  ).length;

  return (
    <section className="space-y-6 p-4 text-[15px] text-[#3D2C33] md:p-6">
      {/* Encabezado, estilo Gestión de compras */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Servicios › Ficha técnica de alergias</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Ficha técnica de alergias</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Administra la información técnica, síntomas y recomendaciones de las alergias.
        </p>
      </header>

      {/* Las mismas estadísticas del componente original */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Total de fichas técnicas</p>
          <p className="mt-2 text-3xl font-bold">{total}</p>
        </div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Fichas activas</p>
          <p className="mt-2 text-3xl font-bold text-[#1F5A43]">{activas}</p>
        </div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Fichas inactivas</p>
          <p className="mt-2 text-3xl font-bold text-[#8E1F2B]">{inactivas}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[190px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconoBuscar /></span>
            <input
              type="search"
              placeholder="Buscar ficha técnica..."
              aria-label="Buscar ficha técnica"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className={`${campoFicha} pl-10`}
            />
          </div>
          <select aria-label="Filtrar por estado" value={filtro} onChange={(e) => setFiltro(e.target.value)} className={campoFicha}>
            <option value="Todos">Estado: Todos</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
          <button type="button" onClick={abrirNuevo} className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${enfoqueFicha}`}>
            <IconoMas /> Nueva ficha técnica
          </button>
        </div>

        {/* Tabla de escritorio */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                {['Código', 'Alergia', 'Síntomas', 'Recomendaciones', 'Estado', 'Acciones'].map((titulo) => (
                  <th key={titulo} className="border-b border-[#F4D4E0] px-4 py-3">{titulo}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fichasFiltradas.map((ficha) => (
                <tr key={ficha.id} className="hover:bg-[#FDF6F8]">
                  <td className="border-b border-[#F4D4E0] px-4 py-3 font-semibold">
                    <code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{ficha.codigo}</code>
                  </td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3 font-semibold">{ficha.alergia}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">{ficha.sintomas}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">{ficha.recomendaciones}</td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${ficha.estado === 'Activo' ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#FCE4E7] text-[#8E1F2B]'}`}>
                      {ficha.estado}
                    </span>
                  </td>
                  <td className="border-b border-[#F4D4E0] px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" title="Editar" aria-label={`Editar ${ficha.codigo}`} onClick={() => abrirEditar(ficha)} className={botonIconoFicha}><IconoEditar /></button>
                      <button type="button" title="Eliminar" aria-label={`Eliminar ${ficha.codigo}`} onClick={() => eliminarFicha(ficha.id)} className={`${botonIconoFicha} !text-[#B3261E]`}><IconoEliminar /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {fichasFiltradas.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-[#6B5A64]">No se encontraron fichas técnicas.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tarjetas para celulares, sin alterar las acciones */}
        <div className="space-y-3 p-3 md:hidden">
          {fichasFiltradas.map((ficha) => (
            <article key={ficha.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold">{ficha.codigo}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${ficha.estado === 'Activo' ? 'bg-[#E3F3EA] text-[#1F5A43]' : 'bg-[#FCE4E7] text-[#8E1F2B]'}`}>{ficha.estado}</span>
              </div>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[#6B5A64]">Alergia</dt><dd className="font-semibold">{ficha.alergia}</dd></div>
                <div><dt className="text-[#6B5A64]">Síntomas</dt><dd>{ficha.sintomas}</dd></div>
                <div><dt className="text-[#6B5A64]">Recomendaciones</dt><dd>{ficha.recomendaciones}</dd></div>
              </dl>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" title="Editar" aria-label={`Editar ${ficha.codigo}`} onClick={() => abrirEditar(ficha)} className={`${botonIconoFicha} h-11 w-11`}><IconoEditar /></button>
                <button type="button" title="Eliminar" aria-label={`Eliminar ${ficha.codigo}`} onClick={() => eliminarFicha(ficha.id)} className={`${botonIconoFicha} h-11 w-11 !text-[#B3261E]`}><IconoEliminar /></button>
              </div>
            </article>
          ))}
          {fichasFiltradas.length === 0 && <p className="py-6 text-center text-[#6B5A64]">No se encontraron fichas técnicas.</p>}
        </div>
        <div className="border-t border-[#F4D4E0] px-4 py-3 text-sm text-[#6B5A64]">
          Mostrando {fichasFiltradas.length} de {total} fichas técnicas
        </div>
      </div>

      {/* Formulario original: mismos campos, validaciones y manejadores */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2C33]/60 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="titulo-ficha" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#F4D4E0] bg-white p-5 shadow-2xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#F4D4E0] pb-4">
              <h2 id="titulo-ficha" className="text-xl font-bold md:text-2xl">{editando !== null ? 'Editar ficha técnica' : 'Registrar ficha técnica'}</h2>
              <button type="button" aria-label="Cerrar formulario" onClick={() => setModalAbierto(false)} className={`${botonIconoFicha} shrink-0`}><IconoCerrar /></button>
            </div>
            <form onSubmit={guardarFicha} className="space-y-4">
              <label className="block text-sm font-semibold">Código de ficha
                <input type="text" name="codigo" value={formulario.codigo} onChange={cambiarCampo} required placeholder="Ej: FTA-003" className={`mt-2 ${campoFicha}`} />
              </label>
              <label className="block text-sm font-semibold">Tipo de alergia
                <select name="alergia_id" value={formulario.alergia_id} onChange={cambiarCampo} required className={`mt-2 ${campoFicha}`}>
                  <option value="">Seleccionar alergia</option>
                  {tiposAlergias.map((alergia) => <option key={alergia.id} value={alergia.id}>{alergia.nombre}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold">Síntomas
                <textarea name="sintomas" value={formulario.sintomas} onChange={cambiarCampo} required rows="3" className={`mt-2 ${campoFicha}`} />
              </label>
              <label className="block text-sm font-semibold">Recomendaciones
                <textarea name="recomendaciones" value={formulario.recomendaciones} onChange={cambiarCampo} required rows="3" className={`mt-2 ${campoFicha}`} />
              </label>
              <label className="block text-sm font-semibold">Observaciones
                <textarea name="observaciones" value={formulario.observaciones} onChange={cambiarCampo} rows="3" className={`mt-2 ${campoFicha}`} />
              </label>
              <label className="block text-sm font-semibold">Estado
                <select name="estado" value={formulario.estado} onChange={cambiarCampo} className={`mt-2 ${campoFicha}`}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </label>
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#F4D4E0] pt-5">
                <button type="button" onClick={() => setModalAbierto(false)} className={`rounded-[10px] border border-[#D9BCC8] bg-white px-5 py-2.5 font-semibold hover:bg-[#FDF6F8] ${enfoqueFicha}`}>Cancelar</button>
                <button type="submit" className={`rounded-[10px] bg-[#B83A6E] px-5 py-2.5 font-semibold text-white hover:brightness-90 ${enfoqueFicha}`}>{editando !== null ? 'Guardar cambios' : 'Registrar ficha'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
