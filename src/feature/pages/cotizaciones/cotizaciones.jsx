
import React, { useState } from "react";

// Datos de prueba. Después se reemplazarán por la API.
const productos = [
  { id: 1, nombre: "Sérum facial", precio: 65000 },
  { id: 2, nombre: "Crema hidratante", precio: 45000 },
  { id: 3, nombre: "Protector solar", precio: 55000 },
];

const servicios = [
  { id: 1, nombre: "Limpieza facial", precio: 90000 },
  { id: 2, nombre: "Tratamiento hidratante", precio: 120000 },
];

const usuarios = [
  { id: 1, nombre: "María González", documento: "1001234567" },
  { id: 2, nombre: "Carlos Ramírez", documento: "1007654321" },
];

const vendedores = [
  { id: 1, nombre: "Administrador" },
  { id: 2, nombre: "Recepción" },
];

const fechaActual = () => new Date().toLocaleDateString("en-CA");

const nuevoFormulario = () => ({
  usuario_id: "",
  vendedor_id: "",
  tipo_documento: "CC",
  numero_documento: "",
  fecha_documento: fechaActual(),
  observaciones: "",
  estado: "Pendiente",
  items: [],
});

const formatoCOP = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

const calcularTotales = (items) => {
  const subtotal = items.reduce(
    (total, item) => total + item.cantidad * item.valor_unitario,
    0
  );

  // IVA de ejemplo, configurable según el tratamiento tributario.
  const iva = Math.round(subtotal * 0.19);

  return {
    subtotal,
    iva,
    total: subtotal + iva,
  };
};

