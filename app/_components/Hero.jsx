"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Hero() {
    const { user } = useUser();
    const router = useRouter();

    const handleGetStarted = () => {
        if (user) {
            // ✅ Already signed in → Go directly to dashboard
            router.push("/dashboard");
        } else {
            // ✅ Not signed in → Go to sign-in page and redirect after login
            router.push("/sign-in?redirect_url=/dashboard");
        }
    };

    return (
        <section className="bg-white py-20 sm:py-24 lg:py-28 flex items-center flex-col">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Take control of your finances and
                        <strong className="text-indigo-600"> manage </strong>
                        your money smarter
                    </h1>
                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Track your income, monitor expenses, and gain insights into your
                        spending habits. Simplify money management and achieve your
                        financial goals.
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={handleGetStarted}
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            <Image
                src={"/p.png"}
                alt="dashboard"
                width={900}
                height={700}
                className="mt-6 rounded-xl border-2"
            />
        </section>
    );
}

export default Hero;
