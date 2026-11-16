
import React, { useState } from "react";

// Datos iniciales de demostración
const datosIniciales = [
  {
    id: 1,
    producto_id: "1",
    producto: "Serum facial",
    proveedor_id: "1",
    proveedor: "Belleza Natural",
    codigo_lote: "LOT-001",
    fecha_fabricacion: "2026-01-10",
    fecha_vencimiento: "2027-01-10",
    cantidad_inicial: 50,
    cantidad_disponible: 50,
    observaciones: "",
    estado: "Activo",
  },
  {
    id: 2,
    producto_id: "2",
    producto: "Crema hidratante",
    proveedor_id: "2",
    proveedor: "Cosméticos Doris",
    codigo_lote: "LOT-002",
    fecha_fabricacion: "2026-02-15",
    fecha_vencimiento: "2027-02-15",
    cantidad_inicial: 30,
    cantidad_disponible: 20,
    observaciones: "",
    estado: "Activo",
  },
  {
    id: 3,
    producto_id: "3",
    producto: "Aceite corporal",
    proveedor_id: "1",
    proveedor: "Belleza Natural",
    codigo_lote: "LOT-003",
    fecha_fabricacion: "2026-03-12",
    fecha_vencimiento: "2027-03-12",
    cantidad_inicial: 40,
    cantidad_disponible: 35,
    observaciones: "Almacenar en lugar fresco y seco.",
    estado: "Activo",
  },
  {
    id: 4,
    producto_id: "1",
    producto: "Serum facial",
    proveedor_id: "2",
    proveedor: "Cosméticos Doris",
    codigo_lote: "LOT-004",
    fecha_fabricacion: "2026-04-08",
    fecha_vencimiento: "2027-04-08",
    cantidad_inicial: 60,
    cantidad_disponible: 42,
    observaciones: "Revisar el sello antes de distribuir.",
    estado: "Activo",
  },
  {
    id: 5,
    producto_id: "2",
    producto: "Crema hidratante",
    proveedor_id: "1",
    proveedor: "Belleza Natural",
    codigo_lote: "LOT-005",
    fecha_fabricacion: "2026-05-20",
    fecha_vencimiento: "2027-05-20",
    cantidad_inicial: 25,
    cantidad_disponible: 18,
    observaciones: "Mantener el envase cerrado.",
    estado: "Inactivo",
  },
];

const productos = [
  { id: "1", nombre: "Serum facial" },
  { id: "2", nombre: "Crema hidratante" },
  { id: "3", nombre: "Aceite corporal" },
];

const proveedores = [
  { id: "1", nombre: "Belleza Natural" },
  { id: "2", nombre: "Cosméticos Doris" },
];

const formularioVacio = {
  producto_id: "",
  proveedor_id: "",
  codigo_lote: "",
  fecha_fabricacion: "",
  fecha_vencimiento: "",
  cantidad_inicial: "",
  cantidad_disponible: "",
  observaciones: "",
  estado: "Activo",
};

