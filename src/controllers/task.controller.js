"use strict";
const { httpsStatusCodes, httpResponses } = require("../constants");
const { Task } = require("../models/postgres");
const { successResponse, errorResponse } = require("../utils/response.util");

// create task
const taskCreate = async (req, res, next) => {
  try {
    const { user } = req;
    const { title, description } = req.body;
    const createTask = await Task.create({
      title,
      description,
      user_id: user.user_id,
    });
    const response = {
      title,
      description,
      created_at: createTask.created_at,
      updated_at: createTask.updated_at,
    };
    console.log(/task/, response);
    return res.json(
      successResponse(
        response,
        "TASK_CREATED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_CREATING_TASK",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// update task
const fetchAllTasks = async (req, res, next) => {
  try {
    const { user } = req;
    const findTasks = await Task.findAll({
      where: { user_id: user.user_id },
      attributes: { exclude: ["id", "user_id"] },
    }); // Exclude the id and user_id fields });
    const response = {
      task: findTasks,
    };
    return res.json(
      successResponse(
        response,
        "TASK_FETCHED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_FETCHING_ALL_TASK",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const { user } = req;
    const { uuid, title, description } = req.body;

    const task = await Task.findOne({
      where: { uuid: uuid, user_id: user.user_id },
    });
    if (!task) {
      return res.json(
        errorResponse(
          "TASK_NOT_FOUND",
          httpsStatusCodes.NOT_FOUND,
          httpResponses.NOT_FOUND
        )
      );
    }

    await Task.update(
      { title, description },
      { where: { uuid: uuid, user_id: user.user_id } }
    );

    const updatedTask = await Task.findOne({
      where: { uuid: uuid },
      attributes: { exclude: ["id", "user_id"] },
    });

    const response = {
      task: updatedTask,
    };

    return res.json(
      successResponse(
        response,
        "TASK_UPDATED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOMETHING_WENT_WRONG_WHILE_UPDATING_TASK",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const { user } = req;
    const { uuid } = req.body;
    const task = await Task.findOne({
      where: { uuid: uuid, user_id: user.user_id },
    });
    if (!task) {
      return res.json(
        errorResponse(
          "TASK_NOT_FOUND",
          httpsStatusCodes.NOT_FOUND,
          httpResponses.NOT_FOUND
        )
      );
    }
    await Task.destroy({ where: { uuid: uuid, user_id: user.user_id } });
    return res.json(
      successResponse(
        "TASK_DELETED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    return res.json(
      errorResponse(
        "SOMETHING_WENT_WRONG_WHILE_DELETING_TASK",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

//  Update task status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { user } = req;
    const { uuid, status } = req.body;
    const task = await Task.findOne({
      where: { uuid: uuid, user_id: user.user_id },
    });
    if (!task) {
      return res.json(
        errorResponse(
          "TASK_NOT_FOUND",
          httpsStatusCodes.NOT_FOUND,
          httpResponses.NOT_FOUND
        )
      );
    }

    await Task.update(
      { status },
      { where: { uuid: uuid, user_id: user.user_id } }
    );

    const updatedTask = await Task.findOne({
      where: { uuid: uuid },
      attributes: { exclude: ["id", "user_id"] },
    });

    const response = {
      task: updatedTask,
    };

    return res.json(
      successResponse(
        response,
        "TASK_STATUS_UPDATED_SUCCESSFULLY",
        httpsStatusCodes.SUCCESS,
        httpResponses.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOMETHING_WENT_WRONG_WHILE_UPDATING_TASK_STATUS",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

module.exports = {
  taskCreate,
  fetchAllTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
};