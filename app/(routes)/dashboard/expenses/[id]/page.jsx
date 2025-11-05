"use client";

import React, { useEffect, useState } from "react";
import { use } from "react"; // ✅ required to unwrap params Promise in Next.js 16
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, sql, and } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import ExpenseAdd from "../_components/ExpenseAdd";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";


export default function ExpensesPage({ params }) {
    // ✅ unwrap the params Promise
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const budgetId = Number(id);

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const route = useRouter();
    // ✅ Fetch budget info
    const getBudgetInfo = async () => {
        if (!user) return;

        const result = await db
            .select({
                ...Budgets,
                totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
                totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(
                and(
                    eq(Budgets.id, budgetId),
                    eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)
                )
            )
            .groupBy(Budgets.id);
        getExpensesList();

        setBudgetInfo(result[0]);
    };

    // ✅ Fetch expense list
    const getExpensesList = async () => {
        const result = await db
            .select()
            .from(Expenses)
            .where(eq(Expenses.budgetId, budgetId))
            .orderBy(desc(Expenses.id))
        setExpenses(result);
    };
    // Delete Budget
    const deleteBudget = async (id) => {
        try {
            // 1️⃣ Delete all expenses linked to this budget
            await db
                .delete(Expenses)
                .where(eq(Expenses.budgetId, id));

            // 2️⃣ Delete the budget itself
            const result = await db
                .delete(Budgets)
                .where(eq(Budgets.id, id))
                .returning();

            toast(' ✅ Budget Deleted!!');
            route.replace('/dashboard/budgets');
            // ♻️ Refresh UI
            route.refresh();


        } catch (error) {
            console.error("❌ Error deleting budget:", error);
            throw error;
        }
    };
    // ✅ When new expense added
    const handleExpenseAdded = async () => {
        await getExpensesList();
        await getBudgetInfo();
    };

    const refreshData = async () => {
        // await getExpensesList();
        await getBudgetInfo();
    };

    useEffect(() => {
        if (user && budgetId) {
            getBudgetInfo();
            getExpensesList();
        }
    }, [user, budgetId]);

    return (
        <div className="p-10 w-full">
            {/* 🔙 Back to Dashboard */}
            <div className="flex justify-end items-center gap-3 mb-4">
                <Link
                    href="/dashboard/budgets"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <Button className="font-medium rounded-lg px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                        Back to Budgets
                    </Button>
                </Link>
            </div>
            <h2 className="text-2xl font-bold text-gray-800  flex justify-between  items-center mt-5"> My Expenses
                <div className="flex gap-2 items-center">
                    <EditBudget budgetInfo={budgetInfo} refreshData={refreshData} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex gap-2" variant="destructive"><Trash />Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your Current Budget along  with expenses
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget(budgetId)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>




            </h2>



            {/* ✅ Budget Info + Add Expense */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
                )}
                <ExpenseAdd
                    budgetId={budgetId}
                    user={user}
                    refreshData={refreshData}
                />

            </div>

            {/* ✅ Latest Expenses */}
            <div className="mt-10 w-full">
                <div className="w-full bg-white rounded-lg shadow-sm border">
                    <ExpenseListTable
                        expensesList={expenses}
                        budgetId={budgetId}
                        user={user}
                        refreshData={() => getBudgetInfo()}
                        onExpenseAdded={handleExpenseAdded}
                    />
                </div>
            </div>
        </div >
    );
}
