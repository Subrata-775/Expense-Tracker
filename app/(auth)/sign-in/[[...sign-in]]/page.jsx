// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//     return (
//         <section>
//             <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
//                     <div>
//                         <div className="max-w-prose md:max-w-none">
//                             <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                             </h2>
//                             <p className="mt-4 text-gray-700">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
//                                 doloremque saepe architecto maiores repudiandae amet perferendis
//                                 repellendus, reprehenderit voluptas sequi.
//                             </p>
//                         </div>
//                     </div>
//                     <div>
//                         <img
//                             src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                             className="rounded"
//                             alt=""
//                         />
//                     </div>
//                 </div>
//             </div>
//             <SignIn />
//         </section>

//     )
// }

import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div
            className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-white via-blue-100 via-pink-100 via-gray-100 to-green-100 p-4"
        >
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/40">
                {/* Left Side - Image Section */}
                <div
                    className="md:w-1/2 w-full h-[300px] md:h-auto bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1716279083176-60af7a63cb03?auto=format&fit=crop&w=1000&q=80')",
                    }}
                ></div>

                {/* Right Side - Sign In Section */}
                <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 bg-white/80">
                    <div className="max-w-sm w-full">
                        <h2 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                            Welcome Back 👋
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-8">
                            Sign in to your{" "}
                            <span className="text-blue-600 font-semibold">Finance Tracker</span>
                        </p>

                        <div className="flex justify-center">
                            <SignIn
                                path="/sign-in"
                                routing="path"               // 👈 REQUIRED for navigation to work
                                signUpUrl="/sign-up"         // 👈 link to your sign-up page
                                afterSignInUrl="/dashboard"  // 👈 where to go after sign-in
                                appearance={{
                                    elements: {
                                        formButtonPrimary:
                                            "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg",
                                        card: "shadow-none border-none bg-transparent",
                                        formFieldInput:
                                            "rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300",
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        footerActionText: "text-gray-500",
                                    },
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
