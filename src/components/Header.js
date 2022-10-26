import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Header = () => {


  const { cerrarSesion } = useAuth();

  return (
    <header className='py-5'>
      <nav className="navbar bg-dark fixed-top">
        <div className="container gap-5">
          <h1 className='col text-center text-white text-opacity-75 fw-semibold fs-2'> APV - AdmNameinistrador de Pacientes de
            {''}
            <span className='text-white'> Veterinaria</span> 
          </h1>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title fw-light" id="offcanvasNavbarLabel">Cerrar</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav gap-4 justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/admin" className='text-dark fs-4 text-decoration-none'>Pacientes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/perfil" className='text-dark fs-4 text-decoration-none'>Perfil</Link>
                </li>
                <li className="nav-item">
                  <button type='button' className='btn btn-outline-primary' onClick={ cerrarSesion }>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header