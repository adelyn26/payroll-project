// import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layouts/Navbar.jsx";
import AppRoutes from "./routes.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}  
      <AppRoutes />
      {/* <div className="min-h-screen bg-background">
      
      </div> */}
    </BrowserRouter>
  );
}
export default App;
