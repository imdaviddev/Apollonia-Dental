import path from 'path';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Ruta al archivo de la base de datos SQLite
const dbFilePath = path.join(__dirname, "database.sqlite");
export const db = new sqlite3.Database(dbFilePath);

// Promisify the SQLite3 database functions
export const query = promisify(db.all).bind(db);

// Interfaz para la propiedad de la base de datos
export interface IDatabaseProp {
    table: string;
    object: {};
}

// Consulta SQL para crear la tabla de usuarios si no existe
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT,
    "department" TEXT
  )
`;

// Función asincrónica para ejecutar una consulta INSERT en la tabla especificada
// e insertar el objeto proporcionado.
const create = async ({ table, object }: IDatabaseProp) => {
    const keys = Object.keys(object).join(",");
    const values = Object.values(object)
        .map((v) => (typeof v === 'string' ? `"${v}"` : v))
        .join(",");
    const insertQuery = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
    const res = await query(insertQuery);
    return res;
};

// Función asincrónica para leer todos los registros y todas sus columnas de una tabla dada
const read = async ({ table }: IDatabaseProp) => {
    const selectQuery = `SELECT * FROM ${table}`;
    const res = await query(selectQuery);
    return res;
};

// Función principal que ejecuta el script
export const run = async () => {
    try {
        query("DELETE FROM employees").catch(() => console.log("Crea la tabla bobo")).finally(async () => {
            // Crear la tabla de empleados si no existe
            await query(createTableQuery);

            // Crear un nuevo empleado
            let newEmployee = {
                name: "David",
                department: "Hola"
            };
            await create({ table: "employees", object: newEmployee });

            // Leer todos los empleados
            const employees = await read({ table: "employees", object: {} });

            // Imprimir en la consola
            //console.log(employees);
        })


    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Cerrar la conexión de la base de datos al finalizar
    }
};

