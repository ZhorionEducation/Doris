
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
];

const formularioInicial = {
  nombre: "",
  descripcion: "",
  nivel_riesgo: "Bajo",
  observaciones: "",
  estado: "Activo",
};

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
    <main className="min-h-screen bg-pink-50 p-5 text-gray-900 md:p-8">

      {/* ENCABEZADO */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Servicios / Gestión de alergias
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Gestión de alergias
          </h1>

          <p className="mt-2 text-gray-600">
            Administra los tipos de alergias y sus niveles de riesgo.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-pink-700"
        >
          + Nueva alergia
        </button>
      </div>

      {/* TARJETAS */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total de alergias</p>
          <h2 className="mt-2 text-3xl font-bold">
            {total}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Alergias activas</p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {activas}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Alergias de alto riesgo</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {altoRiesgo}
          </h2>
        </div>
      </div>

      {/* LISTADO */}
      <section className="overflow-hidden rounded-2xl border border-pink-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-200 p-5">
          <h2 className="text-xl font-bold">
            Listado de alergias
          </h2>

          <input
            type="search"
            placeholder="Buscar alergia..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 sm:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Nivel de riesgo</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {alergiasFiltradas.map((alergia) => (
                <tr
                  key={alergia.id}
                  className="border-t border-gray-200 hover:bg-pink-50"
                >
                  <td className="p-4">{alergia.id}</td>
                  <td className="p-4 font-medium">
                    {alergia.nombre}
                  </td>
                  <td className="p-4">{alergia.descripcion}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        alergia.nivel_riesgo === "Alto"
                          ? "bg-red-100 text-red-700"
                          : alergia.nivel_riesgo === "Medio"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {alergia.nivel_riesgo}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        alergia.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {alergia.estado}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditar(alergia)}
                        className="rounded-lg border border-pink-500 px-3 py-2 text-pink-700 hover:bg-pink-50"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarAlergia(alergia.id)}
                        className="rounded-lg border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {alergiasFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500"
                  >
                    No se encontraron alergias.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FORMULARIO MODAL */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-alergia"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="titulo-alergia" className="text-2xl font-bold">
                {editando !== null
                  ? "Editar alergia"
                  : "Registrar alergia"}
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

            <form onSubmit={guardarAlergia} className="space-y-4">

              <label className="block text-sm font-semibold">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={cambiarCampo}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Descripción
                <textarea
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={cambiarCampo}
                  required
                  rows="3"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Nivel de riesgo
                <select
                  name="nivel_riesgo"
                  value={formulario.nivel_riesgo}
                  onChange={cambiarCampo}
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                >
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                </select>
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
                    : "Registrar alergia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
