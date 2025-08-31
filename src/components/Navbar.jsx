import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuItems, setMenuItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {

    }, []);

    return (
        <nav className="navbar">
            <ul className="menu">
                <li><Link to="/dashboard" className="text-white hover:underline">Home</Link></li>
                <div className='group_options'>
                    <li><Link to="/detail" className="text-white hover:underline">Admin Employee</Link></li>
                    <li><Link to="/createPayroll" className="text-white hover:underline">Admin Payroll</Link></li>
                </div>
            </ul>
            <div className='menu-lateral'>
                <img className="menu-img" src="src/assets/speisekarte.png" alt="menu"/>
            </div>
        </nav>
    );
}
