import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Users from '../feature/pages/usuarios/users'
import { Error404 } from '../feature/pages/errors/error404'
import { Layout } from '../feature/pages/layouts/layoutAdmin/layout'
import { Login } from '../feature/auth/login/login'
import { Pedidos } from '../feature/pages/pedidos/pedidos'
import { Compras } from '../feature/pages/compras/compras'
import { Privilegios } from '../feature/pages/privilegios/privilegios'
import { Permisos } from '../feature/pages/permisos/permisos'


export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="*" element={<Error404/>} />
      <Route element={<Layout/>} >
        <Route path="/usuarios" element={<Users/>} />
        <Route path="/pedidos" element={<Pedidos/>} />
        <Route path="/compras" element={<Compras/>} />
        <Route path="/privilegios" element={<Privilegios/>} />
        <Route path="/permisos" element={<Permisos/>} />
      </Route>

    </Routes>
  )
}


