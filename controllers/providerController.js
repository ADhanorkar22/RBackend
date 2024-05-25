const Provider = require('../models/provider');
const jwt = require("jsonwebtoken");

const {

  getUserById,

} = require("../models/dbOperations");


const providerController = {
  createRecord: (req, res) => {
    const recordData = req.body;
    Provider.createRecord(recordData, (err, recordId) => {
      if (err) {
        console.error('Error creating record:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ recordId });
    });
  },

  getRecordById: (req, res) => {
    const { id } = req.params;
    Provider.getRecordById(id, (err, record) => {
      if (err) {
        console.error('Error fetching record:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    });
  },

  getAllRecords: (req, res) => {
    Provider.getAllRecords((err, records) => {
      if (err) {
        console.error('Error fetching records:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(records);
    });
  },

  updateRecordById: async (req, res) => {

    const token = req.headers.authorization; // Token sent directly without "Bearer " prefix
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const users = await getUserById(userId);
    if (users.user_type !== "Admin") {
      return res.status(403).json({
        message:
          "Unauthorized access. Only Admin users are permitted to use this functionality.",
      });
    }


    const id = req.params.id;
    const newData = req.body;
    try {
      const success = await Provider.updateRecordById(id, newData);
      console.log("susess", success)
      if (success) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  ///
  changeStatusInActiveById: async (req, res) => {

    const token = req.headers.authorization; // Token sent directly without "Bearer " prefix
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const users = await getUserById(userId);
    if (users.user_type !== "Admin") {
      return res.status(403).json({
        message:
          "Unauthorized access. Only Admin users are permitted to use this functionality.",
      });
    }


    const id = req.params.id;
    // const newData = req.body;
    try {
      const success = await Provider.updateStatusInActiveById(id);
      console.log("susess", success)
      if (success) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },



  changeStatusActiveById: async (req, res) => {

    const token = req.headers.authorization; // Token sent directly without "Bearer " prefix
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const users = await getUserById(userId);
    if (users.user_type !== "Admin") {
      return res.status(403).json({
        message:
          "Unauthorized access. Only Admin users are permitted to use this functionality.",
      });
    }


    const id = req.params.id;
    // const newData = req.body;
    try {
      const success = await Provider.updateStatusActiveById(id);
      console.log("susess", success)
      if (success) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  decryptPassword(encryptedPassword) {
    const algorithm = 'aes-256-cbc'; // Ensure this matches your encryption algorithm
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Make sure your key is securely stored in env variables
    const iv = Buffer.from(encryptedPassword.iv, 'hex'); // Assuming the IV is stored with the encrypted password
    const encryptedText = Buffer.from(encryptedPassword.content, 'hex');

    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  },

  verifympmGetdataById: async (req, res) => {
    const token = req.headers.authorization;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await getUserById(userId);
      console.log(user);

      if (!user) {
        return res.status(404).json({
          message: "User Not Found"
        });
      }

      const { user_id, name, email, original_password, mobile_number } = user;

      // Decrypt password here
      //const decryptedPassword = decryptPassword(password);

      const responseUser = { user_id, name, email, original_password, mobile_number };
       console.log(original_password);
      return res.status(200).json(responseUser);
     
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },




  ////
  deleteRecordById: async (req, res) => {

    const token = req.headers.authorization; // Token sent directly without "Bearer " prefix
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const users = await getUserById(userId);
    if (users.user_type !== "Admin") {
      return res.status(403).json({
        message:
          "Unauthorized access. Only Admin users are permitted to use this functionality.",
      });
    }


    const id = req.params.id;

    console.log(id);
    try {
      const success = await Provider.deleteRecordById(id);
      if (success) {
        res.status(200).json({ message: "Record updated successfully" })
      }
      else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal server error" });
    }


  },
};

module.exports = providerController;
