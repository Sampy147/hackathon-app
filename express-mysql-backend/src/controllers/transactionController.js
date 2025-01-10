const User = require("../models/user");
const Transaction = require("../models/transaction");
const { Op } = require("sequelize");

const performTransfer = async (req, res) => {
  const { receiverId, amount } = req.body;
  const senderId = req.user.userId;

  const sender = await User.findByPk(senderId);
  const receiver = await User.findByPk(receiverId);

  if (!sender || !receiver) {
    return res.status(400).json({ message: "Sender or Receiver not found" });
  }

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  // Update balances
  sender.balance -= amount;
  receiver.balance += amount;
  await sender.save();
  await receiver.save();

  // Create a transaction record
  await Transaction.create({
    senderId,
    receiverId,
    amount,
    transactionType: "Transfer",
  });

  return res.status(200).json({ message: "Transfer successful" });
};

const getTransactionHistory = async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.findAll({
    where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
  });

  return res.status(200).json(transactions);
};

module.exports = { performTransfer, getTransactionHistory };
