import React from 'react';
import usePacientes from '../hooks/usePacientes.js';

const Paciente = ( {paciente} ) => {

  const { actualizarPaciente, eliminarPaciente, arrayPacientes } = usePacientes();
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

  // Indice del paciente en el array de pacientes
  const indice = arrayPacientes.indexOf(paciente);
  const indicePaciente = indice + 1; // para que el indice empiece en 1


  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' } ).format(fechaFormateada);
  }



  return (
    <div className="col-row-cols-auto my-5 g-4">
      <div className="col">
        <div className="card"> 
          <div className="card-body">
            <p className="card-text text-primary fw-semibold text-uppercase">Nro: {''}
              <span className="text-capitalize text-dark fw-bold">{ indicePaciente }</span>
            </p>
            <p className="card-text text-primary fw-semibold text-uppercase">Nombre: {''}
              <span className="text-capitalize text-dark fw-bold">{ nombre }</span>
            </p>
            <p className="card-text text-primary fw-semibold text-uppercase">Propietario: {''}
              <span className="text-capitalize text-dark fw-bold">{ propietario }</span>
            </p>
            <p className="card-text text-primary fw-semibold text-uppercase">Email: {''}
              <span className="text-lowercase text-dark fw-bold">{ email }</span>
            </p>
            <p className="card-text text-primary fw-semibold text-uppercase">Fecha: {''}
              <span className="text-lowercase text-dark fw-bold">{ formatearFecha(fecha) }</span>
            </p>
            <p className="card-text text-primary fw-semibold text-uppercase">Síntomas: {''}
              <span className="text-capitalize text-dark fw-bold">{ sintomas }</span>
            </p>
            <div className='d-flex justify-content-between pt-3'>
              <button type='button' className="btn btn-primary text-uppercase" onClick={ () => actualizarPaciente( paciente ) }>Editar</button>
              <button type='button' className="btn btn-danger text-uppercase" onClick={ () => eliminarPaciente(_id) }>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paciente