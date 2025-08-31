
import './App.css'
import Form from "./components/Form.jsx";
import Detail from "./components/Detail.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import Payroll from "./components/Payroll.jsx";
import EditEmployee from "./components/EditEmployee.jsx"
import Dashboard from "./components/Dashboard.jsx"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
function App() {
    return (
    <Router>
        <Navbar/>
        <Routes>
                <Route path="/form" element={<Form />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/createEmployee" element={<CreateEmployee />} />
                <Route path="/createPayroll" element={<Payroll />} />
                <Route path="/editEmployee/:id" element={<EditEmployee />} />
                <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    )
}
export default App
