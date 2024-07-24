const errors = {
  /*
      |--------------------------------------------------------------------------
      | GENERAL ERROR
      |--------------------------------------------------------------------------
        */
  // User
  USER_ALREADY_EXISTS: "User already exists",
  SOME_THING_WENT_WRONG_WHILE_CREATING_SIGN_UP:
    "Something went wrong while creating sign up",
  INVALID_USER_DETAILS: "Invalid user details",
  EMAIL_IS_NOT_VERIFIED: "Email is not verified",
  SOME_THING_WENT_WRONG_WHILE_LOGIN: "Some thing went wrong while login",
  USER_DOES_NOT_EXIST: "User does not exist",
  SOME_ERR_OCCUR_WHILE_FORGOT_PASSWORD:
    "Some thing went wrong while forgot password",
  PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_BE_MATCH:
    "Password and confirm password should be same",
  INVALID_RESET_TOKEN: "Invalid reset token",
  USER_NOT_FOUND: "User not found",
  SOME_THING_WENT_WRONG_WHILE_RESET_PASSWORD:
    "Some thing went wrong while reset password",
  REFRESH_TOKEN_NOT_FOUND: "Refresh token not found",
  INVALID_REFRESH_TOKEN: "Invalid refresh token",
  SOME_ERR_OCCUR_WHILE_REFRESH_TOKEN:
    "Some thing went wrong while refreshing token",
  // Email verification
  INVALID_VERIFY_TOKEN: "Invalid verify token",
  EMAIL_ALREADY_VERIFIED: "Email already verified",
  SOME_ERR_OCCUR_WHILE_VERIFY_EMAIL:
    "Some thing went wrong while verifying email",
};

module.exports = { errors };
