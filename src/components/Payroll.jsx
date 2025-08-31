import {useEffect, useState} from "react";
import {fetchEmployee, fetchDeduction, submitPayroll, fetchEmployeeById, fetchPayrollById} from "../src/Service/formService.jsx"
export default function Payroll({onClose, id}){

    const [formData, setFormData] = useState({
        payMode: '',
        grossPay: '',
        netPay: '',
        employee:'',
        deduction:[]
    })

    const [employeeList, setEmployeeList] = useState([])
    const [deductionList, setDeductionList] = useState([])
    const [payrollList, setPayrollList] = useState([])

    console.log('payrollList: ', payrollList)
    useEffect(() => {
        async function loadData() {
            const employeeData = await fetchEmployee();
            setEmployeeList(employeeData);

            const deductionData = await fetchDeduction();
            setDeductionList(deductionData);

            const payrollData = await fetchPayrollById(id);
            setPayrollList(payrollData);

            if (payrollData) {
                setFormData({
                    payMode: payrollData.payMode || '',
                    grossPay: payrollData.grossPay || '',
                    netPay: payrollData.netPay || '',
                    employee: payrollData.employee?.id || payrollData.employee || '',
                    deduction: payrollData.deduction?.map(d => d.id) ||  []
                });
            }
        }
        loadData();
    }, [id]);

    const handleChange = async (event) => {
        const { name, value, options } = event.target;

        if (name === 'employee') {
            setFormData(prev => ({
                ...prev,
                employee: value
            }));
        }
        else if (name === 'deduction') {
            const selectedIds = Array.from(options)
                .filter(option => option.selected)
                .map(option => parseInt(option.value));

            const totalDeductions = deductionList
                .filter(d => selectedIds.includes(d.id))
                .reduce((sum, d) => sum + d.amount, 0);

            const grossPay = parseFloat(formData.grossPay) || 0;
            const netPay = grossPay - totalDeductions;

            setFormData(prev => ({
                ...prev,
                deduction: selectedIds,
                netPay: netPay
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            payMode: formData.payMode,
            grossPay: formData.grossPay,
            netPay: formData.netPay,
            employee: formData.employee,
            deduction: formData.deduction
        }
        await submitPayroll(formattedData);
    };
    return(
        <div className="card">
            <div className="form-container">
                <button className="close-modal" onClick={onClose}>
                    X
                </button>
                <form action="#" method="get" onSubmit={handleSubmit}>
                    <label htmlFor="employee">Employee Name:</label>
                    <select id="employee" name="employee" value={formData.employee} onChange={handleChange} disabled>
                        <option value="">Select</option>
                        {employeeList.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                    </select>
                    <label htmlFor="payMode">Payment Mode:</label>
                    <select id="payMode" name="payMode" value={formData.payMode} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Every fifteen days</option>
                    </select>

                    <label htmlFor="grossPay">Gross Pay:</label>
                    <input type="number" id="grossPay" name="grossPay" value={formData.grossPay} onChange={handleChange}
                           required/>

                    <label htmlFor="netPay">Net Pay:</label>
                    <input type="number" id="netPay" name="netPay" value={formData.netPay} onChange={handleChange}
                           disabled
                           required/>

                    <label htmlFor="deduction">Deduction Type:</label>
                    <select
                        id="deduction"
                        name="deduction"
                        multiple
                        value={formData.deduction}
                        onChange={handleChange}
                    >
                        {deductionList.map(deduction => (
                            <option key={deduction.id} value={deduction.id}>
                                {deduction.type}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Save</button>
                </form>
                {payrollList && payrollList.employee === employeeList.id &&(
                    <form action="#" method="PUT" onSubmit={handleSubmit}>

                        <label htmlFor="employee">Employee Name:</label>
                        <select id="employee" name="employee" value={formData.employee} onChange={handleChange}>
                            <option value="">Select</option>
                            {employeeList.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                        <label htmlFor="payMode">Payment Mode:</label>
                        <select id="payMode" name="payMode" value={payrollList.payMode} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="monthly">Monthly</option>
                            <option value="biweekly">Every fifteen days</option>
                        </select>

                        <label htmlFor="grossPay">Gross Pay:</label>
                        <input type="number" id="grossPay" name="grossPay" value={payrollList.grossPay} onChange={handleChange}
                               required/>

                        <label htmlFor="netPay">Net Pay:</label>
                        <input type="number" id="netPay" name="netPay" value={payrollList.netPay} onChange={handleChange}
                               disabled
                               required/>

                        <label htmlFor="deduction">Deduction Type:</label>
                        <select
                            id="deduction"
                            name="deduction"
                            multiple
                            value={payrollList.deduction}
                            onChange={handleChange}
                        >
                            {deductionList.map(deduction => (
                                <option key={deduction.id} value={deduction.id}>
                                    {deduction.type}
                                </option>
                            ))}
                        </select>

                        <button type="submit">Save</button>
                    </form>
                    )}
            </div>
        </div>
    )
}