"use strict";
const joi = require("joi");
const globalConfig = require("../configs/global.config");
const {
  globalConstant: { TaskStatus },
} = require("../constants/global.constant");

const taskSchema = joi.object({
  title: joi.string().required().messages({
    "string.base": "TITLE_SHOULD_BE_A_TYPE_OF_TEXT",
    "string.empty": "TITLE_CANNOT_BE_EMPTY",
    "any.required": "TITLE_IS_REQUIRED",
  }),
  description: joi.string().required().messages({
    "string.base": "DESCRIPTION_SHOULD_BE_A_TYPE_OF_TEXT",
    "string.empty": "DESCRIPTION_CANNOT_BE_EMPTY",
    "any.required": "DESCRIPTION_IS_REQUIRED",
  }),
});

const updateTaskSchema = joi.object({
  uuid: joi.string().guid().messages({
    "string.base": "UUID_REQUIRED",
    "string.empty": "UUID_REQUIRED",
    "any.required": "UUID_REQUIRED",
  }),
  title: joi.string().required().messages({
    "string.base": "TITLE_SHOULD_BE_A_TYPE_OF_TEXT",
    "string.empty": "TITLE_CANNOT_BE_EMPTY",
    "any.required": "TITLE_IS_REQUIRED",
  }),
  description: joi.string().required().messages({
    "string.base": "DESCRIPTION_SHOULD_BE_A_TYPE_OF_TEXT",
    "string.empty": "DESCRIPTION_CANNOT_BE_EMPTY",
    "any.required": "DESCRIPTION_IS_REQUIRED",
  }),
});

const updateTaskStatusSchema = joi.object({
  uuid: joi.string().guid().messages({
    "string.base": "UUID_REQUIRED",
    "string.empty": "UUID_REQUIRED",
    "any.required": "UUID_REQUIRED",
  }),
  status: joi
    .string()
    .valid(TaskStatus.PENDING, TaskStatus.CANCELLED, TaskStatus.COMPLETED)
    .required(),
});
const deleteTaskSchema = joi.object({
  uuid: joi.string().guid().messages({
    "string.base": "UUID_REQUIRED",
    "string.empty": "UUID_REQUIRED",
    "any.required": "UUID_REQUIRED",
  }),
});
module.exports = {
  taskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  updateTaskStatusSchema,
};
