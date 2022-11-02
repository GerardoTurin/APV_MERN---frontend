import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import clienteAxios from '../config/axios';


const NuevoPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ repitePassword, setRepetirPassword ] = useState('')
  const [ tokenValido, setTokenValido ] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  // desabilitar el boton al enviar el formulario
  //const [btnDesabilitado, setBtnDesabilitado] = useState(false)

  const [mostarPassword, setMostarPassword] = useState(false);
  const [mostarRepitePassword, setMostarRepitePassword] = useState(false);


  const params = useParams()  // Obtenemos los parametros de la URL
  const { token } = params

  useEffect(() => {

    const verificarToken = async () => {
      try {
        await clienteAxios(`/veterinario/olvide/${token}`)
        setTokenValido(true)
      } catch (error) {

        console.log(error)
        swal({
          title: 'Hubo un error con el enlace',
          icon: "error",
          button: "Aceptar",
        })
      }
    }
    verificarToken()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    // Validar que no haya campos vacios
    if( [password, repitePassword].includes('') ) {
      swal({
        title: "Ambos campos son obligatorios",
        icon: "error",
        button: "Aceptar",
      })
    return
  }

    // Validar que el password sea igual al repetir password
    if( password !== repitePassword ) {
      swal({
        title: "Los Passwords no coinciden",
        icon: "error",
        button: "Aceptar",
      })
    return
  }

    // Validar que el password tenga al menos 6 caracteres
    if( password.length < 6 ) {
        swal({
          title: "El Password debe tener al menos 6 caracteres",
          icon: "error",
          button: "Aceptar",
        })
      return
    }


    
    // Actualizar el password en la base de datos (backend) API
    try {
      const { data } = await clienteAxios.post(`/veterinario/olvide/${token}`, { password })

      swal({
        title: data.msg,
        icon: "success",
        button: false,
        timer: 2000
      })
      setPasswordModificado(true)

    } catch (error) {
      console.log(error)

      swal({
        title: 'Hubo un error',
        icon: "error",
        button: "Aceptar",
      })
    }

    // Limpiar ambos campos
    setPassword('')
    setRepetirPassword('')

    // Desabilitar el boton
    //setBtnDesabilitado(true)

  }

  return (
    <>
      <div className='mt-5 text-center'>
        <h1 className='fw-bold fs-1'>Resstablece tu password y no pierdas acceso a tus <span className='text-primary'> Pacientes</span> </h1>
      </div>

      <div className='shadow p-3 mb-5 bg-body rounded mt-4'>
        
        { tokenValido && (
          <>
            <form onSubmit={ handleSubmit }>
              <div className="mb-3">
                <label htmlFor="inputPassword1" className="form-label">Nuevo Password</label>
                <div className="input-group">
                  <input type={ mostarPassword ? 'text' : 'password' } className="form-control" id="inputPassword1" value={ password } onChange={ evt => setPassword(evt.target.value) }></input>
                  <button className='btn btn-outline-secondary' type='button' onClick={ () => setMostarPassword(!mostarPassword) }>
                    { mostarPassword ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="repitePassword" className="form-label">Repite tu nuevo Password</label>
                <div className="input-group">
                  <input type={ mostarRepitePassword ? 'text' : 'password' } className="form-control" id="repitePassword" value={ repitePassword } onChange={ evt => setRepetirPassword(evt.target.value) }></input>
                  <button className='btn btn-outline-secondary' type='button' onClick={ () => setMostarRepitePassword(!mostarRepitePassword) }>
                    { mostarRepitePassword ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
                  </button>
                </div>
              </div>
              <div className='d-grid d-lg-block'>
                { passwordModificado ? <button type="submit" className="btn btn-primary pe-auto btn-lg d-none">Guardar Nuevo Password</button> : <button type="submit" className="btn btn-primary pe-auto btn-lg">Guardar Nuevo Password</button> }
              </div>
            </form>
          </>
        )}
        { passwordModificado && (
          <div className='d-flex my-2 justify-content-center'>
            <button className="btn btn-primary pe-auto btn-lg">
              <Link className='text-decoration-none text-white' to="/">Iniciar Sesion</Link>
            </button>
          </div>
        ) }

      </div>
    </>
  )
}

export default NuevoPassword