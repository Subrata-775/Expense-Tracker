"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SideNav from "./_components/sideNav_temp";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";

function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();
    const [budgetList, setBudgetList] = useState([]);

    // ✅ Fetch budgets (wrapped in useCallback to use in interval)
    const fetchBudgets = useCallback(async () => {
        try {
            if (!user) return;

            const result = await db
                .select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

            setBudgetList(result);

            // Redirect if user has no budgets
            if (result?.length === 0) {
                router.replace("/dashboard/budgets");
            }
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    }, [user, router]);

    // ✅ Fetch once when user is ready
    useEffect(() => {
        if (user) fetchBudgets();
    }, [user, fetchBudgets]);

    // ✅ Auto refresh budgets every 3 seconds (no manual refresh needed)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchBudgets();
        }, 3000); // every 3 seconds
        return () => clearInterval(interval);
    }, [fetchBudgets]);

    return (
        <div className="flex">
            {/* 🧭 Sidebar */}
            <div className="fixed md:w-64 hidden md:block h-screen">
                <SideNav />
            </div>

            {/* 🧱 Main Content */}
            <div className="flex-1 md:ml-64">
                {/* ✅ Single live-updating Header */}
                <DashboardHeader budgetList={budgetList} />

                {/* ✅ Page Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}

export default DashboardLayout;
