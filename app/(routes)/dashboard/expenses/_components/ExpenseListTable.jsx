"use client";
import React from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function ExpenseListTable({ expensesList, budgetId, user, onExpenseAdded, refreshData }) {
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();
        if (result) {
            toast(" ✅ Expense Deleted! Successful");
            refreshData();
        }
    }
    return (
        <div className="overflow-x-auto mt-2">
            <h2 className="font-bold text-lg mb-3 ">Latest Expenses</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border">Expense Name</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Created At</th>
                        <th className="px-4 py-2 border">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {expensesList && expensesList.length > 0 ? (
                        expensesList.map((expense, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{expense.name}</td>
                                <td className="px-4 py-2">${expense.amount}</td>
                                <td className="px-4 py-2">
                                    {new Date(expense.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <Trash className="text-red-600 pointer-cursor"
                                        onClick={() => deleteExpense(expense)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500">
                                No expenses added yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseListTable;
