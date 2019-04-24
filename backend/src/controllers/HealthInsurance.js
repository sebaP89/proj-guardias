import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const HealthInsurance = {
  /**
   * Create A HealthInsurance
   * @param {object} req 
   * @param {object} res
   * @returns {object} return status code 204
   */
  async create(req, res) {
    if (!req.body.name) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    const createQuery = `INSERT INTO
      public."healthInsurance"(id, name)
      VALUES($1, $2)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ 'message': 'created' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Delete A HealthInsurance
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM public."healthInsurance" WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.body.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'healthInsurance not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All HealthInsurance
   * @param {object} req 
   * @param {object} res 
   * @returns {object} HealthInsurance array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM public."healthInsurance"';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default HealthInsurance;