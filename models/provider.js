const pool = require('../db');

const Provider = {
  createRecord: (recordData, callback) => {
    const {
      name,
      middle_name,
      last_name,
      mobile_number,
      email,
      outlet_name,
      aadharcard_number,
      gstin,
      date_of_birth,
      remark,
      bank_account_number,
      ifsc,
      main_min_balance,
      low_balance_alert_limit,
      address,
      pin_code,
      district,
      state,
      city,
      alternate_number,
      pancard_number,
      voter_id_number,
      aeps_unsettled_fund
    } = recordData;

    const sql = `
      INSERT INTO Provider (
        name,
        middle_name,
        last_name,
        mobile_number,
        email,
        outlet_name,
        aadharcard_number,
        gstin,
        date_of_birth,
        remark,
        bank_account_number,
        ifsc,
        main_min_balance,
        low_balance_alert_limit,
        address,
        pin_code,
        district,
        state,
        city,
        alternate_number,
        pancard_number,
        voter_id_number,
        aeps_unsettled_fund
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      middle_name,
      last_name,
      mobile_number,
      email,
      outlet_name,
      aadharcard_number,
      gstin,
      date_of_birth,
      remark,
      bank_account_number,
      ifsc,
      main_min_balance,
      low_balance_alert_limit,
      address,
      pin_code,
      district,
      state,
      city,
      alternate_number,
      pancard_number,
      voter_id_number,
      aeps_unsettled_fund
    ];

    pool.query(sql, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  },

  getRecordById: (recordId, callback) => {
    const sql = `SELECT * FROM Provider WHERE id = ?`;
    const values = [recordId];

    pool.query(sql, values, (err, rows) => {
      if (err) {
        return callback(err);
      }
      if (rows.length === 0) {
        return callback(null, null); // Record not found
      }
      return callback(null, rows[0]);
    });
  },

  getAllRecords: (callback) => {
    const sql = `SELECT * FROM Provider`;

    pool.query(sql, (err, rows) => {
      if (err) {
        return callback(err);
      }
      return callback(null, rows);
    });
  },

  updateRecordById: async (recordId, newData) => {
    const {
        name,
        mobile_number,
        date_of_birth,
        address,
        pincode,
        city,
    } = newData;

    const sql = `
    UPDATE users
    SET 
    name = ?,
    mobile_number = ?,
    date_of_birth = ?,
    address = ?,
    pincode = ?,
    city = ?
    WHERE user_id = ?
`;

    const values = [
      name,
      mobile_number,
      date_of_birth,
      address,
      pincode,
      city,
      recordId
  ];

    try {
        const result = await pool.query(sql, values);
        console.log("result affected ", result[0].affectedRows); 
        return result[0].affectedRows > 0; 
    } catch (err) {
        throw err; 
    }
},

deleteRecordById: async(recordId) => {
  const sql = `DELETE FROM users
   WHERE user_id = ?`;
  const values = [recordId];
try{
  const result=await pool.query(sql, values);

    return result[0].affectedRows > 0; 
  }catch(err){
    throw err;
  }
},
updateStatusInActiveById : async (recordId) => {
  const Inactive='Not Active';
  const sql = `UPDATE users SET status = ? WHERE user_id = ?`;

  const values = [Inactive,recordId];

  try {
      const result = await pool.query(sql, values);
      console.log("result affected ", result[0].affectedRows); 
      return result[0].affectedRows > 0; 
  } catch (err) {
      throw err; 
  }
},


updateStatusActiveById : async (recordId) => {
  const Inactive='Active';
  const sql = `UPDATE users SET status = ? WHERE user_id = ?`;

  const values = [Inactive,recordId];

  try {
      const result = await pool.query(sql, values);
      console.log("result affected ", result[0].affectedRows); 
      return result[0].affectedRows > 0; 
  } catch (err) {
      throw err; 
  }
},






};

module.exports = Provider;
