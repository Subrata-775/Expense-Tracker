"use server";

import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";

export async function addExpense({ name, amount, budgetId, createdBy }) {
    try {
        await db.insert(Expenses).values({
            name,
            amount: Number(amount),
            budgetId,
            createdBy,
        });
        return { success: true };
    } catch (err) {
        console.error("Error adding expense:", err);
        return { success: false, message: err.message };
    }
}
