import { db } from "../utils/db.js";

function createRecordByUserAndOperation(user, operation) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function getAllRecordsByUser(userId) {
  return db.record.findMany({ where: { userId: userId, deleted: false } });
}

// soft delete records.
function deleteRecordById(id) {
  return db.record.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });
}

export {
  createRecordByUserAndOperation,
  getAllRecordsByUser,
  deleteRecordById,
};
