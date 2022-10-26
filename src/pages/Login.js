import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [mostarPassword, setMostarPassword] = useState(false);

  const { setAuth } = useAuth(); // Extraemos el estado de auth del hook


  const navigate = useNavigate()


  const handleSubmit = async (evt) => {
    evt.preventDefault()

    // Validar que no haya campos vacios
    if( [email, password].includes('') ) {
      swal({
        title: "Ambos campos son obligatorios",
        icon: "error",
        button: "Aceptar",
      })
      return
    }

    // Validar que el email sea valido
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if( !regex.test(email) ) {
      swal({
        title: "El email no es valido",
        icon: "error",
        button: "Aceptar",
      })
      return
    }

    // Validar que el password sea mayor a 6 caracteres
    if( password.length < 6 ) {
      swal({
        title: "El password debe tener al menos 6 caracteres",
        icon: "error",
        button: "Aceptar",
      })
      return
    }


    // Enviar los datos al backend
    try {
      const { data } = await clienteAxios.post('/auth/login', { email, password })

      // Guardar el token en el localStorage
      localStorage.setItem('token', data.token)
      setAuth(data)

      // Redireccionar al usuario a la pagina principal
      navigate('/admin')

      // Limpiar los campos
      setEmail('')
      setPassword('')

    } catch (error) {
      console.log(error)

      swal({
        title: error.response.data.msg,
        icon: "error",
        button: false,
        timer: 3000
      })
    }
  }

  return (
    <>
      <div className='mt-5 text-center'>
        <h1 className='fw-bold fs-1'>Inicia Sesion y Administra tus <span className='text-primary'> Pacientes</span> </h1>
      </div>
      <div className='shadow p-3 mb-5 bg-body rounded mt-4'>
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="d-flex gap-2 align-content-center">
              <input type="email" className="form-control" id='email' value={ email } onChange={ evt => setEmail( evt.target.value ) }></input>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="d-flex gap-2 align-content-center">
              <input type={ mostarPassword ? 'text' : 'password' } className="form-control" id='password' value={ password } onChange={ evt => setPassword(evt.target.value) }></input>
              <div onClick={ () => setMostarPassword(!mostarPassword) }>
                { mostarPassword ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
              </div>
            </div>
          </div>
          <div className='d-grid d-lg-block'>
            <button type="submit" className="btn btn-primary pe-auto btn-lg">Iniciar Sesión</button>
          </div>
        </form>
        <nav className='navbar mt-2 d-flex justify-content-between gap-2'>
          <Link className='text-decoration-none text-secondary' to="/registro">¿No tienes una cuenta? Registrate</Link>
          <Link className='text-decoration-none text-secondary' to="/olvida-password">Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login