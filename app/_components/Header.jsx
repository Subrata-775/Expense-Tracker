// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useUser, UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// function Header() {
//     const { user, isSignedIn } = useUser();
//     const router = useRouter();
//     const [clicked, setClicked] = useState(false);

//     const handleClick = () => {
//         setClicked(true);
//         setTimeout(() => setClicked(false), 500);
//     };

//     const handleDashboardClick = () => {
//         handleClick();

//         if (isSignedIn) {
//             router.push("/dashboard");
//         } else {
//             // Redirect to sign-in page with redirect URL
//             router.push("/sign-in?redirect_url=/dashboard");
//         }
//     };

//     return (
//         <header className="w-full p-4 px-6 flex justify-between items-center border-b shadow-sm bg-white">
//             {/* Left side: Logo + Title */}
//             <div className="flex items-center gap-3">
//                 <Image
//                     src="/logo.svg"
//                     alt="logo"
//                     width={45}
//                     height={45}
//                     className="rounded-full"
//                 />
//                 <h1 className="text-2xl font-extrabold tracking-tight">
//                     <span className="text-indigo-600">Expense</span>{" "}
//                     <span className="text-gray-900">Tracker</span>
//                 </h1>
//             </div>

//             {/* Right side */}
//             <div className="flex items-center gap-3">
//                 {isSignedIn ? (
//                     <div className="flex items-center gap-2">
//                         <span className="hidden sm:block text-sm font-medium text-gray-600">
//                             Hi, {user?.firstName || "User"}
//                         </span>
//                         <UserButton afterSignOutUrl="/" />
//                     </div>
//                 ) : (
//                     <div className="flex items-center gap-3">
//                         <Button
//                             onClick={handleDashboardClick}
//                             className={`font-medium rounded-lg px-6 py-2 transition-all shadow-sm hover:shadow-md active:scale-95 text-white 
//                 ${clicked ? "bg-red-800" : "bg-indigo-600 hover:bg-indigo-700"}
//               `}
//                         >
//                             Dashboard
//                         </Button>

//                         <Link href="/sign-in">
//                             <Button
//                                 onClick={handleClick}
//                                 className={`font-medium rounded-lg px-6 py-2 transition-all shadow-sm hover:shadow-md active:scale-95 text-white 
//                   ${clicked ? "bg-red-800" : "bg-indigo-600 hover:bg-indigo-700"}
//                 `}
//                             >
//                                 Get Started
//                             </Button>
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }

// export default Header;











"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function Header() {
    const { user, isSignedIn } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
    };

    const handleDashboardClick = () => {
        handleClick();

        if (isSignedIn) {
            router.push("/dashboard");
        } else {
            router.push("/sign-in?redirect_url=/dashboard");
        }
    };

    return (
        <header className="w-full p-4 px-6 flex justify-between items-center border-b shadow-sm bg-white">
            {/* Left side: Logo + Title */}
            <div className="flex items-center gap-10">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={80}
                    height={60}
                    
                />
                <h1 className="text-2xl font-extrabold tracking-tight ">
                    <span className="text-indigo-600">Expense</span>{" "}
                    <span className="text-gray-900">Tracker</span>
                </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Always show Dashboard button (even if signed in) */}
                <Button
                    onClick={handleDashboardClick}
                    className={`font-medium rounded-lg px-6 py-2 transition-all shadow-sm hover:shadow-md active:scale-95 text-white 
            ${clicked ? "bg-red-800" : "bg-indigo-600 hover:bg-indigo-700"}
          `}
                >
                    Dashboard
                </Button>

                {/* If signed in → show greeting + profile button */}
                {isSignedIn ? (
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:block text-sm font-medium text-gray-600">
                            Hi, {user?.firstName || "User"}
                        </span>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    // If not signed in → show Get Started button
                    <Link href="/sign-in">
                        <Button
                            onClick={handleClick}
                            className={`font-medium rounded-lg px-6 py-2 transition-all shadow-sm hover:shadow-md active:scale-95 text-white 
                ${clicked ? "bg-red-800" : "bg-indigo-600 hover:bg-indigo-700"}
              `}
                        >
                            Get Started
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
