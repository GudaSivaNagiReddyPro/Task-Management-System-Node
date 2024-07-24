const joi = require("joi");
const {
  userConstants: { Gender },
} = require("../constants");
const updateProfileSchema = joi.object({
  first_name: joi.string().min(2).max(30).required().messages({
    "string.base": "FIRST_NAME SHOULD BE A TYPE OF TEXT",
    "string.empty": "FIRST_NAME CANNOT BE AN EMPTY FIELD",
    "string.min": "FIRST_NAME SHOULD HAVE A MINIMUM LENGTH OF {#LIMIT}",
    "string.max": "FIRST_NAME SHOULD HAVE A MAXIMUM LENGTH OF {#LIMIT}",
    "any.required": "FIRST_NAME IS A REQUIRED FIELD",
  }),
  last_name: joi.string().min(2).max(30).required().messages({
    "string.base": "LAST_NAME SHOULD BE A TYPE OF TEXT",
    "string.empty": "LAST_NAME CANNOT BE AN EMPTY FIELD",
    "string.min": "LAST_NAME SHOULD HAVE A MINIMUM LENGTH OF {#LIMIT}",
    "string.max": "LAST_NAME SHOULD HAVE A MAXIMUM LENGTH OF {#LIMIT}",
    "any.required": "LAST_NAME IS A REQUIRED FIELD",
  }),
  gender: joi
    .string()
    .valid(Gender.MALE, Gender.FEMALE, Gender.OTHERS)
    .required(),
  phone_number: joi
    .string()
    .pattern(/^\d+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "PHONE_NUMBER SHOULD CONTAIN ONLY DIGITS",
      "string.min": "PHONE_NUMBER SHOULD HAVE A MINIMUM LENGTH OF {#LIMIT}",
      "string.max": "PHONE_NUMBER SHOULD HAVE A MAXIMUM LENGTH OF {#LIMIT}",
      "any.required": "PHONE_NUMBER IS A REQUIRED FIELD",
    }),
});
module.exports = { updateProfileSchema };
