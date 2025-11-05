import React from "react";
import BudgetList from "./_components/BudgetList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function BudgetsPage() {
    return (
        <div className="p-10">
            {/* 🔙 Back to Dashboard */}
            <div className="flex justify-end items-center gap-3 mb-4">
                <Link
                    href="/dashboard"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <Button className="font-medium rounded-lg px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-800"> My Budgets</h1>
            <BudgetList/>
        </div>
    );
}
