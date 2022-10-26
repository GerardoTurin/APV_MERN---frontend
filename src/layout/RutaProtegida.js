import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import useAuth from '../hooks/useAuth.js' // Importamos el hook que creamos



const RutaProtegida = () => {

  const { auth, cargando } = useAuth(); // Extraemos el estado de auth del hook
  //console.log(auth.veterinario);

  if (cargando) {
    return 'Cargando...'
  }

  return (
    <>
      <Header />
      { auth?.veterinario ? (
        <main className='container mx-auto my-5'>
          <Outlet />
        </main>
      )  : <Navigate to="/" /> } {/* Si el usuario esta autenticado mostramos el outlet, si no lo esta lo redireccionamos al login */}
      <Footer />
    </>
  )
}

export default RutaProtegida