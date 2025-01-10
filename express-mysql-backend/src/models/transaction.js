const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    receiverId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    transactionType: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true, // Enable Sequelize to handle `createdAt`
    updatedAt: false, // Disable the automatic `updatedAt`
    createdAt: true, // Enable Sequelize to create `createdAt`
  }
);

module.exports = Transaction;
