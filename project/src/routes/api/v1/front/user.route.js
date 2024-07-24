const express = require("express");
const {
  signUp,
  getProfile,
  updateProfile,
} = require("../../../../controllers/user.controller");
const { validateInput } = require("../../../../utils/validate.util");
const { signUpSchema } = require("../../../../validations/auth.validation");
const {
  isAuthentication,
} = require("../../../../middlewares/authentication-middleware");
const {
  updateProfileSchema,
} = require("../../../../validations/user.validation");
const router = express.Router();

router.post("/sign-up", validateInput(signUpSchema), signUp);

router.get("/get-profile", isAuthentication, getProfile);
router.put(
  "/update-profile",
  isAuthentication,
  validateInput(updateProfileSchema),
  updateProfile
);

module.exports = router;
