import { useEffect, useState } from 'react';
import { fetchEmployeeById, updateEmployee } from '../src/Service/formService';

export default function EditEmployeePage({onClose, id}) {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        async function loadData() {
            const employee = await fetchEmployeeById(id);
            setFormData(employee);
        }
        loadData();
    }, [id]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        onClose();
        await updateEmployee(id, formData);
    };

    if (!formData) return <p className="p-4">Cargando...</p>;

    return (
        <div className="card-edit-employee max-w-2xl mx-auto p-6">
            <div className="form-container">
            <button className="close-modal" onClick={onClose}>
                X
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4" method="put">

                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            name="name"
                            onChange={e => handleChange('name', e.target.value)}
                            className="w-full border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Identification:</label>
                        <input
                            type="text"
                            value={formData.idNumber}
                            name="idNumber"
                            onChange={e => handleChange('idNumber', e.target.value)}
                            className="w-full border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Position:</label>
                        <input
                            disabled
                            type="text"
                            value={formData.position}
                            name="position"
                            onChange={e => handleChange('position', e.target.value)}
                            className="w-full border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Salary:</label>
                        <input
                            disabled
                            type="number"
                            value={formData.salary}
                            name="salary"
                            onChange={e => handleChange('salary', e.target.value)}
                            className="w-full border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Hiring Date:</label>
                        <input
                            disabled
                            type="date"
                            value={formData.hiringDate}
                            name="hiring_date"
                            onChange={e => handleChange('hiringDate', e.target.value)}
                            className="w-full border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Contract Type:</label>
                        <select
                            value={formData.contract}
                            name="contract"
                            onChange={e => handleChange('contract', e.target.value)}
                            className="w-full border px-3 py-2"
                        >
                            <option value='indefinite'>Indefinite</option>
                            <option value='definite'>Definite</option>
                        </select>
                    </div>

                    <div>
                        <label>Is Active:</label>
                        <select
                            value={formData.isActive}
                            name="is_active"
                            onChange={e => handleChange('isActive', e.target.value === 'true')}
                            className="w-full border px-3 py-2"
                        >
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    {formData.isActive !== true && (
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={formData.periodEnd}
                                name="periodEnd"
                                onChange={e => handleChange('periodEnd', e.target.value)}
                                className="w-full border px-3 py-2"
                            />
                        </div>
                    )}
                    <div className="button-save-employee">
                        <button
                            type="submit"
                            className="save-edit bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
