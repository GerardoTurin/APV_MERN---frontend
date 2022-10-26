import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="text-uppercase fw-semibold py-5">
      <div className="d-flex justify-content-xs-center gap-3">
        <Link to="/admin/perfil" className="text-decoration-none text-dark link-primary">Perfil</Link>
        <Link to="/admin/cambiar-password" className="text-decoration-none text-dark link-primary">Cambiar Password</Link>
      </div>
    </nav>
  )
}

export default AdminNav