"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Loader2 } from "lucide-react";

function ExpenseAdd({ budgetId, user, refreshData }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setloading] = useState(false);
    //  use to add new expenses
    const addNewExpense = async () => {
        setloading(true)
        if (!name || !amount) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const result = await db
                .insert(Expenses)
                .values({
                    name,
                    amount: Number(amount),
                    budgetId,
                    createdAt: new Date().toISOString(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                })
                .returning({ insertedId: Expenses.id });

            setAmount('')
            setName('')


            if (result) {
                setloading(false)
                toast.success("Expense added successfully!");
                setName("");
                setAmount("");
                if (refreshData) await refreshData();
            }
            setloading(false)
        } catch (error) {
            console.error(error);
            toast.error("Failed to add expense ❌");
        }
    };

    return (
        <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Bedroom Decor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    placeholder="e.g. 100"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <Button
                disabled={!name || !amount || loading}
                onClick={addNewExpense}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Adding...</span>
                    </div>
                ) : (
                    "Add New Expense"
                )}
            </Button>
        </div>
    );
}

export default ExpenseAdd;
