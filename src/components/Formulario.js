import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import usePacientes from '../hooks/usePacientes.js';

const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if ( paciente?.nombre ) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente])
  
  
  const handleSubmit = (evt) => {
    evt.preventDefault()

    // Validar que no haya campos vacios
    if( [nombre, propietario, email, fecha, sintomas].includes('') ) {
      swal({
        title: "Todos los campos son obligatorios",
        icon: "error",
        button: "Aceptar",
      })
      return
    }

    // Crear el nuevo paciente
    const nuevoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id
    }

    // Agregar el nuevo paciente al state
    guardarPaciente(nuevoPaciente)


    // Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId(null)
  }



  return (
    <>
      <p className='fs-3 fw-semibold text-center'>
        Añade tus pacientes y
              {''}
              <span className='text-primary fw-bold'> Administralos</span> 
      </p>
      <form className='row g-3 bg-body rounded my-5 border border-dark border-opacity-50 p-3' onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-uppercase fw-semibold">Nombre Mascota</label>
          <input type="text" id='nombre' className="form-control" value={ nombre } onChange={ evt => setNombre( evt.target.value ) }></input>
        </div>
        <div className="mb-3">
          <label htmlFor="propietario" className="form-label text-uppercase fw-semibold">Nombre Propietario</label>
          <input type="text" id='propietario' className="form-control" value={ propietario } onChange={ evt => setPropietario( evt.target.value ) }></input>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label text-uppercase fw-semibold">Email</label>
            <input type="email" id='email' className="form-control" value={ email } onChange={ evt => setEmail( evt.target.value ) }></input>
        </div>
        <div className="mb-3">
            <label htmlFor="fecha" className="form-label text-uppercase fw-semibold">Fecha Alta</label>
            <input type="date" id='fecha' className="form-control" value={ fecha } onChange={ evt => setFecha( evt.target.value ) }></input>
        </div>
        <div className="mb-3">
          <label htmlFor="sintomas" className="form-label text-uppercase fw-semibold">Síntomas</label>
          <textarea className="form-control" id="sintomas" rows="3" placeholder='Describe los Síntomas...' value={ sintomas } onChange={ evt => setSintomas( evt.target.value ) }></textarea>
        </div>
        <button type="submit" className="btn btn-primary pe-auto btn-lg text-uppercase">{ id ? 'Guardar Cambios' : 'Agregar Pacientes' }</button>
      </form>
    </>
  )
}

export default Formulario