const express = require("express");
const { signUp } = require("../../../../controllers/user.controller");
const { validateInput } = require("../../../../utils/validate.util");
const { signUpSchema } = require("../../../../validations/auth.validation");
const router = express.Router();

router.post("/sign-up", validateInput(signUpSchema), signUp);

module.exports = router;
