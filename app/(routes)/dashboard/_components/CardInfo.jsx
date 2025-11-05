"use client";
import React, { useState, useEffect } from "react";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";

function CardInfo({ budgetList }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        if (budgetList && budgetList.length > 0) {
            let totalBudget_ = 0;
            let totalSpend_ = 0;

            budgetList.forEach((element) => {
                totalBudget_ += Number(element.amount) || 0;
                totalSpend_ += Number(element.totalSpend) || 0; // ✅ calculate total spend
            });

            setTotalBudget(totalBudget_);
            setTotalSpend(totalSpend_);
        }
    }, [budgetList]);

    return (
        <div>

            {budgetList ?. length>0?
              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 🟦 Total Budget */}
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-sm text-gray-600">Total Budget</h2>
                        <h2 className="font-bold text-2xl text-blue-800">
                            ${totalBudget.toLocaleString()}
                        </h2>
                    </div>
                    <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>

                {/* 🟨 Total Spend */}
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-sm text-gray-600">Total Spend</h2>
                        <h2 className="font-bold text-2xl text-blue-800">
                            ${totalSpend.toLocaleString()}
                        </h2>
                    </div>
                    <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>

                {/* 🟩 Number of Budgets */}
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-sm text-gray-600">No. of Budgets</h2>
                        <h2 className="font-bold text-2xl text-blue-800">
                            {budgetList?.length || 0}
                        </h2>
                    </div>
                    <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>
              </div>
                :
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((item, index) => (
                       <div className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg">

                       </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default CardInfo;
