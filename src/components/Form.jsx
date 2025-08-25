
export default function Form() {

    return(
        <div className="card">
            <div className="form-container">
                <h2>Nómina de Empleados</h2>
                <form action="#" method="post">
                    <label htmlFor="name">Employee Name:</label>
                    <input type="text" id="name" name="name" required/>

                    <label htmlFor="id">Employee Id:</label>
                    <input type="text" id="id" name="id" required/>

                    <label htmlFor="departamento">Department:</label>
                    <select id="departamento" name="departamento" required>
                        <option value="">Select</option>
                        <option value="administracion">Administration</option>
                        <option value="ventas">Sales</option>
                        <option value="produccion">Production</option>
                        <option value="it">IT</option>
                    </select>

                    <label htmlFor="salario">Gross Salary (€):</label>
                    <input type="number" id="salary" name="salary" step="0.01" required/>

                    <label htmlFor="over_time">Over Time:</label>
                    <input type="number" id="over_time" name="over_time" step="0.01"/>

                    <label htmlFor="deductions">Deductions (€):</label>
                    <input type="number" id="deductions" name="deductions" step="0.01"/>

                    <button type="submit">Generate Payroll</button>
                </form>
            </div>
        </div>
    )
}
