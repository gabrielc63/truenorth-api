import {
  getAllRecordsByUser,
  deleteRecordById,
} from "../services/recordService.js";

// Create a new record
const createRecord = async (req, res) => {
  const { user_id, amount } = req.body;
  try {
    const record = await prisma.record.create({
      data: { user_id, amount },
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

// Get a single record by ID
const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.record.findUnique({
      where: { id: parseInt(id) },
    });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a record by ID
const updateRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecord = await prisma.record.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
