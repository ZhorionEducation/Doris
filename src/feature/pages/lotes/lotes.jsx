
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
    <main className="min-h-screen bg-doris-bg p-4 text-doris-text md:p-8">

      {/* ENCABEZADO */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-doris-muted">
            Inventario / Gestión de lotes
          </p>

          <h1 className="text-3xl font-bold">
            Gestión de lotes
          </h1>

          <p className="mt-2 text-doris-muted">
            Controla los productos, cantidades y fechas de vencimiento.
          </p>
        </div>

        <button
          type="button"
          onClick={nuevoLote}
          className="rounded-xl bg-doris px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-doris-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doris-purple"
        >
          + Nuevo lote
        </button>
      </div>

      {/* TARJETAS DE RESUMEN */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-doris-border bg-white p-5 shadow-sm">
          <p className="text-sm text-doris-muted">
            Total de lotes
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalLotes}
          </h2>
        </div>

        <div className="rounded-2xl border border-doris-border bg-white p-5 shadow-sm">
          <p className="text-sm text-doris-muted">
            Lotes activos
          </p>
          <h2 className="mt-2 text-3xl font-bold text-doris-green">
            {lotesActivos}
          </h2>
        </div>

        <div className="rounded-2xl border border-doris-border bg-white p-5 shadow-sm">
          <p className="text-sm text-doris-muted">
            Lotes vencidos
          </p>
          <h2 className="mt-2 text-3xl font-bold text-red-700">
            {lotesVencidos}
          </h2>
        </div>
      </div>

      {/* TABLA */}
      <section className="overflow-hidden rounded-2xl border border-doris-border bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-doris-border p-5">
          <h2 className="text-xl font-semibold">
            Listado de lotes
          </h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              placeholder="Buscar lote..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="rounded-lg border border-doris-border bg-white px-4 py-2 outline-none focus:border-doris-purple focus:ring-2 focus:ring-doris-purple/20"
            />

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="rounded-lg border border-doris-border bg-white px-4 py-2 outline-none focus:border-doris-purple"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Inactivo">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-doris-soft text-doris-text">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Proveedor</th>
                <th className="p-4">Fabricación</th>
                <th className="p-4">Vencimiento</th>
                <th className="p-4">Disponible</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {lotesFiltrados.map((lote) => (
                <tr
                  key={lote.id}
                  className="border-t border-doris-border transition hover:bg-doris-bg"
                >
                  <td className="p-4 font-semibold">
                    {lote.codigo_lote}
                  </td>

                  <td className="p-4">{lote.producto}</td>
                  <td className="p-4">{lote.proveedor}</td>
                  <td className="p-4">{lote.fecha_fabricacion}</td>
                  <td className="p-4">{lote.fecha_vencimiento}</td>
                  <td className="p-4">
                    {lote.cantidad_disponible}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lote.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {lote.estado}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editarLote(lote)}
                        className="rounded-lg border border-doris px-3 py-2 font-medium text-doris hover:bg-doris-soft"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarLote(lote.id)}
                        className="rounded-lg border border-red-600 px-3 py-2 font-medium text-red-700 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {lotesFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="p-10 text-center text-doris-muted"
                  >
                    No se encontraron lotes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL DE REGISTRO Y EDICIÓN */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-doris-text/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-lote"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
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
                className="text-2xl text-doris-muted hover:text-doris"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Estado
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="rounded-lg border border-doris-border p-3 font-normal"
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
                    className="resize-y rounded-lg border border-doris-border p-3 font-normal"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-xl border border-doris px-5 py-3 font-semibold text-doris hover:bg-doris-soft"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-doris px-5 py-3 font-semibold text-white hover:bg-doris-hover"
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
    </main>
  );
};
