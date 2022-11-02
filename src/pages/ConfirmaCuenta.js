//import axios from 'axios'
import swal from 'sweetalert';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'  // Importamos el hook useParams: nos permite obtener los parametros de la URL
import clienteAxios from '../config/axios.js';

const ConfirmaCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)  // Estado para saber si la cuenta fue confirmada o no
  const [cargando, setCargando] = useState(true)  // Estado para saber si se esta cargando la pagina o no


  const params = useParams()  // Obtenemos los parametros de la URL
  const { token } = params  // Obtenemos el token de la URL

  useEffect(() => {
    const confirmaCuenta = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/veterinario/confirmar/${token}`
        await clienteAxios.get(url)

        setCuentaConfirmada(true)

      } catch (error) {
        swal({
          title: "Error!",
          text: error.response.data.msg,
          icon: "error",
          button: false,
          timer: 4000
        })  // Mostrar mensaje de error
      }

      setCargando(false)  // Cambiamos el estado de cargando a false
    }
    confirmaCuenta();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
        {!cargando && (
          <div className='mt-5 text-center'>
            <h1 className='fw-bold fs-1'>Confirma tu cuenta y Comienza a Administrar tus <span className='text-primary'> Pacientes</span> </h1>
          </div>
        )}
        {cuentaConfirmada && (
          <div className='shadow p-3 mb-5 bg-body rounded mt-5 text-center'>
            <h2 className='fw-semibold fs-3 py-1'>Tu cuenta ha sido confirmada</h2>
              <button className="btn btn-primary pe-auto btn-lg">
                <Link className='text-decoration-none text-white' to="/">Iniciar Sesion</Link>
              </button>
          </div>
        )}
    </>
  )
}

export default ConfirmaCuenta