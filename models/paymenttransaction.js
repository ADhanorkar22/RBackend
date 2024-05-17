const pool = require("../db");

const Paymenttransaction = {
  createRecord: async (recordData) => {
    const {
      pg_type,
      addedon,
      amount,
      // other fields
    } = recordData;

    const sql = `
      INSERT INTO payment_transactions (pg_type, addedon, amount, ...)
      VALUES (?, ?, ?, ...)
    `;
    const values = [
      pg_type,
      addedon,
      amount,
      // other values
    ];

    try {
      const [result] = await pool.query(sql, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  getRecordById: async (recordId) => {
    const sql = `SELECT * FROM payment_transactions WHERE id = ?`;
    const values = [recordId];

    try {
      const [rows] = await pool.query(sql, values);
      if (rows.length === 0) {
        return null; // Record not found
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  getAllRecords: async () => {
    const sql = `SELECT * FROM payment_transactions`;

    try {
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  updateRecordById: async (recordId, newData) => {
    const {
      pg_type,
      addedon,
      amount,
      // other fields
    } = newData;

    const sql = `
      UPDATE payment_transactions
      SET pg_type = ?, addedon = ?, amount = ?, ...
      WHERE id = ?
    `;
    const values = [
      pg_type,
      addedon,
      amount,
      // other values
      recordId,
    ];

    try {
      const [result] = await pool.query(sql, values);
      return result.affectedRows > 0; // Return true if updated successfully
    } catch (error) {
      throw error;
    }
  },

  deleteRecordById: async (recordId) => {
    const sql = `DELETE FROM payment_transactions WHERE id = ?`;
    const values = [recordId];

    try {
      const [result] = await pool.query(sql, values);
      return result.affectedRows > 0; // Return true if deleted successfully
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Paymenttransaction;
