//import axios from 'axios';
import swal from 'sweetalert';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios.js';


const Registro = () => {

  const [ nombre, setNombre ] = useState('')  // Este es el estado del nombre, y el metodo para actualizarlo, inicialmente vacio
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repitePassword, setRepetirPassword ] = useState('')

  const [mostarPassword, setMostarPassword] = useState(false);
  const [mostarRepitePassword, setMostarRepitePassword] = useState(false);

  const [cargando, setCargando] = useState(false)


  const handleSubmit = async (evt) => {
    evt.preventDefault() // Evita que se recargue la pagina
    
    // Validar que no haya campos vacios
    if([nombre, email, password, repitePassword].includes('')) {

        swal({
          title: "Todos los campos son obligatorios",
          icon: "error",
          button: "Aceptar",
        })
      return
    }

    // Validar que el password sea igual al repetir password
    if(password !== repitePassword) {
        swal({
          title: "Los Passwords no coinciden",
          icon: "error",
          button: "Aceptar",
        })
      return
    }

    // Validar que el password tenga al menos 6 caracteres
    if(password.length < 6) {
        swal({
          title: "El Password debe tener al menos 6 caracteres",
          icon: "error",
          button: "Aceptar",
        })
      return
    }

    // Mostrar el spinner de cargando antes de enviar la peticion
    setCargando(true)


    // Crear el usuario en la base de datos (backend) API
    try {
      const { data } = await clienteAxios.post('/veterinario', { nombre, email, password })

      // Pasar la validacion
      swal({
        title: data.msg,
        text: "Ahora revisa tu correo para confirmar tu cuenta",
        icon: "success",
        button: false,
        timer: 3000
    })
    setCargando(false)

    // Resetear el formulario
    setNombre('')
    setEmail('')
    setPassword('')
    setRepetirPassword('')

    } catch (error) {
      // Mostrar la alerta
      swal({
        title: "Error al registrar el usuario",
        text: error.response.data.errors[0].msg,
        icon: "error",
        button: "Aceptar",
      })
    }
}

  return (
    <>
      <div className='mt-5 text-center'>
        <h1 className='fw-bold fs-1'>Crea tu cuenta y Administra tus <span className='text-primary'> Pacientes</span> </h1>
      </div>
      <div className='shadow p-3 mb-5 bg-body rounded mt-4'>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputNombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="exampleInputNombre" value={ nombre } onChange={ evt => setNombre(evt.target.value) }></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail1" value={ email } onChange={ evt => setEmail(evt.target.value) }></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">Password</label>
            <div className="input-group">
              <input type={ mostarPassword ? 'text' : 'password' } className="form-control" id="inputPassword1" value={ password } onChange={ evt => setPassword(evt.target.value) }></input>
              <button className='btn btn-outline-secondary' type='button' onClick={ () => setMostarPassword(!mostarPassword) }>
                { mostarPassword ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="repitePassword" className="form-label">Repite Password</label>
            <div className="input-group">
              <input type={ mostarRepitePassword ? 'text' : 'password' } className="form-control" id="repitePassword" value={ repitePassword } onChange={ evt => setRepetirPassword(evt.target.value) }></input>
              <button className='btn btn-outline-secondary' type='button' onClick={ () => setMostarRepitePassword(!mostarRepitePassword) }>
                { mostarRepitePassword ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
              </button>
            </div>
          </div>
          <div className='d-grid d-lg-block'>
            <button type="submit" className="btn btn-primary pe-auto btn-lg">{ cargando ? <div className="spinner-border text-white" role="status">
              <span className="visually-hidden"></span>
              </div> : 'Crear Cuenta' }
            </button>
          </div>
        </form>

        <nav className='navbar navbar-expand-lg mt-2 d-flex justify-content-between'>
          <Link className='text-decoration-none text-secondary' to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
          <Link className='text-decoration-none text-secondary' to="/olvida-password">Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registro