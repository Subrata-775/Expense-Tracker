"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpensesPage() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  // 🎯 Fetch all expenses
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result || []);
  };

  useEffect(() => {
    if (user) getAllExpenses();
  }, [user]);

  // 🎨 Pie Chart Colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#845EC2",
    "#D65DB1",
  ];

  // 📊 Prepare data for Pie Chart
  const pieData = expensesList.map((exp) => ({
    name: exp.name,
    value: Number(exp.amount),
  }));

  return (
    <div className="p-6 w-full">
      {/* 🔙 Back to Dashboard */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <Link
          href="/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Button className="font-medium rounded-lg px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <h2 className="font-bold text-3xl mb-2">My Expenses</h2>
      <p className="text-gray-500 mb-6">Latest Expenses Overview</p>

      {/* ✅ Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 📊 Pie Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-center">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 text-center">
            Expense Distribution
          </h3>

          {pieData.length > 0 ? (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center mt-5">
              No expense data available yet.
            </p>
          )}
        </div>

        {/* 🧾 Expense Table Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
          {/* <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Latest Expenses
          </h3> */}
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getAllExpenses}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
