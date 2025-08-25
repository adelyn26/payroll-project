export async function submitEmployee(formData) {
    try {
        const response = await fetch('http://localhost/api/save-employee', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)

        });
        console.log('Form Data:', formData);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error saving data.');
        }

        alert('Data saved successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to save the game.');
    }
}

export async function submitPayroll(formData){
    try{
        const response = await fetch('http://localhost/api/save-payroll', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        console.log('Form Data:', formData);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error saving data.');
        }
        alert('Data saved successfully!');
    }catch (error){
        console.error('Error submitting form:', error);
        alert('Failed to save the game.');
    }
}
export async function fetchEmployee() {
    try {
        const response = await fetch('http://localhost/api/employee', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employee');
        }
        return await response.json();

    } catch (error) {
        console.error('Error fetching employee:', error);
        return [];
    }
}
export async function fetchPayroll() {
    try {
        const response = await fetch('http://localhost/api/payroll', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employee');
        }
        return await response.json();

    } catch (error) {
        console.error('Error fetching employee:', error);
        return [];
    }
}
export async function fetchPayrollById(id) {
    try {
        const response = await fetch(`http://localhost/api/payroll/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch payroll by id');
        }
        const result =  await response.json();
        console.log('payroll Id: ', result);
        return result;

    } catch (error) {
        console.error('Error fetching payroll by id:', error);
        return [];
    }
}
export async function fetchDeduction() {
    try {
        const response = await fetch('http://localhost/api/deduction', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch deduction');
        }
        console.log('deductions:', response);

        return await response.json();

    } catch (error) {
        console.error('Error fetching deduction:', error);
        return [];
    }
}
export async function fetchPayrollDeduction() {
    try {
        const response = await fetch('http://localhost/api/payroll-deduction', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employee');
        }
        return await response.json();

    } catch (error) {
        console.error('Error fetching employee:', error);
        return [];
    }
}
export async function deleteEmployee(id) {
    try {
        const response = await fetch(`http://localhost/api/delete/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }
        console.log('delete:', response);

        return await response.json();

    } catch (error) {
        console.error('Error deleting employee:', error);
        return [];
    }
}
export async function updateEmployee( id, formData) {
    try {
        const response = await fetch(`http://localhost/api/update/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to update employee');
        }
        const data =  await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error updating employee:', error);
        return [];
    }
}
export async function fetchEmployeeById(id) {
    try {
        const response = await fetch(`http://localhost/api/employee/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching employee:', error);
        return [];
    }
}
export async function fetchEmployeeStatus(){
    try{
    const response = await fetch(`http://localhost/api/employees/stats`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
        if (!response.ok) {
            throw new Error('Failed to fetch employeeStatus');
        }
        return await response.json();
    } catch (error) {
    return [];
    }
}
export async function fetchEmployeeByDepartment(){
    try{
        const response = await fetch(`http://localhost/api/employee-by-department`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employeeByDepartment');
        }
      const data =  await response.json();
        console.log('department formService: ', data)
        return data;
    } catch (error) {
        return [];
    }
}