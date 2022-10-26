import React, { useState, useEffect, createContext } from 'react'
import swal from 'sweetalert';
import clienteAxios from '../config/axios';


const AuthContext = createContext();    // Este es el contexto que vamos a exportar


// Este es el componente que vamos a exportar
const AuthProvider = ({ children }) => {

  const [cargando, setCargando] = useState(true);
  const [ auth, setAuth ] = useState({});   // Este es el estado que vamos a exportar

  useEffect(() => {

    const authUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-token': token
        }
      }

      try {
        const { data } = await clienteAxios('/veterinario/perfil', config);
        setAuth(data);
        
      } catch (error) {

        console.log(error);
        setAuth({});
      }

      setCargando(false);
    }
    authUsuario();
  }, []);

  // Cerramos Sesion

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  }


  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-token': token
        }
      }

      try {
        const url = `/veterinario/perfil/${datos._id}`;
        const { data } = await clienteAxios.put(url, datos, config);
        console.log(data);
        swal({
          title: "Perfil Actualizado",
          text: "Los datos se actualizaron correctamente",
          icon: "success",
          button: false,
          timer: 2000
        })
        //setAuth(data);
        
        
      } catch (error) {
        swal({
          title:`${error.response.data.msg}`,
          icon: "error",
          button: "Aceptar",
        });
      }
  }

  const actualizarPassword = async ( datos ) => {
    const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-token': token
        }
      }

      try {
        const url = '/veterinario/actualizar-password';
        const { data } = await clienteAxios.put(url, datos, config);

        swal({
          title: data.msg,
          icon: "success",
          button: false,
          timer: 2000
        })
        //setAuth(data);
        
      } catch (error) {
        swal({
          title:`${error.response.data.msg}`,
          icon: "error",
          button: "Aceptar",
        });
      }
  }





    return (
    <AuthContext.Provider value={{ auth, setAuth, cargando,  cerrarSesion, actualizarPerfil, actualizarPassword }}>
      { children }
    </AuthContext.Provider>
    )
}





export { AuthProvider }

export default AuthContext