import Link from "next/link";

function BudgetItem({ budget }) {
    const totalSpend = budget.totalSpend || 0;
    const totalBudget = Number(budget.amount) || 0;
    const remaining = totalBudget - totalSpend;
    const percentSpent = Math.min((totalSpend / totalBudget) * 100, 100);

    return (
        <Link href={`/dashboard/expenses/${budget.id}`}>
            <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            {budget.icon} {budget.name}
                        </h2>
                        <p className="text-gray-500 text-sm">{budget.totalItem} Item</p>
                    </div>
                    <h2 className="font-bold text-primary text-lg">${totalBudget}</h2>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${totalSpend > totalBudget ? "bg-red-500" : "bg-blue-600"
                            }`}
                        style={{ width: `${percentSpent}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <p>${totalSpend} Spend</p>
                    <p
                        className={`${remaining < 0 ? "text-red-500" : "text-blue-600"
                            } font-semibold`}
                    >
                        {remaining < 0
                            ? `-$${Math.abs(remaining)} Over`
                            : `$${remaining} Remaining`}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default BudgetItem;
