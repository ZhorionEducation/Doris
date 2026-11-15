
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
];

// Catálogo temporal de alergias
const tiposAlergias = [
  { id: "1", nombre: "Alergia al látex" },
  { id: "2", nombre: "Alergia a fragancias" },
];

const formularioInicial = {
  codigo: "",
  alergia_id: "",
  sintomas: "",
  recomendaciones: "",
  observaciones: "",
  estado: "Activo",
};

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
    <main className="min-h-screen bg-pink-50 p-5 text-gray-900 md:p-8">

      {/* ENCABEZADO */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Servicios / Ficha técnica de alergias
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Ficha técnica de alergias
          </h1>

          <p className="mt-2 text-gray-600">
            Administra la información técnica,
            síntomas y recomendaciones de las alergias.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-pink-700"
        >
          + Nueva ficha técnica
        </button>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Total de fichas técnicas
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {total}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Fichas activas
          </p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {activas}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Fichas inactivas
          </p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {inactivas}
          </h2>
        </div>
      </div>

      {/* TABLA */}
      <section className="overflow-hidden rounded-2xl border border-pink-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-200 p-5">
          <h2 className="text-xl font-bold">
            Listado de fichas técnicas
          </h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              placeholder="Buscar ficha técnica..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
            />

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Inactivo">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">

            <thead className="bg-pink-100">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Alergia</th>
                <th className="p-4">Síntomas</th>
                <th className="p-4">Recomendaciones</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {fichasFiltradas.map((ficha) => (
                <tr
                  key={ficha.id}
                  className="border-t border-gray-200 hover:bg-pink-50"
                >
                  <td className="p-4 font-semibold">
                    {ficha.codigo}
                  </td>

                  <td className="p-4">
                    {ficha.alergia}
                  </td>

                  <td className="p-4">
                    {ficha.sintomas}
                  </td>

                  <td className="p-4">
                    {ficha.recomendaciones}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        ficha.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ficha.estado}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditar(ficha)}
                        className="rounded-lg border border-pink-500 px-3 py-2 text-pink-700 hover:bg-pink-50"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarFicha(ficha.id)}
                        className="rounded-lg border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {fichasFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500"
                  >
                    No se encontraron fichas técnicas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-ficha"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="titulo-ficha" className="text-2xl font-bold">
                {editando !== null
                  ? "Editar ficha técnica"
                  : "Registrar ficha técnica"}
              </h2>

              <button
                type="button"
                aria-label="Cerrar formulario"
                onClick={() => setModalAbierto(false)}
                className="text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={guardarFicha} className="space-y-4">

              <label className="block text-sm font-semibold">
                Código de ficha
                <input
                  type="text"
                  name="codigo"
                  value={formulario.codigo}
                  onChange={cambiarCampo}
                  required
                  placeholder="Ej: FTA-003"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Tipo de alergia
                <select
                  name="alergia_id"
                  value={formulario.alergia_id}
                  onChange={cambiarCampo}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                >
                  <option value="">Seleccionar alergia</option>

                  {tiposAlergias.map((alergia) => (
                    <option key={alergia.id} value={alergia.id}>
                      {alergia.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold">
                Síntomas
                <textarea
                  name="sintomas"
                  value={formulario.sintomas}
                  onChange={cambiarCampo}
                  required
                  rows="3"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Recomendaciones
                <textarea
                  name="recomendaciones"
                  value={formulario.recomendaciones}
                  onChange={cambiarCampo}
                  required
                  rows="3"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Observaciones
                <textarea
                  name="observaciones"
                  value={formulario.observaciones}
                  onChange={cambiarCampo}
                  rows="3"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Estado
                <select
                  name="estado"
                  value={formulario.estado}
                  onChange={cambiarCampo}
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-lg border border-gray-300 px-5 py-3 hover:bg-gray-100"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
                >
                  {editando !== null
                    ? "Guardar cambios"
                    : "Registrar ficha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
