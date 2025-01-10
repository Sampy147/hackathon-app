const express = require("express");
const {
  performTransfer,
  getTransactionHistory,
} = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/transfer", authMiddleware, performTransfer);
router.get("/history", authMiddleware, getTransactionHistory);

module.exports = router;
