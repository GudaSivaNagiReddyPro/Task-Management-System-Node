const express = require("express");
const {
  taskCreate,
  fetchAllTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../../../../controllers/task.controller");
const {
  isAuthentication,
} = require("../../../../middlewares/authentication-middleware");
const { validateInput } = require("../../../../utils/validate.util");
const {
  taskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  updateTaskStatusSchema,
} = require("../../../../validations/task.validation");

const router = express.Router();

router.post(
  "/create-task",
  isAuthentication,
  validateInput(taskSchema),
  taskCreate
);

router.get("/tasks", isAuthentication, fetchAllTasks);
router.put(
  "/update-task",
  isAuthentication,
  validateInput(updateTaskSchema),
  updateTask
);
router.put(
  "/update-task-status",
  isAuthentication,
  validateInput(updateTaskStatusSchema),
  updateTaskStatus
);
router.delete(
  "/delete-task",
  isAuthentication,
  validateInput(deleteTaskSchema),
  deleteTask
);

module.exports = router;
