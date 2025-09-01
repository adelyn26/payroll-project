import {useState} from "react";
import {submitEmployee} from '../src/Service/formService.jsx'

export default function CreateEmployee({onClose}) {
    const [formData, setFormData] = useState({
        name: '',
<<<<<<< HEAD
        idNumber:'',
=======
        identificationNumber:'',
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
        position:'',
        salary:'',
        over_time:'',
        hiringDate:'',
        periodEnd: '',
        contract: '',
        isActive:true
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        onClose();
        const formattedData = {
            ...formData,
            name: formData.name,
<<<<<<< HEAD
            idNumber: formData.idNumber,
=======
            identificationNumber: formData.identificationNumber,
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
            position: formData.position,
            salary: formData.salary,
            over_time: formData.over_time,
            hiringDate: formData.hiringDate,
            isActive: formData.isActive,
            periodEnd: formData.periodEnd,
            contract: formData.contract
        };
        await submitEmployee(formattedData);
    };
    return(
        <div className="card-create-employee">
            <div className="form-container">
                <button className="close-modal" onClick={onClose}>
                    X
                </button>
                    <h2>Create Employee</h2>
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                           required/>

<<<<<<< HEAD
                    <label htmlFor="idNumber">Identification number:</label>
                    <input type="text" id="idNumber" name="idNumber" value={formData.idNumber}
=======
                    <label htmlFor="identificationNumber">Identification number:</label>
                    <input type="text" id="identificationNumber" name="identificationNumber" value={formData.identificationNumber}
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
                           onChange={handleChange}
                           required/>

                    <label htmlFor="position">Departments:</label>
                    <select id="position" name="position" value={formData.position} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="administration">Administratión</option>
                        <option value="sales">Sales</option>
                        <option value="production">Productión</option>
                        <option value="it">IT</option>
                    </select>

                    <label htmlFor="typeOfContract">Type of Contract</label>
                    <select id="contract" name="contract" value={formData.contract} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="defined">Defined</option>
                        <option value="indefinite">Indefinite</option>
                    </select>

                    <label htmlFor="salary">Base Salary (€):</label>
                    <input type="number" id="salary" name="salary" step="0.01" value={formData.salary}
                           onChange={handleChange} disabled/>

                    <label htmlFor="hiringDate">Hiring Date:</label>
                    <input type="date" id="hiringDate" name="hiringDate" value={formData.hiringDate}
                           onChange={handleChange} required/>

                    <label htmlFor="isActive">Is Active:</label>
                    <select id="isActive" name="isActive" value={formData.isActive} onChange={handleChange}>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </select>
                    {formData.isActive !== true && (
                        <>
                            <label htmlFor="periodEnd">End Date:</label>
                            <input type="date" id="periodEnd" name="periodEnd" value={formData.periodEnd}
                                   onChange={handleChange} required/>
                        </>
                    )}
                    <div className="button-save-employee">
                        <button className="submit-employee" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
