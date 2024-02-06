import React, { useState, useEffect } from "react";
import axios from "axios";
interface Employee {
    employeeId: string,
    fName: string,
    lName: string
}

export const EmployeeForm: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState<Employee>({
        employeeId: '',
        fName: '',
        lName:''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/employees', newEmployee)
            setNewEmployee({ employeeId: '', fName: '', lName: '' })
        } catch (error) {
            console.log('Error handling employee: ',error)
        }
    }
    return (
        <div>
            <h3>Add employee</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    EmployeeID:<input type="text" name="employeeId" value={newEmployee.employeeId} onChange={handleInputChange}></input>
                </div>
                <div>
                    First Name: <input type="text" name="fName" value={newEmployee.fName} onChange={handleInputChange}></input>
                </div>
                <div>
                    Last Name: <input type="text" name="lName" value={newEmployee.lName} onChange={handleInputChange}></input>
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}