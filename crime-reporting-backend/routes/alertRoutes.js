const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");
const authMiddleware = require("../middleware/authMiddleware");

// Authenticated access routes
router.get("/", authMiddleware.verifyToken, alertController.getAlerts);
router.post("/", authMiddleware.verifyToken, alertController.createAlert);
router.patch("/:id/read", authMiddleware.verifyToken, alertController.markAsRead);

module.exports = router;
