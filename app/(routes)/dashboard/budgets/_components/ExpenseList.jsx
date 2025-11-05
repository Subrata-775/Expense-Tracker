"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { addExpense } from "@/app/action/addExpense";
import ExpenseAdd from "../../expenses/_components/ExpenseAdd";

function ExpenseList({ budgetId, user }) {
    const [expenses, setExpenses] = useState([]);

    // ✅ Fetch expenses on mount
    const fetchExpenses = async () => {
        try {
            const result = await db
                .select()
                .from(Expenses)
                .where(Expenses.budgetId.eq(budgetId));

            setExpenses(result);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // ✅ Called automatically from AddExpense after adding a new expense
    const handleExpenseAdded = async () => {
        await fetchExpenses(); // reloads just the data, no page refresh
    };

    return (
        <div>
            <ExpenseAdd
                budgetId={budgetId}
                user={user}
                onExpenseAdded={handleExpenseAdded}
            />

            <h2 className="font-bold text-lg mt-5">My Expenses</h2>
            {expenses.length === 0 ? (
                <p className="text-gray-500 mt-2">No expenses yet.</p>
            ) : (
                <ul className="mt-3 space-y-2">
                    {expenses.map((expense) => (
                        <li
                            key={expense.id}
                            className="flex justify-between border p-2 rounded"
                        >
                            <span>{expense.name}</span>
                            <span className="font-medium text-primary">
                                ₹{expense.amount}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList;
