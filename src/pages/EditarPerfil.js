import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import AdminNav from '../components/AdminNav.js';
import useAuth from '../hooks/useAuth.js';



const EditarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    setPerfil(auth.veterinario);
  }, [auth.veterinario]);


  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes('')) {
      return swal('Error', 'Email y Nombre son obligatorios', 'error');
    }

    await actualizarPerfil(perfil);

  }

  return (
    <>
      <AdminNav />
      <h2 className="fs-2 mt-4 text-dark fw-bold text-center">Editar Perfil</h2>
      <p className='fs-5 mt-4 text-dark fw-semibold text-center'>
        Modifica tu <span className='text-primary fw-bold'>Informacion aquí</span>
      </p>

      <div className="d-flex justify-content-center">
        <div className="col-sm-10 col-md-12 col-lg-8 mb-5">
            <form className='row g-3 bg-body rounded my-4 border border-dark border-opacity-50 p-3' onSubmit={ handleSubmit }>
              <div className="my-3">
                <label htmlFor="nombre" className="form-label text-uppercase fw-semibold">Nombre</label>
                <input type="text" id='nombre' className="form-control" name='nombre'
                  value={ perfil.nombre || '' }
                  onChange={ evt => setPerfil({ 
                    ...perfil,
                    [evt.target.name] : evt.target.value
                    })}>
                </input>
              </div>
              <div className="my-3">
                <label htmlFor="web" className="form-label text-uppercase fw-semibold">Sitio Web</label>
                <input type="text" id='web' className="form-control" name='web'
                  value={ perfil.web || '' }
                  onChange={ evt => setPerfil({ 
                    ...perfil,
                    [evt.target.name] : evt.target.value
                    })}>
                </input>
              </div>
              <div className="my-3">
                <label htmlFor="telefono" className="form-label text-uppercase fw-semibold">Telefono</label>
                <input type="tel" id='telefono' className="form-control" name='telefono'
                  value={ perfil.telefono || '' }
                  onChange={ evt => setPerfil({ 
                    ...perfil,
                    [evt.target.name] : evt.target.value
                    })}>
                </input>
              </div>
              <div className="my-3">
                <label htmlFor="email" className="form-label text-uppercase fw-semibold">Email</label>
                <input type="email" id='email' className="form-control" name='email'
                  value={ perfil.email || '' }
                  onChange={ evt => setPerfil({ 
                    ...perfil,
                    [evt.target.name] : evt.target.value
                    })}>
                </input>
              </div>
              <button type="submit" className="btn btn-primary pe-auto btn-lg text-uppercase">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditarPerfil