// "use client";
// import React, { useEffect, useState } from "react";
// import CardInfo from "./_components/CardInfo";
// import { useUser } from "@clerk/nextjs";
// import { eq, desc, sql } from "drizzle-orm";
// import { db } from "@/utils/dbConfig";
// import { Budgets, Expenses } from "@/utils/schema";
// import { getTableColumns } from "drizzle-orm";
// import BudgetItem from "./budgets/_components/BudgetItem";
// import ExpenseListTable from "./expenses/_components/ExpenseListTable";
// import BarChartDashboard from "./_components/BarChartDashboard";
// function Dashboard() {
//   const { user } = useUser();
//   const [budgetList, setBudgetList] = useState([]);
//   const [expensesList, setExpensesList] = useState([]);

//   // ✅ Fetch Budget List
//   const getBudgetList = async () => {
//     try {
//       const result = await db
//         .select({
//           ...getTableColumns(Budgets),
//           totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
//           totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number),
//         })
//         .from(Budgets)
//         .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//         .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .groupBy(Budgets.id)
//         .orderBy(desc(Budgets.id));

//       console.log("✅ Budget List:", result);
//       setBudgetList(result);
//       getAllExpenses();
//     } catch (error) {
//       console.error("❌ Error fetching budgets:", error);
//     }
//   };

//   // ✅ Call fetch after user loads
//   useEffect(() => {
//     if (user) {
//       getBudgetList();
//     }
//   }, [user]);

//   // used to get all Expenses  belong to user

//   const getAllExpenses = async () => {
//     const result = await db.select({

//       id: Expenses.id,
//       name: Expenses.name,
//       amount: Expenses.amount,
//       createdAt: Expenses.createdAt
//     }).from(Budgets)
//       .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//       .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(Expenses.id));
//     setExpensesList(result);

//   }

//   return (
//     <div className="p-8">
//       <h2 className="font-bold text-3xl">
//         Hii, {user?.fullName} ✌️
//       </h2>
//       <p className="text-gray-500">
//         Here's what's happening with your money, let's manage your expense.
//       </p>

//       {/* ✅ Render CardInfo only when data is ready */}
//       {budgetList && budgetList.length > 0 ? (
//         <CardInfo budgetList={budgetList} />
//       ) : (
//         <p className="text-gray-400 mt-4">Loading your budgets...</p>
//       )}
//       {/* Barchart */}

//       <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
//         <div className="md:col-span-2">
//           <BarChartDashboard budgetList={budgetList} />

//           <ExpenseListTable
//             expensesList={expensesList}
//             refreshData={getBudgetList}
//           />
//         </div>
//         <div className=" grid gap-5">
//           <h2 className="font-bold text-lg">Latest Budgets</h2>
//           {budgetList.map((budget, index) => (
//             <BudgetItem budget={budget} key={index} />
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


"use client";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { useUser } from "@clerk/nextjs";
import { eq, desc, sql } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { getTableColumns } from "drizzle-orm";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import BarChartDashboard from "./_components/BarChartDashboard";
import { Loader2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./_components/DashboardHeader";
function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true); // ⏳ new state

  // ✅ Fetch Budget List
  const getBudgetList = async () => {
    try {
      setLoading(true); // start loader
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
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      await getAllExpenses();
      setLoading(false); // ✅ stop loader
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  // ✅ Fetch all expenses
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
    setExpensesList(result);
  };

  return (
    <div className="p-8">
      {/* <DashboardHeader budgetList={budgetList} /> */}
      {/* 🔙 Back to Landing page*/}
      <div className="flex justify-end items-center gap-3 mb-4">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Button className="font-medium rounded-lg px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95">
            Back to Home Page
          </Button>
        </Link>
      </div>

      <h2 className="font-bold text-3xl">
        Hii, {user?.fullName} ✌️
      </h2>
      <p className="text-gray-500 mb-6">
        Here's what's happening with your money, let's manage your expense.
      </p>

      {/* ✅ Card Info Section */}
      {budgetList && budgetList.length > 0 ? (
        <CardInfo budgetList={budgetList} />
      ) : (
        <p className="text-gray-400 mt-4">Loading your budgets...</p>
      )}

      {/* ✅ Main Section with Chart + Tables */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          {/* 🎯 Loading shimmer while BarChart loads */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm animate-pulse">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
              <p className="text-gray-500 font-medium">
                Updating Bar Chart...
              </p>
            </div>
          ) : (
            <BarChartDashboard budgetList={budgetList} />
          )}

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getBudgetList}
          />
        </div>

        {/* ✅ Latest Budgets */}
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
