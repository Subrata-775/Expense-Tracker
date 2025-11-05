"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem"; // ✅ You forgot to import this
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
function BudgetList() {
    const [budgetList, setBudgetList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getBudgetList();
        }
    }, [user]); // ✅ Add user as dependency so it re-runs when user loads

    // ✅ Fetch Budget List
    const getBudgetList = async () => {
        try {
            const result = await db
                .select({
                    ...getTableColumns(Budgets),
                    totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
                    totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number),
                })
                .from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
                .groupBy(Budgets.id)
                .orderBy(desc((Budgets.id)));

            // console.log(result);
            setBudgetList(result);
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    };

    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <CreateBudget
                    refreshData={() => getBudgetList()} />
                {budgetList?.length>0?budgetList.map((budget, index) => (
                    <BudgetItem key={index} budget={budget} />
                ))
                :[1,2,3,4,5].map((item,index)=>(
                   <div key={index} className='w-full bg-slate-200
                   rounded-lg h-[150px] animate-pulse'>

                   </div>
                ))
            }
            </div>
        </div>
    );
}

export default BudgetList;
