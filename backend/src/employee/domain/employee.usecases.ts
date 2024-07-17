import { IEmployee } from "./employe.model";
import { IEmployeeRepository } from "./employe.model";

export class EmployeeService {
    constructor(private employeeRepository: IEmployeeRepository) {}

    async GetAllEmployees(): Promise<IEmployee[]> {
        return await this.employeeRepository.getAllEmployees();
    }

    async GetEmployeeById(id: number): Promise<IEmployee | undefined> {
        return await this.employeeRepository.getEmployeeById(id);
    }

    async CreateEmployee(employee: IEmployee): Promise<IEmployee | undefined>{
        validateCreateEmployee(employee)
        return await this.employeeRepository.createEmployee(employee);
    }

    async UpdateEmployee(employee: IEmployee): Promise<IEmployee | undefined>{
        validateUpdateEmployee(employee)
        return await this.employeeRepository.updateEmployee(employee);
    }
}

function validateCreateEmployee(employee: IEmployee) {
    const { id, name, department } = employee;
    if(!name) throw new Error("Employee requerid name")
    if(!department) throw new Error("Employee requiered department")
    return 
}

function validateUpdateEmployee(employee: IEmployee) {
    const { id, name, department } = employee;
    if(!id) throw new Error("Employee requerid id to update")
    if(!name && !department) throw new Error("Employee need some field to update")
    return 
}
