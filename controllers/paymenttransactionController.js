const Paymenttransaction = require("../models/paymenttransaction");

const paymenttransactionController = {
  createRecord: async (req, res) => {
    try {
      const recordData = req.body;
      const recordId = await Paymenttransaction.createRecord(recordData);
      res.status(201).json({ recordId });
    } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getRecordById: async (req, res) => {
    try {
      const { id } = req.params;
      const record = await Paymenttransaction.getRecordById(id);
      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.json(record);
    } catch (error) {
      console.error("Error fetching record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllRecords: async (req, res) => {
    try {
      const records = await Paymenttransaction.getAllRecords();
      res.json(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateRecordById: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const success = await Paymenttransaction.updateRecordById(id, newData);
      if (!success) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record updated successfully" });
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteRecordById: async (req, res) => {
    try {
      const { id } = req.params;
      const success = await Paymenttransaction.deleteRecordById(id);
      if (!success) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record deleted successfully" });
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = paymenttransactionController;
