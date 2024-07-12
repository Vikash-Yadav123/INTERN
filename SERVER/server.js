import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import ConnectDb from './config/db.js';
import authrouter from './routes/authRoutes.js';
const app = express();


// LOAD ENVIORNMENT 
dotenv.config();

// CONNECT DATABASE
ConnectDb();


//  MIDDILWARE
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS
app.use(morgan('dev')); // Use Morgan for logging HTTP requests

// ROUTES OF MIDDILWARE
app.use('/api/v1/auth', authrouter);

app.get('/', (req, resp) => {
    resp.send("Hii");
})


const HOST = 9090 || process.env.PORT;

app.listen(HOST, () => {
    console.log(`YOUR SERVER IS RUN ${process.env.PORT} ON ${process.env.VIKASH}`.bgCyan);

})

// REGISTERATION API=>http://localhost:9090/api/v1/auth/register
// LOGIN API=>http://localhost:9090/api/v1/auth/login
// FORGET-PASSWORD=>http://localhost:9090/api/v1/auth/forget-password




