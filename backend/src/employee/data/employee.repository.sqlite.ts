import { IEmployee, IEmployeeRepository } from '../domain/employe.model'; 
import { db } from '../../database';

export class EmployeeRepositoryImplSQLITE implements IEmployeeRepository {

    async getAllEmployees(): Promise<IEmployee[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employees'; // Cambia 'employees' por el nombre de tu tabla
            db.all(query, (err, rows: any[]) => { // Definir rows como any[]
                if (err) {
                    reject(err);
                } else {
                    const employees: IEmployee[] = rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        department: row.department
                    }));
                    resolve(employees);
                }
            });
        });
    }

    async getEmployeeById(id: number): Promise<IEmployee | undefined> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employees WHERE id = ?'; // Cambia 'employees' por el nombre de tu tabla
            db.get(query, [id], (err, row: IEmployee) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(undefined); // No se encontró ningún empleado con ese ID
                } else {
                    const employee: IEmployee = {
                        id: row.id,
                        name: row.name,
                        department: row.department
                    };
                    resolve(employee);
                }
            });
        });
    }

    async createEmployee(employee: IEmployee): Promise<IEmployee | undefined> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO employees (name, department)
                VALUES (?, ?)
            `;
            const values = [employee.name, employee.department];

            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Si la inserción fue exitosa, devolvemos el objeto empleado creado
                    const createdEmployee: IEmployee = {
                        id: this.lastID, // `this.lastID` es el ID generado automáticamente por SQLite
                        name: employee.name,
                        department: employee.department
                    };
                    resolve(createdEmployee);
                }
            });
        });
    }

    async updateEmployee(employeeUpdated: IEmployee): Promise<IEmployee | undefined> {
        return new Promise((resolve, reject) => {
            const { id, name, department } = employeeUpdated;
            const values = [];
            let query = 'UPDATE employees SET';
    
            // Construir dinámicamente la parte SET de la consulta
            if (name) {
                query += ' name = ?,';
                values.push(name);
            }
            if (department) {
                query += ' department = ?,';
                values.push(department);
            }
    
            // Eliminar la última coma de la cadena de consulta SET
            query = query.slice(0, -1); // Elimina la última coma
    
            // Agregar la condición WHERE
            query += ' WHERE id = ?';
            values.push(id);
    
            // Ejecutar la consulta
            db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    resolve(undefined); // No se actualizó ningún registro
                } else {
                    resolve(employeeUpdated);
                }
            });
        });
    }
    

    async deleteEmployee(id: number): Promise<IEmployee | undefined> {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM employees WHERE id = ?'; // Cambia 'employees' por el nombre de tu tabla
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    resolve(undefined); // No se eliminó ningún registro
                } else {
                    const deletedEmployee: IEmployee = {
                        id: id,
                        name: '', // Puedes devolver los datos eliminados si es necesario
                        department: ''
                    };
                    resolve(deletedEmployee);
                }
            });
        });
    }
}
