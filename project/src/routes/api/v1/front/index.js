const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/user", require("./user.route"));
router.use("/task", require("./task.route"));

module.exports = router;
