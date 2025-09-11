import { Routes, Route } from "react-router-dom";
import PricingPlans from "./pages/PricingPLans.jsx";
import Registration from "./pages/Registration.jsx";
import { Login } from "./pages/Login.jsx";
// importa aquí los demás componentes/páginas

export default function AppRoutes() {
  return (
    <Routes>    
      <Route path="/" element={<PricingPlans />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />

      {/* Agrega aquí más rutas según tu proyecto */}
    </Routes>
  );
}
