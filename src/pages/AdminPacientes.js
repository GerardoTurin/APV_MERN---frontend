import Formulario from '../components/Formulario.js';
import ListadoPacientes from '../components/ListadoPacientes.js';



const AdminPacientes = () => {

  return (
      <div className='row pt-5'>
        <div className='text-center d-md-none mb-5'>
          <button type="button" className="btn btn-primary pe-auto btn-lg px-2" data-bs-toggle="collapse" data-bs-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">Mostrar Formulario</button>
        </div>
        <div className='d-md-block col-sm-6 col-lg-5 collapse' id="collapseForm">
          <Formulario />
        </div>
        <div className='col-sm-6 col-lg-7'>
          <ListadoPacientes />
        </div>
      </div>
  )
}

export default AdminPacientes