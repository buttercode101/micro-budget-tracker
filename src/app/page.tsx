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

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
