export interface IEmployee {
    id?: number;
    name: string;
    department: string;
}

export interface IEmployeeRepository {
    getAllEmployees(): Promise<IEmployee[]>;
    getEmployeeById(id: number): Promise<IEmployee | undefined>;
    createEmployee(employee: IEmployee): Promise<IEmployee | undefined>;
    updateEmployee(employeeUpdated: IEmployee): Promise<IEmployee | undefined>;
    deleteEmployee(id: number): Promise<IEmployee | undefined>;
}

