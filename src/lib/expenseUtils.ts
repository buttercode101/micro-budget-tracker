export function calculateTotal(expenses: {amount: number}[]) {
  return expenses.reduce((sum, ex) => sum + ex.amount, 0);
}
