import {
  getAllRecordsByUser,
  deleteRecordById,
} from "../services/recordService.js";

// Get all records
const getAllRecords = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const records = await getAllRecordsByUser(userId);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

// Delete a record by ID
const deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRecord = await deleteRecordById(id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllRecords, deleteRecord };