// Iconos de línea usados en Gestión de compras.
const Svg = ({ children, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);
const IconPlus = () => <Svg><path d="M12 5v14M5 12h14" /></Svg>;
const IconEdit = () => <Svg><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></Svg>;
const IconTrash = () => <Svg><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Svg>;
const IconSearch = () => <Svg><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Svg>;
const IconCheck = () => <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg>;
const IconInactive = () => <Svg className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></Svg>;

const focus = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#6B4FA8]";
const control = `rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white px-3 py-2.5 text-[15px] text-[#3D2C33] ${focus}`;
const iconBtn = `grid h-9 w-9 place-items-center rounded-[10px] border border-[#F4D4E0] bg-white text-[#B83A6E] hover:bg-[#F4D4E0] ${focus}`;
const celda = "whitespace-nowrap border-b border-[#F4D4E0] px-4 py-3";
const EstadoLote = ({ estado }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
    estado === "Activo" ? "bg-[#E3F3EA] text-[#1F5A43]" : "bg-[#FCE4E7] text-[#8E1F2B]"
  }`}>
    {estado === "Activo" ? <IconCheck /> : <IconInactive />} {estado}
  </span>
);

export const Lotes = () => {
  const [lotes, setLotes] = useState(datosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [mensaje, setMensaje] = useState("");

  // Actualizar campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  // Abrir formulario para crear
  const nuevoLote = () => {
    setFormulario({ ...formularioVacio });
    setEditando(null);
    setMensaje("");
    setModalAbierto(true);
  };

  // Abrir formulario para editar
  const editarLote = (lote) => {
    setFormulario({
      producto_id: lote.producto_id,
      proveedor_id: lote.proveedor_id,
      codigo_lote: lote.codigo_lote,
      fecha_fabricacion: lote.fecha_fabricacion,
      fecha_vencimiento: lote.fecha_vencimiento,
      cantidad_inicial: lote.cantidad_inicial,
      cantidad_disponible: lote.cantidad_disponible,
      observaciones: lote.observaciones,
      estado: lote.estado,
    });

    setEditando(lote.id);
    setMensaje("");
    setModalAbierto(true);
  };

  // Guardar lote
  const guardarLote = (e) => {
    e.preventDefault();

    const inicial = Number(formulario.cantidad_inicial);
    const disponible = Number(formulario.cantidad_disponible);

    if (formulario.fecha_vencimiento < formulario.fecha_fabricacion) {
      setMensaje("La fecha de vencimiento no puede ser anterior a la fabricación.");
      return;
    }

    if (
      !Number.isInteger(inicial) ||
      !Number.isInteger(disponible) ||
      inicial < 0 ||
      disponible < 0 ||
      disponible > inicial
    ) {
      setMensaje("Verifica las cantidades del lote.");
      return;
    }

    const producto = productos.find(
      (p) => p.id === formulario.producto_id
    );

    const proveedor = proveedores.find(
      (p) => p.id === formulario.proveedor_id
    );

    const datos = {
      ...formulario,
      cantidad_inicial: inicial,
      cantidad_disponible: disponible,
      producto: producto?.nombre || "",
      proveedor: proveedor?.nombre || "",
    };

    if (editando !== null) {
      setLotes((anteriores) =>
        anteriores.map((lote) =>
          lote.id === editando
            ? { ...datos, id: editando }
            : lote
        )
      );
    } else {
      const nuevoId =
        Math.max(0, ...lotes.map((lote) => lote.id)) + 1;

      setLotes((anteriores) => [
        ...anteriores,
        { ...datos, id: nuevoId },
      ]);
    }

    setModalAbierto(false);
    setEditando(null);
    setMensaje("");
  };

  // Eliminar lote
  const eliminarLote = (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este lote?"
    );

    if (confirmar) {
      setLotes((anteriores) =>
        anteriores.filter((lote) => lote.id !== id)
      );
    }
  };

  // Buscar y filtrar
  const lotesFiltrados = lotes.filter((lote) => {
    const texto = [
      lote.codigo_lote,
      lote.producto,
      lote.proveedor,
    ]
      .join(" ")
      .toLowerCase();

    const coincideBusqueda = texto.includes(
      busqueda.toLowerCase()
    );

    const coincideEstado =
      filtroEstado === "Todos" ||
      lote.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const totalLotes = lotes.length;
  const lotesActivos = lotes.filter(
    (lote) => lote.estado === "Activo"
  ).length;

  const lotesVencidos = lotes.filter(
    (lote) =>
      lote.fecha_vencimiento <
      new Date().toLocaleDateString("en-CA") &&
      lote.estado === "Activo"
  ).length;

  return (
    <section className="space-y-6 text-[15px] text-[#3D2C33]">
      {/* Encabezado idéntico en estilo a Gestión de compras */}
      <header>
        <p className="text-[13px] text-[#6B5A64]">Inicio › Compras › Gestión de lotes</p>
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">Gestión de lotes</h1>
        <p className="mt-1 max-w-[70ch] text-[#6B5A64]">
          Controla los productos, cantidades y fechas de vencimiento.
        </p>
      </header>

      {/* Estadísticas originales, conservadas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Total de lotes</p>
          <h2 className="mt-2 text-3xl font-bold">{totalLotes}</h2>
        </div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Lotes activos</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1F5A43]">{lotesActivos}</h2>
        </div>
        <div className="rounded-xl border border-[#F4D4E0] bg-white p-5">
          <p className="text-sm text-[#6B5A64]">Lotes vencidos</p>
          <h2 className="mt-2 text-3xl font-bold text-[#8E1F2B]">{lotesVencidos}</h2>
        </div>
      </div>

      <div className="rounded-xl border border-[#F4D4E0] bg-white">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-3 border-b border-[#F4D4E0] p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A64]"><IconSearch /></span>
            <input type="search" placeholder="Buscar lote, producto o proveedor"
              aria-label="Buscar lotes" value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className={`w-full pl-10 ${control}`} />
          </div>
          <select aria-label="Filtrar por estado" value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)} className={control}>
            <option value="Todos">Estado: Todos</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
          <button type="button" onClick={nuevoLote}
            className={`inline-flex items-center gap-2 rounded-[10px] bg-[#B83A6E] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-90 ${focus}`}>
            <IconPlus /> Nuevo lote
          </button>
        </div>

        {/* Tabla para escritorio */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#6B5A64]">
                {['Código', 'Producto', 'Proveedor', 'Fabricación', 'Vencimiento', 'Disponible', 'Estado', 'Acciones'].map((titulo) => (
                  <th key={titulo} className="border-b border-[#F4D4E0] px-4 py-3">{titulo}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lotesFiltrados.map((lote) => (
                <tr key={lote.id} className="hover:bg-[#FDF6F8]">
                  <td className={celda}><code className="rounded-md bg-[#F4D4E0] px-1.5 py-0.5 font-mono text-[13px]">{lote.codigo_lote}</code></td>
                  <td className={`${celda} font-semibold`}>{lote.producto}</td>
                  <td className={celda}>{lote.proveedor}</td>
                  <td className={celda}>{lote.fecha_fabricacion}</td>
                  <td className={celda}>{lote.fecha_vencimiento}</td>
                  <td className={`${celda} tabular-nums`}>{lote.cantidad_disponible}</td>
                  <td className={celda}><EstadoLote estado={lote.estado} /></td>
                  <td className={celda}>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editarLote(lote)} title="Editar" aria-label={`Editar lote ${lote.codigo_lote}`} className={iconBtn}><IconEdit /></button>
                      <button type="button" onClick={() => eliminarLote(lote.id)} title="Eliminar" aria-label={`Eliminar lote ${lote.codigo_lote}`} className={`${iconBtn} !text-[#B3261E]`}><IconTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {lotesFiltrados.length === 0 && (
                <tr><td colSpan="8" className="p-10 text-center text-[#6B5A64]">No se encontraron lotes.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tarjetas para celulares, como en Gestión de compras */}
        <div className="space-y-3 p-3 md:hidden">
          {lotesFiltrados.map((lote) => (
            <article key={lote.id} className="rounded-xl border border-[#F4D4E0] bg-white p-3.5">
              <header className="mb-2 flex items-center justify-between gap-2 font-bold">
                <span>{lote.codigo_lote}</span><EstadoLote estado={lote.estado} />
              </header>
              <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[#6B5A64]">Producto</dt><dd className="text-right">{lote.producto}</dd>
                <dt className="text-[#6B5A64]">Proveedor</dt><dd className="text-right">{lote.proveedor}</dd>
                <dt className="text-[#6B5A64]">Fabricación</dt><dd className="text-right">{lote.fecha_fabricacion}</dd>
                <dt className="text-[#6B5A64]">Vencimiento</dt><dd className="text-right">{lote.fecha_vencimiento}</dd>
                <dt className="text-[#6B5A64]">Disponible</dt><dd className="text-right font-semibold">{lote.cantidad_disponible}</dd>
              </dl>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => editarLote(lote)} title="Editar" aria-label={`Editar lote ${lote.codigo_lote}`} className={`${iconBtn} !h-11 !w-11`}><IconEdit /></button>
                <button type="button" onClick={() => eliminarLote(lote.id)} title="Eliminar" aria-label={`Eliminar lote ${lote.codigo_lote}`} className={`${iconBtn} !h-11 !w-11 !text-[#B3261E]`}><IconTrash /></button>
              </div>
            </article>
          ))}
          {lotesFiltrados.length === 0 && <p className="py-8 text-center text-[#6B5A64]">No se encontraron lotes.</p>}
        </div>
        <div className="border-t border-[#F4D4E0] p-4 text-sm text-[#6B5A64]">
          Mostrando {lotesFiltrados.length} de {lotes.length} lotes
        </div>
      </div>

      {/* MODAL DE REGISTRO Y EDICIÓN */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2C33]/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-lote"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#F4D4E0] bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id="titulo-lote"
                className="text-2xl font-bold"
              >
                {editando !== null
                  ? "Editar lote"
                  : "Registrar nuevo lote"}
              </h2>

              <button
                type="button"
                aria-label="Cerrar formulario"
                onClick={() => setModalAbierto(false)}
                className="text-2xl text-[#6B5A64] hover:text-[#B83A6E]"
              >
                ×
              </button>
            </div>

            {mensaje && (
              <div
                role="alert"
                className="mb-5 rounded-lg border-l-4 border-red-600 bg-red-50 p-3 text-sm text-red-800"
              >
                {mensaje}
              </div>
            )}

            <form onSubmit={guardarLote}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Producto
                  <select
                    name="producto_id"
                    value={formulario.producto_id}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  >
                    <option value="">Seleccionar producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Proveedor
                  <select
                    name="proveedor_id"
                    value={formulario.proveedor_id}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  >
                    <option value="">Seleccionar proveedor</option>
                    {proveedores.map((proveedor) => (
                      <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Código de lote
                  <input
                    name="codigo_lote"
                    value={formulario.codigo_lote}
                    onChange={manejarCambio}
                    placeholder="Ej: LOT-003"
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Estado
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Fecha de fabricación
                  <input
                    type="date"
                    name="fecha_fabricacion"
                    value={formulario.fecha_fabricacion}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Fecha de vencimiento
                  <input
                    type="date"
                    name="fecha_vencimiento"
                    value={formulario.fecha_vencimiento}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Cantidad inicial
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="cantidad_inicial"
                    value={formulario.cantidad_inicial}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Cantidad disponible
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="cantidad_disponible"
                    value={formulario.cantidad_disponible}
                    onChange={manejarCambio}
                    required
                    className="rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                  Observaciones
                  <textarea
                    name="observaciones"
                    value={formulario.observaciones}
                    onChange={manejarCambio}
                    rows="3"
                    placeholder="Observaciones del lote..."
                    className="resize-y rounded-[10px] border-[1.5px] border-[#D9BCC8] bg-white p-3 font-normal text-[#3D2C33]"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-[10px] border border-[#B83A6E] px-5 py-3 font-semibold text-[#B83A6E] hover:bg-[#F4D4E0]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-[10px] bg-[#B83A6E] px-5 py-3 font-semibold text-white hover:brightness-90"
                >
                  {editando !== null
                    ? "Guardar cambios"
                    : "Registrar lote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
