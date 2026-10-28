import { calculateTotal } from "@/lib/expenseUtils.js";

import { useState, useEffect } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO string
}

function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
}

function saveExpenses(expenses: Expense[]) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const newExp: Expense = {
      id: crypto.randomUUID(),
      description: desc.trim(),
      amount: parseFloat(amt),
      date,
    };
    setExpenses([newExp, ...expenses]);
    setDesc("");
    setAmt("");
    setDate(new Date().toISOString().split("T")[0]);
  }

  const total = calculateTotal(expenses);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex flex-col w-full max-w-2xl bg-white dark:bg-black p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Micro Budget Tracker</h1>
        <form onSubmit={addExpense} className="grid grid-cols-1 gap-2 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="border rounded p-2"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            required
            className="border rounded p-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border rounded p-2"
          />
          <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            Add Expense
          </button>
        </form>
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
          {expenses.length === 0 && <p className="text-gray-500">No expenses recorded.</p>}
          <ul className="divide-y">
            {expenses.slice(0, 10).map((ex) => (
              <li key={ex.id} className="flex justify-between py-1">
                <span>{ex.date} – {ex.description}</span>
                <span className="font-mono">${ex.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>
      </main>
    </div>
  );
}
