import React, { useState, useEffect, createContext } from 'react';
import swal from 'sweetalert';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';


const PacientesContext = createContext();


const PacientesProvider = ( {children} ) => {

  const { auth } = useAuth();
  
    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});

    // Cuando el componente carga traer los pacientes del backend ( API )
    useEffect(() => {

      
      
      const obtenerPacientes = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  'x-token': token
              }
          }
            
            const { data } = await clienteAxios('/pacientes', config); 
            setPacientes(data);
                
          } catch (error) {
            console.log(error);
          }
        }
        obtenerPacientes();
    }, [auth.veterinario]);



    const guardarPaciente = async ( paciente ) => {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-token': token
        }
      };

      if ( paciente.id ) {
        try {
          const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
          const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );
          setPacientes(pacienteActualizado);

        } catch (error) {
          console.log(error);
        }

      } else {
        try {
          const { data } = await clienteAxios.post('/pacientes', paciente, config);
          
          // ignoramos algunos campos que no queremos que se muestren en la tabla
          const { createdAt, updatedAt, __v, ...pacienteGuardado } = data;
          setPacientes([...pacientes, pacienteGuardado]); // agregamos el nuevo paciente al final del array
  
        } catch (error) {
          console.log(error.response.data.msg);
        }
      }
    }


    // contador de pacientes
  const arrayPacientes = [];
  for (let i = 0; i < pacientes.length; i++) {
    arrayPacientes.push(pacientes[i]);
  }




    const actualizarPaciente = ( paciente ) => {
      setPaciente(paciente);
    }

    const eliminarPaciente = async ( id ) => {

      // Preguntar al usuario si esta seguro de eliminar el paciente
      swal({
        title: "¿Estas seguro?",
        text: "Un Paciente Eliminado no se puede Recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (willDelete) => {
        if (willDelete) {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                "Content-Type": "application/json",
                'x-token': token
              }
            };
            
            await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacienteEliminado = pacientes.filter( pacienteState => pacienteState._id !== id );
            setPacientes(pacienteEliminado);
            swal("Paciente Eliminado Correctamente", {
              icon: "success",
              buttons: false,
              timer: 1500
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  
    return (
      <PacientesContext.Provider value={{ pacientes, guardarPaciente, actualizarPaciente, eliminarPaciente, paciente, arrayPacientes }}>
        { children }
      </PacientesContext.Provider>
    )
}

export { PacientesProvider }

export default PacientesContext;