import { useContext } from 'react'
import PacientesContext from '../context/PacientesProvider.js'




const usePacientes = () => {
  const context = useContext(PacientesContext)
  return context
}


export default usePacientes