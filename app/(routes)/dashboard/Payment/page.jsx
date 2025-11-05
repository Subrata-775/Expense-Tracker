"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        // simulate fake payment delay
        setTimeout(() => {
            setLoading(false);
            alert("✅ Payment successful! You are now a PRO user.");
            router.push("/dashboard");
        }, 2000);
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* 🔙 Back to Upgrade */}
            <div className="flex items-center gap-3 mb-6">
                <Link
                    href="/dashboard/upgrade"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    <span className="font-medium">Back to Upgrade</span>
                </Link>
            </div>

            {/* 💳 Payment UI */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                    <CreditCard className="w-12 h-12 text-blue-600 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
                    <p className="text-gray-500 text-sm">
                        Complete your upgrade to{" "}
                        <span className="text-blue-600 font-semibold">Pro Plan</span>.
                    </p>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Subrata Jana"
                            required
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength={19}
                            required
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Expiry (MM/YY)
                            </label>
                            <input
                                type="text"
                                placeholder="11/28"
                                required
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                CVV
                            </label>
                            <input
                                type="password"
                                placeholder="***"
                                maxLength={3}
                                required
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Processing..." : "Pay ₹299 Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}
