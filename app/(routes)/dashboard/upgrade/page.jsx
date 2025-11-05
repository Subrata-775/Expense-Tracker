"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Crown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
    const router = useRouter();

    const handleUpgrade = () => {
        // Redirect to your payment page
        router.push("/dashboard/Payment");
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Back Button */}
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


            {/* Header */}
            <div className="text-center mb-10">
                <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h1 className="text-4xl font-bold text-gray-800">
                    Upgrade to <span className="text-blue-600">Pro</span>
                </h1>
                <p className="text-gray-500 mt-2">
                    Unlock premium features to supercharge your budgeting experience.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h2>
                    <p className="text-gray-500 mb-4">Perfect for personal use.</p>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                            Create up to 50 Budgets
                        </li>
                        <li className="flex items-center text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                            Add unlimited expenses
                        </li>
                        <li className="flex items-center text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                            Basic charts and insights
                        </li>
                    </ul>
                    <div className="text-3xl font-bold mb-4">₹0/month</div>
                    <button
                        disabled
                        className="w-full bg-gray-200 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                    >
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl shadow-md p-6 relative overflow-hidden">
                    <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        Popular
                    </span>

                    <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
                    <p className="text-blue-100 mb-4">
                        For advanced users and professionals.
                    </p>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-white mr-2" />
                            Unlimited Budgets
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-white mr-2" />
                            AI-based spending insights
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-white mr-2" />
                            Export reports (PDF/CSV)
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-white mr-2" />
                            Priority Support
                        </li>
                    </ul>
                    <div className="text-3xl font-bold mb-4">₹299/month</div>

                    {/* 💥 Upgrade Button with Redirect */}
                    <button
                        onClick={handleUpgrade}
                        className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );
}
