const express = require("express");
const {
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  generateRefreshToken,
} = require("../../../../controllers/auth.controller");
const { validateInput } = require("../../../../utils/validate.util");

const {
  loginSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  generateRefreshTokenSchema,
} = require("../../../../validations/auth.validation");
const {
  isAuthentication,
} = require("../../../../middlewares/authentication-middleware");
const router = express.Router();
router.post("/log-in", validateInput(loginSchema), login);
router.post(
  "/forgot-password",
  validateInput(forgetPasswordSchema),
  forgotPassword
);
router.post(
  "/reset-password",
  validateInput(resetPasswordSchema),
  resetPassword
);
router.post(
  "/refresh-token",
  validateInput(generateRefreshTokenSchema),
  generateRefreshToken
);
router.post("/email-verify", validateInput(verifyEmailSchema), verifyEmail);
module.exports = router;
