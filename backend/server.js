// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Users from './src/controllers/Users';
import HealthInsurance from './src/controllers/HealthInsurance';

dotenv.config();
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

app.post('/api/v1/users', Users.create);
app.post('/api/v1/users/:id', Users.delete);
app.post('/api/v1/healthInsurance', HealthInsurance.create);
app.delete('/api/v1/healthInsurance/:id', HealthInsurance.delete);
app.get('/api/v1/healthInsurance', HealthInsurance.getAll);

app.listen(3000)
console.log('app running on port ', 3000);