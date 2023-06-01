'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.params;
  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expensesId } = req.params;

  // if (isNaN(Number(expensesId))) {
  //   res.sendStatus(400);

  //   return;
  // }

  const foundExpense = expensesService.getExpenseById(Number(expensesId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const bodyProps = [userId, spentAt, title, amount, category, note];
  const isRequireValid = bodyProps.every(prop => prop);

  const foundUser = usersService.getUserById(userId);

  if (!isRequireValid || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(req.body);

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getExpenseById(Number(expensesId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expensesService.removeExpense(Number(expensesId));
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getExpenseById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;
  const bodyProps = [spentAt, title, amount, category, note];
  const isRequireValid = bodyProps.every(prop => prop);

  if (!isRequireValid) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.updateExpense(expensesId, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
};