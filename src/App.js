import { BrowserRouter , Routes, Route } from "react-router-dom";


//! Componentes
import AuthLayout from "./layout/AuthLayout.js";
import RutaProtegida from "./layout/RutaProtegida.js";

import Login from "./pages/Login.js";
import Registro from "./pages/Registro.js";
import ConfirmaCuenta from "./pages/ConfirmaCuenta.js";
import OlvidaPassword from "./pages/Olvida-Password.js";
import NuevoPassword from "./pages/Nuevo-Password.js";
import AdminPacientes from "./pages/AdminPacientes.js";
import EditarPerfil from "./pages/EditarPerfil.js";
import CambiarPassword from "./pages/CambiarPassword.js";



import { AuthProvider } from "./context/AuthProvider.js";
import { PacientesProvider } from "./context/PacientesProvider.js";





function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registro" element={<Registro />} />
              <Route path="confirmar/:token" element={<ConfirmaCuenta />} />
              <Route path="olvida-password" element={<OlvidaPassword />} />
              <Route path="olvida-password/:token" element={<NuevoPassword />} />
            </Route>
            
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdminPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
