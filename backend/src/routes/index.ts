import { Router } from 'express';
import employeesRouter from '../employee/framework/employee.express';

const router = Router();
router.use("/employees", employeesRouter)

export default router;