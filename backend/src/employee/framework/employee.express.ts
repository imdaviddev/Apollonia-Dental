import express, { Request, Response } from 'express';
import { EmployeeRepositoryImplSQLITE } from '../data/employee.repository.sqlite';
import { EmployeeService } from '../domain/employee.usecases';
import { IEmployee } from '../domain/employe.model';

const router = express.Router();
const employeeRepository = new EmployeeRepositoryImplSQLITE();
const employeeService = new EmployeeService(employeeRepository);

router.get('/', async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.GetAllEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send('Error retrieving employees: ' + err);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeeId = parseInt(id, 10); 
        const employee = await employeeService.GetEmployeeById(employeeId);
        if (!employee) {
            res.status(404).send('Employee not found');
            return;
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Error retrieving employee: ' + err);
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, department } = req.body
        const newEmployee: IEmployee = {
            name: name,
            department: department,
        }
        const employee = await employeeService.CreateEmployee(newEmployee);
        if (!employee) {
            res.status(400).send('Employee can not be create');
            return;
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Error creating employee: ' + err);
    }
});


router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, department } = req.body
        const employeeUpdated: IEmployee = {
            id: parseInt(id, 10),
            name: name,
            department: department,
        }
        const employee = await employeeService.UpdateEmployee(employeeUpdated);
        if (!employee) {
            res.status(400).send('Employee can not be update');
            return;
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Error updating employee: ' + err);
    }
});

export default router;
