"use client";

import React, { useEffect, useState } from "react";
import { use } from "react"; // ✅ required to unwrap params Promise in Next.js 16
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, sql, and, desc } from "drizzle-orm";
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
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const budgetId = Number(id);

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const route = useRouter();

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

    const getExpensesList = async () => {
        const result = await db
            .select()
            .from(Expenses)
            .where(eq(Expenses.budgetId, budgetId))
            .orderBy(desc(Expenses.id));
        setExpenses(result);
    };

    const deleteBudget = async (id) => {
        try {
            await db.delete(Expenses).where(eq(Expenses.budgetId, id));
            await db.delete(Budgets).where(eq(Budgets.id, id)).returning();
            toast("✅ Budget Deleted!!");
            route.replace("/dashboard/budgets");
            route.refresh();
        } catch (error) {
            console.error("❌ Error deleting budget:", error);
            throw error;
        }
    };

    const handleExpenseAdded = async () => {
        await getExpensesList();
        await getBudgetInfo();
    };

    const refreshData = async () => {
        await getBudgetInfo();
    };

    useEffect(() => {
        if (user && budgetId) {
            getBudgetInfo();
            getExpensesList();
        }
    }, [user, budgetId]);

    return (
        <div className="p-4 sm:p-10 w-full">
            {/* 🔙 Back to Dashboard */}
            <div className="flex justify-end mb-4">
                <Link href="/dashboard/budgets" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto font-medium rounded-lg px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                        Back to Budgets
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
                My Expenses
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <EditBudget budgetInfo={budgetInfo} refreshData={refreshData} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex gap-2 w-full sm:w-auto" variant="destructive">
                                <Trash />Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your Current Budget along with expenses
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

            {/* Budget Info + Add Expense */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
                )}
                <ExpenseAdd budgetId={budgetId} user={user} refreshData={refreshData} />
            </div>

            {/* Latest Expenses */}
            <div className="mt-10 w-full overflow-x-auto">
                <div className="w-full bg-white rounded-lg shadow-sm border min-w-[320px]">
                    <ExpenseListTable
                        expensesList={expenses}
                        budgetId={budgetId}
                        user={user}
                        refreshData={() => getBudgetInfo()}
                        onExpenseAdded={handleExpenseAdded}
                    />
                </div>
            </div>
        </div>
    );
}
