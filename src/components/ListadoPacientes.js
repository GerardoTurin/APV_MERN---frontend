import React from 'react';
import usePacientes from '../hooks/usePacientes.js';
import Paciente from './Paciente.js';

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
        { pacientes.length ? (
          <>
            <p className='fs-3 fw-semibold text-center'>
                Administra tus
                {''}
                <span className='text-primary fw-bold'> Pacientes y Citas</span> 
            </p>
            
            { pacientes.map( paciente => (
              <Paciente
                key={ paciente._id }
                paciente={ paciente }
              />
            ) ) }
          </>
        ) : (
          <div className='alert alert-info mx-5'>
            <h2 className="fs-2 text-dark fw-bold text-center">
              No hay pacientes
            </h2>
            <p className='fs-4 text-dark text-opacity-75 fw-semibold text-center'>
              Comienza agregando un nuevo paciente {''}
              <span className='text-dark fw-bold'> y aparecera aqui</span>
            </p>
          </div>
        ) }
    </>
  )
}

export default ListadoPacientes