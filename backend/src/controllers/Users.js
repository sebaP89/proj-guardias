import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const Users = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} return status code 204
   */
  async create(req, res) {
    if (!req.body.email ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.password ||
      !req.body.idClinic) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      public."user"(id, email, firstname, lastname, password, "idHealthInsurance")
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      hashPassword,
      req.body.idClinic
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      console.log(token);
      return res.status(201).send({ 'message': 'created' });
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },

  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM public."user" WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.body.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} return status code 204
   */
  async login(req, res) {
    if (!req.body.email ||
      !req.body.password) {
      console.log("parameters missing");
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      console.log("invalid email");
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }

    const text = 'SELECT * FROM public."user" WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        console.log("user not found");
        return res.status(404).send({ 'message': 'user not found' });
      }
      if (Helper.comparePassword(rows[0].password, req.body.password)) {
        console.log(rows[0]);
        return res.status(201).send({ user: rows[0] });
      }
      else {
        console.log("invalid password");
        return res.status(404).send({ 'message': 'invalid password' });
      }

    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async getSpecialitiesFromUserId(req, res) {
    const text = `select distinct "s"."nombre" as "specialityName", "s"."id" as "specialityId" from public."user" as u
      inner join public."healthInsurance" as hi on ("u"."idHealthInsurance" = "hi"."id")
      inner join public."clinic_healthInsurance" as chi on ("hi"."id" = "chi"."idHealthInsurance")
      inner join public."clinic" as c on ("c"."id" = "chi"."idClinic")
      inner join public."clinic_speciality" as cs on ("chi"."idClinic" = "cs"."idClinic")
      inner join public."speciality" as s on ("s"."id" = "cs"."idSpeciality")
      where "u"."id" = $1`;
    try {
      console.log(text);
      console.log(req.params.id);
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send({ specialities: rows });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  async getClinicsFromSpecialityId(req, res) {
    const text = `select "c"."name" as "clinicName", "c"."id" as "clinicId", "c"."coordinates" as "clinicCoords" from public."user" as u
      inner join public."healthInsurance" as hi on ("u"."idHealthInsurance" = "hi"."id")
      inner join public."clinic_healthInsurance" as chi on ("hi"."id" = "chi"."idHealthInsurance")
      inner join public."clinic" as c on ("c"."id" = "chi"."idClinic")
      inner join public."clinic_speciality" as cs on ("chi"."idClinic" = "cs"."idClinic")
      inner join public."speciality" as s on ("s"."id" = "cs"."idSpeciality")
      where "u"."id" = $1 and "s"."id" = $2`;
    try {
      console.log(text);
      console.log(req.params.id);
      console.log(req.params.specialityId);
      const { rows } = await db.query(text, [req.params.id, req.params.specialityId]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send({ clinics: rows });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} return status code 204
   */
  async addUrgency(req, res) {
    const createQuery = `INSERT INTO
    public."urgency"("idUser", "idClinic", "idSpeciality", number, timestamp)
    VALUES($1, $2, $3, $4, $5)
    returning *`;

    const number = Helper.makeBookingNumber(4);
    const values = [
      req.body.idUser,
      req.body.idClinic,
      req.body.idSpeciality,
      number,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ user: rows[0] });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async getUrgency(req, res) {
    const text = `SELECT u.number as "bookingNumber", c.name as "clinicName" FROM public.urgency as u
      inner join public."clinic" as c on (c.id = u."idClinic")
      where u."idUser" = $1
      order by u.timestamp desc`;
    try {
      console.log(text);
      console.log(req.params.id);
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(200).send({ booking: {} });
      }
      return res.status(200).send({ booking: rows[0] });
    } catch(error) {
      return res.status(400).send(error)
    }
  },
}

export default Users;