import React, { useState } from 'react';
import swal from 'sweetalert';
import AdminNav from '../components/AdminNav.js';
import useAuth from '../hooks/useAuth.js';



const CambiarPassword = () => {
  const { actualizarPassword } = useAuth();

  const [password, setPassword] = useState({
    pwd_actual:'',
    pwd_nuevo:'',
  });

  const [mostarPasswordActual, setMostarPasswordActual] = useState(false);
  const [mostarPasswordNuevo, setMostarPasswordNuevo] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();


    if( Object.values(password).some( ( campo ) => campo === '') ) {
      swal("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    // Validar que la contraseña nueva sea mayor a 6 caracteres
    if( password.pwd_nuevo.length < 6 ) {
      swal("Error", "El nuevo password debe tener al menos 6 caracteres", "error");
      return;
    }
    
    // Actualizar el password
    await actualizarPassword(password);
    
    // Limpiar el formulario
    evt.target.reset();
  }

  return (
    <>
      <AdminNav />
      <h2 className="fs-2 mt-5 text-dark fw-bold text-center">Cambiar Password</h2>
      <p className='fs-5 mt-5 text-dark fw-semibold text-center'>
        Modifica tu <span className='text-primary fw-bold'>Password</span>
      </p>

      <div className="d-flex justify-content-center">
        <div className="col-sm-10 col-md-12 col-lg-8">
            <form className='row g-3 bg-body rounded my-4 border border-dark border-opacity-50 p-3' onSubmit={ handleSubmit }>
              <div className='my-3'>
                <label htmlFor="pwd_actual" className="form-label text-uppercase fw-semibold">Password Actual</label>
                <div className="d-flex gap-2 align-content-center">
                  <input type={ mostarPasswordActual ? 'text' : 'password' } id='pwd_actual' className="form-control" name='pwd_actual' placeholder='Escribe tu password actual'
                    onChange={ evt => setPassword({
                      ...password,
                      [evt.target.name]: evt.target.value
                    }) }>
                  </input>
                  <div onClick={ () => setMostarPasswordActual(!mostarPasswordActual) }>
                    { mostarPasswordActual ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
                  </div>
                </div>
              </div>
              <div className='my-3'>
                <label htmlFor="pwd_nuevo" className="form-label text-uppercase fw-semibold">Nuevo Password</label>
                <div className="d-flex gap-2">
                  <input type={ mostarPasswordNuevo ? 'text' : 'password' } id='pwd_nuevo' className="form-control" name='pwd_nuevo' placeholder='Escribe tu nuevo password'
                    onChange={ evt => setPassword({
                      ...password,
                      [evt.target.name]: evt.target.value
                    }) }>
                  </input>
                  <div onClick={ () => setMostarPasswordNuevo(!mostarPasswordNuevo) }>
                    { mostarPasswordNuevo ? <i className="bi fs-5 bi-eye-fill"></i> : <i className="bi fs-5 bi-eye-slash-fill"></i> }
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary pe-auto btn-lg text-uppercase">Actualizar Password</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword