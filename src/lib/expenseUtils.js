function calculateTotal(expenses) {
  return expenses.reduce((sum, ex) => sum + ex.amount, 0);
}
module.exports = { calculateTotal };
