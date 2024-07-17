import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//import { db} from './dbConnection'
import router from './routes'
import { run } from './database';

// Create Express server
const app = express(); // New express instance
const port = process.env.PORT || 3001; // Port number, use environment variable if available

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router);

//app.listen(port, () => console.log(`server running at http://localhost:${port}`))

run().then(()=> {
  app.listen(port, () => console.log(`server running at http://localhost:${port}`))
});
