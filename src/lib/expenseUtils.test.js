const { calculateTotal } = require('./expenseUtils');

test('calculateTotal sums amounts correctly', () => {
  const data = [
    { amount: 10 },
    { amount: 20.5 },
    { amount: -5 },
  ];
  expect(calculateTotal(data)).toBeCloseTo(25.5);
});
