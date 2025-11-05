"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
} from "lucide-react";

function SideNav() {
    const menuList = [
        { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
        { id: 3, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
        { id: 4, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
    ];

    const path = usePathname();

    return (
        <div className="h-screen p-5 border-r bg-white shadow-md flex flex-col">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-10">
                <Image src="/logo.svg" alt="logo" width={70} height={60} />
                <h1 className="text-xl font-extrabold text-indigo-600">
                    Finance Tracker
                </h1>
            </div>

            {/* Menu List */}
            <div className="flex flex-col gap-2">
                {menuList.map((menu) => {
                    // Highlight logic
                    const isActive =
                        path === menu.path || path.startsWith(menu.path + "/");

                    // Dashboard should only be active on exact match
                    const active =
                        menu.path === "/dashboard"
                            ? path === "/dashboard"
                            : isActive;

                    return (
                        <Link href={menu.path} key={menu.id}>
                            <div
                                className={`flex items-center gap-3 p-4 rounded-lg font-medium cursor-pointer transition-all duration-300 ${active
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                                    }`}
                            >
                                <menu.icon
                                    size={20}
                                    className={`${active ? "text-white" : "text-gray-500"}`}
                                />
                                <span>{menu.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {/* profile */}

            <div className="fixed bottom-10 p-5 gap-2 flex items-center">
                <UserButton />
                Profile
            </div>
        </div>
    );
}

export default SideNav;
