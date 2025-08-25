

import React, { useEffect, useState } from 'react';
import { fetchPayroll, fetchEmployee, fetchPayrollDeduction, fetchEmployeeStatus, fetchEmployeeByDepartment } from '../src/Service/formService.jsx'
import EmployeeStatusChart from './EmployeeStatusChart';
import DepartmentPieChart from "./DepartmentPieChart.jsx";
export default function Dashboard() {
    const [payrollStatus, setPayrollStatus] = useState([]);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [deductionCount, setDeductionCount] = useState(0);
    const [employeeStatus, setEmployeeStatus] = useState({ active: 0, inactive: 0 });
    const [employeeByDepartment, setEmployeeByDepartment] = useState({
        administration: 0,
        sales: 0,
        production: 0,
        it: 0
    });

    useEffect(() => {
        async function loadDashboardData() {
            const payroll = await fetchPayroll();
            const employees = await fetchEmployee();
            const deductions = await fetchPayrollDeduction();
            const employeeStatusAverage = await fetchEmployeeStatus();
            const employeeByDepartmentAmount = await fetchEmployeeByDepartment();
            setPayrollStatus(payroll);
            setEmployeeCount(employees.length);
            setDeductionCount(deductions.length);
            setEmployeeStatus(employeeStatusAverage);
            setEmployeeByDepartment(employeeByDepartmentAmount);

        }

        loadDashboardData();

    }, []);

    const departmentData = [
        { name: 'Administratión', value: employeeByDepartment.administration },
        { name: 'Sales', value: employeeByDepartment.sales },
        { name: 'Productión', value: employeeByDepartment.production },
        { name: 'IT', value: employeeByDepartment.it}
    ];
    return (

        <div className="dashboard-container">
            <div className="card-grid">
                <div className="card-dashboard">
                    <h3>Employees</h3>
                    <p>{employeeCount}</p>
                </div>
                <div className="card-dashboard">
                    <h3>Payrolls</h3>
                    <p>{payrollStatus.length}</p>
                </div>
                <div className="card-dashboard">
                    <h3>Deductions</h3>
                    <p>{deductionCount}</p>
                </div>
            </div>
            <div className="recharts">
                <div className="chart-container">
                    <EmployeeStatusChart activeCount={employeeStatus.active}
                                         inactiveCount={employeeStatus.inactive}/>
                </div>
                <div className="chart-container">
                    <DepartmentPieChart data={departmentData}/>
                </div>
            </div>
        </div>
    );
}
