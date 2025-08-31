import { useEffect, useState } from 'react';
import { fetchEmployee, deleteEmployee } from '../src/Service/formService.jsx';
import CreateEmployee from "./CreateEmployee.jsx";
import EditEmployee from "./EditEmployee.jsx";
import Payroll from "./Payroll.jsx";
export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPayrollModal, setShowPayrollModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = employees.filter(emp =>
        (emp.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const totalPages = Math.ceil(filteredEmployees.length  / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        async function loadEmployees() {
            const data = await fetchEmployee();
            setEmployees(data);
        }
        loadEmployees();
    }, []);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleDelete = async (id) => {
        if (confirm('¿Are you sure that you wanna delete this employee?')) {
            await deleteEmployee(id);
            setEmployees(employees.filter(e => e.id !== id));
        }
    };

    return (
        <div className="detail-table p-6 max-w-6xl mx-auto">
            <input
                type="text"
                placeholder="Search by name and position"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <button onClick={() => setShowModal(true)}
                    className=" create-employee-button bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 display: flex gap: 0.4rem"
            >
                Create Employee
            </button>
            {showModal && (
                <div className="modal-overlay">
                    <CreateEmployee className="create-employee-modal" onClose={() => setShowModal(false)}/>
                </div>
            )}

            <table className="detail-table min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Identification</th>
                    <th className="border px-4 py-2">Position</th>
                    <th className="border px-4 py-2">Salary</th>
                    <th className="border px-4 py-2">Hiring Date</th>
                    <th className="border px-4 py-2">Is Active</th>
                    <th className="border px-4 py-2">Contract Type</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentEmployees.map(emp => (
                    <tr key={emp.id} className={emp.isActive !== true ? 'inactive-row' : 'hover:bg-gray-50'}>
                        <td className="border px-4 py-2">{emp.name}</td>
                        <td className="border px-4 py-2">{emp.idNumber}</td>
                        <td className="border px-4 py-2">{emp.position}</td>
                        <td className="border px-4 py-2">{emp.salary}</td>
                        <td className="border px-4 py-2">{emp.hiringDate?.split('T')[0]}</td>
                        <td className="border px-4 py-2">{emp.isActive ? 'Si' : 'No'}</td>
                        <td className="border px-4 py-2">{emp.contract}</td>
                        <td className="detail-buttons">
                            <button
                                onClick={() => {
                                    setSelectedId(emp.id)
                                    setShowEditModal(true)
                                }}
                                className=" edit-detail-button text-white px-3 py-1 rounded display: flex gap: 0.4rem"
                            >
                                Update
                            </button>
                            {showEditModal && selectedId !== null && (
                                <div className="modal-overlay">
                                    <EditEmployee className="edit-employee-modal" id={selectedId}
                                                  onClose={() => {
                                                      setShowEditModal(false)
                                                      setSelectedId(null)
                                                  }}/>
                                </div>
                            )}
                            <button
                                onClick={() => handleDelete(emp.id)}
                                className="delete-detail-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 display: flex gap: 0.4rem"
                            >
                                Delete
                            </button>
                            <button onClick={() => {
                                setSelectedId(emp.id)
                                setShowPayrollModal(true)
                            }}
                                className="payroll-detail-button text-white px-3 py-1 rounded "
                            >Payroll
                            </button>
                            {showPayrollModal && selectedId !== null && (
                                <div className="modal-overlay">
                                    <Payroll className="create-payroll-modal" id={selectedId}
                                        onClose={() =>{
                                            setShowPayrollModal(false)
                                            setSelectedId(null)
                                        }}
                                    />
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className='bg-pagination-prev' onClick={handlePrev} disabled={currentPage === 1}>Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button className='bg-pagination-next' onClick={handleNext}
                        disabled={currentPage === totalPages}>Next
                </button>
            </div>
        </div>
    );
}
