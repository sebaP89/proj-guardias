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
        !req.body.lastname) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      public."user"(id, email, firstname, lastname, password)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      hashPassword
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({'message': 'created'});
    } catch(error) {
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
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Users;