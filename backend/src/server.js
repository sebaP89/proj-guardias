// server.js
import express from 'express';
import dotenv from 'dotenv';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Users from './controllers/Users';
import HealthInsurance from './controllers/HealthInsurance';

dotenv.config();
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

app.post('/api/v1/users/:id', Users.delete);
app.post('/api/v1/healthInsurance', HealthInsurance.create);
app.delete('/api/v1/healthInsurance/:id', HealthInsurance.delete);
app.post('/api/v1/users', Users.create);
app.post('/api/v1/user/login', Users.login);
app.get('/api/v1/user/specialities/:id',  Users.getSpecialitiesFromUserId);
app.get('/api/v1/user/clinics/:id&:specialityId',  Users.getClinicsFromSpecialityId);
app.get('/api/v1/healthInsurance', HealthInsurance.getAll);
app.post('/api/v1/user/urgency', Users.addUrgency);
app.get('/api/v1/user/urgency/:id',  Users.getUrgency);

app.listen(3000)
console.log('app listening on port ', 3000);