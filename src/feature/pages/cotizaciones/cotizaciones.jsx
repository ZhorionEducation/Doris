
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

// Cinco cotizaciones de prueba; conservan la misma estructura del formulario.
const cotizacionesIniciales = [
  { id: 1, usuario_id: "1", vendedor_id: "1", tipo_documento: "CC", numero_documento: "1001234567", fecha_documento: "2026-11-10", observaciones: "Cotización de cuidado facial.", estado: "Pendiente", nombre_usuario: "María González", items: [{ uid: "demo-1", producto_id: 1, servicio_id: null, tipo: "producto", nombre: "Sérum facial", cantidad: 2, valor_unitario: 65000 }] },
  { id: 2, usuario_id: "2", vendedor_id: "2", tipo_documento: "CC", numero_documento: "1007654321", fecha_documento: "2026-11-11", observaciones: "Servicio de limpieza facial.", estado: "Aprobada", nombre_usuario: "Carlos Ramírez", items: [{ uid: "demo-2", producto_id: null, servicio_id: 1, tipo: "servicio", nombre: "Limpieza facial", cantidad: 1, valor_unitario: 90000 }] },
  { id: 3, usuario_id: "1", vendedor_id: "2", tipo_documento: "CC", numero_documento: "1001234567", fecha_documento: "2026-11-12", observaciones: "Productos para rutina diaria.", estado: "Pendiente", nombre_usuario: "María González", items: [{ uid: "demo-3a", producto_id: 2, servicio_id: null, tipo: "producto", nombre: "Crema hidratante", cantidad: 1, valor_unitario: 45000 }, { uid: "demo-3b", producto_id: 3, servicio_id: null, tipo: "producto", nombre: "Protector solar", cantidad: 1, valor_unitario: 55000 }] },
  { id: 4, usuario_id: "2", vendedor_id: "1", tipo_documento: "CC", numero_documento: "1007654321", fecha_documento: "2026-11-13", observaciones: "Tratamiento de hidratación.", estado: "Rechazada", nombre_usuario: "Carlos Ramírez", items: [{ uid: "demo-4", producto_id: null, servicio_id: 2, tipo: "servicio", nombre: "Tratamiento hidratante", cantidad: 1, valor_unitario: 120000 }] },
  { id: 5, usuario_id: "1", vendedor_id: "1", tipo_documento: "CC", numero_documento: "1001234567", fecha_documento: "2026-11-14", observaciones: "Paquete de productos y servicio.", estado: "Aprobada", nombre_usuario: "María González", items: [{ uid: "demo-5a", producto_id: 3, servicio_id: null, tipo: "producto", nombre: "Protector solar", cantidad: 2, valor_unitario: 55000 }, { uid: "demo-5b", producto_id: null, servicio_id: 1, tipo: "servicio", nombre: "Limpieza facial", cantidad: 1, valor_unitario: 90000 }] },
].map((cotizacion) => ({ ...cotizacion, ...calcularTotales(cotizacion.items) }));

