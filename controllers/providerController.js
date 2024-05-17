const Provider = require('../models/provider');

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

  updateRecordById: async(req, res) => {

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
  
  
    const  id = req.params.id;
    const newData = req.body;
    try {
      const success = await  Provider.updateRecordById(id, newData);
      console.log("susess",success)
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
   changeStatusById: async(req, res) => {

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
  
  
    const  id = req.params.id;
   // const newData = req.body;
    try {
      const success = await  Provider.updateStatusdById(id);
      console.log("susess",success)
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
  




   ////
   deleteRecordById: async(req, res) => {

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


    const id  = req.params.id;
  
  console.log(id);
  try{
   const success=await Provider.deleteRecordById(id);
   if(success){
    res.status(200).json({message:"Record updated successfully"})
   }
  else{
      res.status(404).json({error:"Record not found"});
  }
}catch(err){
    console.error("Error updating record:",err);
    res.status(500).json({error:"Internal server error"});
  }
  
   
  },
};

module.exports = providerController;
