// src/routes.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import PricingPlans from "./pages/PricingPLans.jsx";
import Registration from "./pages/Registration.jsx";
// importa aquí los demás componentes/páginas

export default function AppRoutes() {
  return (
    <Routes>    
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createEmployee" element={<CreateEmployee />} />
      <Route path="/editEmployee/:id" element={<EditEmployee />} />
      <Route path="/" element={<PricingPlans />} />
      <Route path="/registration" element={<Registration />} />

      {/* Agrega aquí más rutas según tu proyecto */}
    </Routes>
  );
}
