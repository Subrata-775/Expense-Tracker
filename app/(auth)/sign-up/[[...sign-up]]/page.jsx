"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                afterSignUpUrl="/dashboard"
            />
        </div>
    );
}
