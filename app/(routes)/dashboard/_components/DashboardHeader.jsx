"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

function DashboardHeader({ budgetList = [] }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        if (budgetList && budgetList.length > 0) {
            let totalBudget_ = 0;
            // let totalSpend_ = 0;

            budgetList.forEach((element) => {
                totalBudget_ += Number(element.amount) || 0;
                // totalSpend_ += Number(element.totalSpend) || 0; // ✅ Count total spend from all budgets
            });

            setTotalBudget(totalBudget_);
            // setTotalSpend(totalSpend_);
        } else {
            setTotalBudget(0);
            // setTotalSpend(0);
        }
    }, [budgetList]); // ✅ Auto-updates when budgetList changes

    return (
        <div className="p-4 px-6 border-b shadow-sm flex justify-between items-center bg-white sticky top-0 z-50">
            {/* ✅ Left Side: Logo + Title */}
            <div className="flex items-center gap-6 sm:gap-8">
                <Image
                    src="/logo.svg"
                    alt="Expense Tracker"
                    width={80}
                    height={60}
                />
                <div className="flex flex-col">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-700">
                        Expense Tracker
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Track your spendings smartly 💸
                    </p>
                </div>
            </div>

            {/* ✅ Center Section: Live Totals */}
            {budgetList.length > 0 ? (
                <div className="hidden md:flex items-center gap-10 text-sm text-gray-700">
                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-blue-700 text-lg">
                            ₹{totalBudget.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">Total Budget</span>
                    </div>

                    {/* <div className="flex flex-col items-center">
                        <span className="font-semibold text-rose-600 text-lg">
                            ₹{totalSpend.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">Total Spent</span>
                    </div> */}

                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-yellow-600 text-lg">
                            {budgetList.length}
                        </span>
                        <span className="text-xs text-gray-500">Active Budgets</span>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex items-center gap-10 text-sm text-gray-500 animate-pulse">
                    <div className="flex flex-col items-center">
                        <span className="bg-slate-200 h-4 w-16 rounded"></span>
                        <span className="text-xs mt-1">Loading...</span>
                    </div>
                    {/* <div className="flex flex-col items-center">
                        <span className="bg-slate-200 h-4 w-16 rounded"></span>
                        <span className="text-xs mt-1">Loading...</span>
                    </div> */}
                    <div className="flex flex-col items-center">
                        <span className="bg-slate-200 h-4 w-16 rounded"></span>
                        <span className="text-xs mt-1">Loading...</span>
                    </div>
                </div>
            )}

            {/* ✅ Right Side: Profile */}
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg shadow-inner hover:bg-gray-100 transition-all">
                <UserButton />
                <span className="text-sm font-medium text-gray-700">Profile</span>
            </div>
        </div>
    );
}

export default DashboardHeader;
