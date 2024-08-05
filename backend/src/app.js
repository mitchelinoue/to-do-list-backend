// import { openDb } from './configSqlite.js';
import {createTableTasks, createTask, getTasks, deleteTask} from './Controller/task.js'
import { createTableUsers, createUser, loginUser } from './Controller/user.js';
import { loginVerify } from './middleware/login.js';
import express  from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' with  { type: "json" };

const app = express();
app.use(express.json());

createTableTasks();
createTableUsers();

app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/task',loginVerify, (req, res) =>{
  getTasks(req, res);
})

app.post('/task', loginVerify, (req, res) => {
  createTask(req, res)
})

app.delete('/task/:id', loginVerify, (req, res) => {
  const id = req.params['id'] 
  deleteTask(req, res, id);
})

app.post('/register', (req, res) => {
  createUser(req, res);
})

app.post('/login', (req, res) => {
  loginUser(req, res);
})

app.listen(3000, () => console.log("API working"))