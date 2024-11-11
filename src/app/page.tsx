"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
    const [email, setEmail] = useState("");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-4">
                    {" "}
                    {/* Reduced space */}
                    <Image
                        src="/logo.png"
                        alt="My Logo"
                        width={300} // Adjusted width for smaller display
                        height={400} // Adjusted height for smaller display
                        className="w-48 h-auto sm:w-64 md:w-80 lg:w-96"
                    />
                </div>
                <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                    Coming Soon
                </h1>
                <p className="text-center text-sm text-gray-600 mb-4">
                    We're working hard to bring you something amazing. Stay
                    tuned!
                </p>
                <form className="space-y-4">
                    {" "}
                    {/* Reduced space between form elements */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Subscribe
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