export const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState(nuevoFormulario());

  const [tipoItem, setTipoItem] = useState("producto");
  const [itemSeleccionado, setItemSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const catalogo = tipoItem === "producto" ? productos : servicios;

  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    if (name === "usuario_id") {
      const usuario = usuarios.find((u) => String(u.id) === value);

      setFormulario((anterior) => ({
        ...anterior,
        usuario_id: value,
        numero_documento: usuario?.documento || "",
      }));
      return;
    }

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const abrirNuevo = () => {
    setFormulario(nuevoFormulario());
    setEditando(null);
    setTipoItem("producto");
    setItemSeleccionado("");
    setCantidad(1);
    setModalAbierto(true);
  };

  const abrirEditar = (cotizacion) => {
    setFormulario({
      usuario_id: String(cotizacion.usuario_id),
      vendedor_id: String(cotizacion.vendedor_id),
      tipo_documento: cotizacion.tipo_documento,
      numero_documento: cotizacion.numero_documento,
      fecha_documento: cotizacion.fecha_documento,
      observaciones: cotizacion.observaciones,
      estado: cotizacion.estado,
      items: cotizacion.items.map((item) => ({ ...item })),
    });

    setEditando(cotizacion.id);
    setModalAbierto(true);
  };

  const agregarItem = () => {
    const seleccionado = catalogo.find(
      (item) => String(item.id) === itemSeleccionado
    );

    const cantidadNumero = Number(cantidad);

    if (
      !seleccionado ||
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      alert("Selecciona un producto o servicio y una cantidad válida.");
      return;
    }

    const nuevoItem = {
      uid: crypto.randomUUID(),
      producto_id: tipoItem === "producto" ? seleccionado.id : null,
      servicio_id: tipoItem === "servicio" ? seleccionado.id : null,
      tipo: tipoItem,
      nombre: seleccionado.nombre,
      cantidad: cantidadNumero,
      valor_unitario: seleccionado.precio,
    };

    setFormulario((anterior) => ({
      ...anterior,
      items: [...anterior.items, nuevoItem],
    }));

    setItemSeleccionado("");
    setCantidad(1);
  };

  const eliminarItem = (uid) => {
    setFormulario((anterior) => ({
      ...anterior,
      items: anterior.items.filter((item) => item.uid !== uid),
    }));
  };

  const guardarCotizacion = (e) => {
    e.preventDefault();

    if (!formulario.usuario_id || !formulario.vendedor_id) {
      alert("Selecciona el cliente y el vendedor.");
      return;
    }

    if (formulario.items.length === 0) {
      alert("Agrega al menos un producto o servicio.");
      return;
    }

    const totales = calcularTotales(formulario.items);

    const cliente = usuarios.find(
      (u) => String(u.id) === formulario.usuario_id
    );

    const datos = {
      ...formulario,
      ...totales,
      nombre_usuario: cliente?.nombre || "",
    };

    if (editando !== null) {
      setCotizaciones((anteriores) =>
        anteriores.map((cotizacion) =>
          cotizacion.id === editando
            ? { ...datos, id: editando }
            : cotizacion
        )
      );
    } else {
      const nuevoId =
        Math.max(0, ...cotizaciones.map((c) => c.id)) + 1;

      setCotizaciones((anteriores) => [
        ...anteriores,
        { ...datos, id: nuevoId },
      ]);
    }

    setModalAbierto(false);
    setEditando(null);
  };

  const eliminarCotizacion = (id) => {
    if (window.confirm("¿Deseas eliminar esta cotización?")) {
      setCotizaciones((anteriores) =>
        anteriores.filter((cotizacion) => cotizacion.id !== id)
      );
    }
  };

  const cotizacionesFiltradas = cotizaciones.filter((cotizacion) => {
    const texto =
      `${cotizacion.id} ${cotizacion.nombre_usuario} ${cotizacion.numero_documento}`
        .toLowerCase();

    return (
      texto.includes(busqueda.toLowerCase()) &&
      (filtro === "Todos" || cotizacion.estado === filtro)
    );
  });

  const totalesFormulario = calcularTotales(formulario.items);

  const totalCotizaciones = cotizaciones.length;

  const pendientes = cotizaciones.filter(
    (c) => c.estado === "Pendiente"
  ).length;

  const aprobadas = cotizaciones.filter(
    (c) => c.estado === "Aprobada"
  ).length;

  return (
    <main className="min-h-screen bg-pink-50 p-5 text-gray-900 md:p-8">

      {/* ENCABEZADO */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Ventas / Gestión de cotizaciones
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Gestión de cotizaciones
          </h1>

          <p className="mt-2 text-gray-600">
            Registra cotizaciones de productos y servicios.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-pink-700"
        >
          + Nueva cotización
        </button>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total de cotizaciones</p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalCotizaciones}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Pendientes</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendientes}
          </h2>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500">Aprobadas</p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {aprobadas}
          </h2>
        </div>
      </div>

      {/* LISTADO */}
      <section className="overflow-hidden rounded-2xl border border-pink-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-200 p-5">
          <h2 className="text-xl font-bold">
            Listado de cotizaciones
          </h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              placeholder="Buscar cotización..."
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
              <option value="Pendiente">Pendientes</option>
              <option value="Aprobada">Aprobadas</option>
              <option value="Rechazada">Rechazadas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Documento</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4">IVA</th>
                <th className="p-4">Total</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cotizacionesFiltradas.map((cotizacion) => (
                <tr
                  key={cotizacion.id}
                  className="border-t border-gray-200 hover:bg-pink-50"
                >
                  <td className="p-4">{cotizacion.id}</td>
                  <td className="p-4">{cotizacion.nombre_usuario}</td>
                  <td className="p-4">{cotizacion.numero_documento}</td>
                  <td className="p-4">{cotizacion.fecha_documento}</td>
                  <td className="p-4">{formatoCOP(cotizacion.subtotal)}</td>
                  <td className="p-4">{formatoCOP(cotizacion.iva)}</td>
                  <td className="p-4 font-bold">
                    {formatoCOP(cotizacion.total)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        cotizacion.estado === "Aprobada"
                          ? "bg-green-100 text-green-700"
                          : cotizacion.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cotizacion.estado}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditar(cotizacion)}
                        className="rounded-lg border border-pink-500 px-3 py-2 text-pink-700 hover:bg-pink-50"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarCotizacion(cotizacion.id)}
                        className="rounded-lg border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {cotizacionesFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="p-8 text-center text-gray-500"
                  >
                    No se encontraron cotizaciones.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL DE COTIZACIÓN */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-cotizacion"
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="titulo-cotizacion" className="text-2xl font-bold">
                {editando !== null
                  ? "Editar cotización"
                  : "Nueva cotización"}
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

            <form onSubmit={guardarCotizacion} className="space-y-6">

              {/* DATOS PRINCIPALES */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <label className="block text-sm font-semibold">
                  Cliente / Usuario
                  <select
                    name="usuario_id"
                    value={formulario.usuario_id}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                  >
                    <option value="">Seleccionar cliente</option>

                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold">
                  Vendedor
                  <select
                    name="vendedor_id"
                    value={formulario.vendedor_id}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                  >
                    <option value="">Seleccionar vendedor</option>

                    {vendedores.map((vendedor) => (
                      <option key={vendedor.id} value={vendedor.id}>
                        {vendedor.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold">
                  Tipo de documento
                  <select
                    name="tipo_documento"
                    value={formulario.tipo_documento}
                    onChange={cambiarCampo}
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                  >
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="NIT">NIT</option>
                  </select>
                </label>

                <label className="block text-sm font-semibold">
                  Número de documento
                  <input
                    type="text"
                    name="numero_documento"
                    value={formulario.numero_documento}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                </label>

                <label className="block text-sm font-semibold">
                  Fecha de cotización
                  <input
                    type="date"
                    name="fecha_documento"
                    value={formulario.fecha_documento}
                    onChange={cambiarCampo}
                    required
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
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                </label>
              </div>

              {/* DETALLE DE PRODUCTOS Y SERVICIOS */}
              <div className="rounded-xl border border-pink-200 p-5">
                <h3 className="mb-4 text-lg font-bold">
                  Productos y servicios
                </h3>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

                  <select
                    value={tipoItem}
                    onChange={(e) => {
                      setTipoItem(e.target.value);
                      setItemSeleccionado("");
                    }}
                    className="rounded-lg border border-gray-300 p-3"
                  >
                    <option value="producto">Producto</option>
                    <option value="servicio">Servicio</option>
                  </select>

                  <select
                    value={itemSeleccionado}
                    onChange={(e) => setItemSeleccionado(e.target.value)}
                    className="rounded-lg border border-gray-300 p-3 md:col-span-1"
                  >
                    <option value="">Seleccionar</option>

                    {catalogo.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre} - {formatoCOP(item.precio)}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Cantidad"
                    className="rounded-lg border border-gray-300 p-3"
                  />

                  <button
                    type="button"
                    onClick={agregarItem}
                    className="rounded-lg bg-pink-600 px-4 py-3 font-semibold text-white hover:bg-pink-700"
                  >
                    + Agregar
                  </button>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-pink-100">
                      <tr>
                        <th className="p-3">Tipo</th>
                        <th className="p-3">Descripción</th>
                        <th className="p-3">Cantidad</th>
                        <th className="p-3">Valor unitario</th>
                        <th className="p-3">Subtotal</th>
                        <th className="p-3">Acción</th>
                      </tr>
                    </thead>

                    <tbody>
                      {formulario.items.map((item) => (
                        <tr key={item.uid} className="border-t">
                          <td className="p-3 capitalize">
                            {item.tipo}
                          </td>
                          <td className="p-3">{item.nombre}</td>
                          <td className="p-3">{item.cantidad}</td>
                          <td className="p-3">
                            {formatoCOP(item.valor_unitario)}
                          </td>
                          <td className="p-3">
                            {formatoCOP(
                              item.cantidad * item.valor_unitario
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => eliminarItem(item.uid)}
                              className="font-semibold text-red-600 hover:underline"
                            >
                              Quitar
                            </button>
                          </td>
                        </tr>
                      ))}

                      {formulario.items.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-5 text-center text-gray-500"
                          >
                            Agrega productos o servicios a la cotización.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOTALES */}
              <div className="ml-auto max-w-sm space-y-3 rounded-xl bg-pink-50 p-5">

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <strong>
                    {formatoCOP(totalesFormulario.subtotal)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>IVA (19% de ejemplo):</span>
                  <strong>
                    {formatoCOP(totalesFormulario.iva)}
                  </strong>
                </div>

                <div className="flex justify-between border-t border-pink-200 pt-3 text-xl">
                  <strong>Total:</strong>
                  <strong className="text-pink-700">
                    {formatoCOP(totalesFormulario.total)}
                  </strong>
                </div>
              </div>

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

              {/* BOTONES */}
              <div className="flex justify-end gap-3 border-t pt-5">
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
                    : "Guardar cotización"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
