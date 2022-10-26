import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import clienteAxios from '../config/axios.js';

const OlvidaPassword = () => {

  const [ email, setEmail ] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault() // Evita que se recargue la pagina

    if (email === '') {
      swal({
        title: "El campo email es obligatorio",
        icon: "error",
        button: "Aceptar",
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinario/olvide', { email })
      swal({
        title: data.msg,
        icon: "success",
        button: "Aceptar",
      })
    } catch (error) {
      swal({
        title: error.response.data.msg,
        icon: "error",
        button: "Aceptar",
      });
    }

    // Limpiar el formulario
    setEmail('')

    }

  return (
    <>
      <div className='mt-5 text-center'>
        <h1 className='fw-bold fs-1'>Recupera tu Acceso no pierdas tus <span className='text-primary'> Pacientes</span> </h1>
      </div>
      <div className='shadow p-3 mb-5 bg-body rounded mt-4'>
      <form onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" value={ email } onChange={ evt => setEmail( evt.target.value ) }></input>
        </div>
        <div className='d-grid d-lg-block'>
          <button type="submit" className="btn btn-primary pe-auto btn-lg">Enviar Datos</button>
        </div>
      </form>
      <nav className='navbar navbar-expand-lg mt-2 d-flex justify-content-between'>
        <Link className='text-decoration-none text-secondary' to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
        <Link className='text-decoration-none text-secondary' to="/registro">¿No tienes una cuenta? Registrate</Link>
      </nav>
    </div>
    </>
  )
}

export default OlvidaPassword