export const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState(cotizacionesIniciales);
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
    <main className="min-h-screen bg-[#FFF9FB] p-4 text-[#3D2C33] sm:p-6 lg:p-8">

      {/* ENCABEZADO */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#F4D4E0] bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B83A6E]">
            Ventas / Gestión de cotizaciones
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3D2C33]">
            Gestión de cotizaciones
          </h1>

          <p className="mt-2 text-sm text-[#806A75]">
            Registra cotizaciones de productos y servicios.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="rounded-xl bg-[#B83A6E] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9E2E5D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B83A6E]"
        >
          + Nueva cotización
        </button>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#F4D4E0] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-[#806A75]">Total de cotizaciones</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3D2C33]">
            {totalCotizaciones}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F4D4E0] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-[#806A75]">Pendientes</p>
          <h2 className="mt-2 text-3xl font-bold text-amber-600">
            {pendientes}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F4D4E0] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-[#806A75]">Aprobadas</p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {aprobadas}
          </h2>
        </div>
      </div>

      {/* LISTADO */}
      <section className="overflow-hidden rounded-2xl border border-[#F4D4E0] bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4D4E0] bg-[#FFFBFD] p-5">
          <h2 className="text-xl font-bold text-[#3D2C33]">
            Listado de cotizaciones
          </h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              placeholder="Buscar cotización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-xl border border-[#EBCBD8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0] sm:w-64"
            />

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="rounded-xl border border-[#EBCBD8] bg-white px-4 py-3 text-sm outline-none focus:border-[#B83A6E]"
            >
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Aprobada">Aprobadas</option>
              <option value="Rechazada">Rechazadas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-[#FCE8F0] text-[#694353]">
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
                  className="border-t border-[#F7E5EC] transition hover:bg-[#FFF5F9]"
                >
                  <td className="p-4">{cotizacion.id}</td>
                  <td className="p-4">{cotizacion.nombre_usuario}</td>
                  <td className="p-4">{cotizacion.numero_documento}</td>
                  <td className="p-4">{cotizacion.fecha_documento}</td>
                  <td className="p-4">{formatoCOP(cotizacion.subtotal)}</td>
                  <td className="p-4">{formatoCOP(cotizacion.iva)}</td>
                  <td className="p-4 font-bold text-[#B83A6E]">
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
                        className="rounded-lg border border-[#E9A9C2] bg-[#FFF5F9] px-3 py-2 font-semibold text-[#B83A6E] transition hover:bg-[#FCE3EC]"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarCotizacion(cotizacion.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-100"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1722]/60 p-3 backdrop-blur-[2px] sm:p-5">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-cotizacion"
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[#F4D4E0] bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#F4D4E0] pb-4">
              <h2 id="titulo-cotizacion" className="text-2xl font-bold text-[#3D2C33]">
                {editando !== null
                  ? "Editar cotización"
                  : "Nueva cotización"}
              </h2>

              <button
                type="button"
                aria-label="Cerrar formulario"
                onClick={() => setModalAbierto(false)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#FFF1F6] text-2xl text-[#B83A6E] transition hover:bg-[#F4D4E0]"
              >
                ×
              </button>
            </div>

            <form onSubmit={guardarCotizacion} className="space-y-6">

              {/* DATOS PRINCIPALES */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <label className="block text-sm font-semibold text-[#694353]">
                  Cliente / Usuario
                  <select
                    name="usuario_id"
                    value={formulario.usuario_id}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  >
                    <option value="">Seleccionar cliente</option>

                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-[#694353]">
                  Vendedor
                  <select
                    name="vendedor_id"
                    value={formulario.vendedor_id}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  >
                    <option value="">Seleccionar vendedor</option>

                    {vendedores.map((vendedor) => (
                      <option key={vendedor.id} value={vendedor.id}>
                        {vendedor.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-[#694353]">
                  Tipo de documento
                  <select
                    name="tipo_documento"
                    value={formulario.tipo_documento}
                    onChange={cambiarCampo}
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  >
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="NIT">NIT</option>
                  </select>
                </label>

                <label className="block text-sm font-semibold text-[#694353]">
                  Número de documento
                  <input
                    type="text"
                    name="numero_documento"
                    value={formulario.numero_documento}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#694353]">
                  Fecha de cotización
                  <input
                    type="date"
                    name="fecha_documento"
                    value={formulario.fecha_documento}
                    onChange={cambiarCampo}
                    required
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#694353]">
                  Estado
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={cambiarCampo}
                    className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                </label>
              </div>

              {/* DETALLE DE PRODUCTOS Y SERVICIOS */}
              <div className="rounded-2xl border border-[#F4D4E0] bg-[#FFFBFD] p-5">
                <h3 className="mb-4 text-lg font-bold text-[#3D2C33]">
                  Productos y servicios
                </h3>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

                  <select
                    value={tipoItem}
                    onChange={(e) => {
                      setTipoItem(e.target.value);
                      setItemSeleccionado("");
                    }}
                    className="rounded-xl border border-[#EBCBD8] bg-white p-3 outline-none focus:border-[#B83A6E]"
                  >
                    <option value="producto">Producto</option>
                    <option value="servicio">Servicio</option>
                  </select>

                  <select
                    value={itemSeleccionado}
                    onChange={(e) => setItemSeleccionado(e.target.value)}
                    className="rounded-xl border border-[#EBCBD8] bg-white p-3 outline-none focus:border-[#B83A6E] md:col-span-1"
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
                    className="rounded-xl border border-[#EBCBD8] bg-white p-3 outline-none focus:border-[#B83A6E]"
                  />

                  <button
                    type="button"
                    onClick={agregarItem}
                    className="rounded-xl bg-[#B83A6E] px-4 py-3 font-semibold text-white transition hover:bg-[#9E2E5D]"
                  >
                    + Agregar
                  </button>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-[#FCE8F0] text-[#694353]">
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
                        <tr key={item.uid} className="border-t border-[#F4D4E0]">
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
              <div className="ml-auto max-w-sm space-y-3 rounded-2xl border border-[#F4D4E0] bg-[#FFF3F8] p-5">

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

                <div className="flex justify-between border-t border-[#E9A9C2] pt-3 text-xl">
                  <strong>Total:</strong>
                  <strong className="text-[#B83A6E]">
                    {formatoCOP(totalesFormulario.total)}
                  </strong>
                </div>
              </div>

              <label className="block text-sm font-semibold text-[#694353]">
                Observaciones
                <textarea
                  name="observaciones"
                  value={formulario.observaciones}
                  onChange={cambiarCampo}
                  rows="3"
                  className="mt-2 w-full rounded-xl border border-[#EBCBD8] bg-white p-3 text-[#3D2C33] outline-none transition focus:border-[#B83A6E] focus:ring-2 focus:ring-[#F4D4E0]"
                />
              </label>

              {/* BOTONES */}
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#F4D4E0] pt-5">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-xl border border-[#EBCBD8] px-5 py-3 font-semibold text-[#694353] transition hover:bg-[#FFF1F6]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#B83A6E] px-5 py-3 font-semibold text-white transition hover:bg-[#9E2E5D]"
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
