/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Link from "next/link"
import {useUser} from '@clerk/nextjs'

export const Navigation = () => {
    const { isSignedIn } = useUser();
    return(
        <nav className="flex items-center justify-between p-4 bg-black shadow-md px-6">
            {/* logo */}
            <div className="flex items-center">
                <Link href="/">
                    <span className="text-xl font-bold text-white cursor-pointer">
                        MyOps
                    </span>
                </Link>
            </div>

            {/* Conditional Rendering */}
            <div className="flex item-center">
                {isSignedIn ? (
                    <Link href="/dashboard">
                        <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-800">
                            Dashboard
                        </button>
                    </Link>
                ) : (
                    <Link href="/sign-up">
                        <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-800">
                            Get Started
                        </button>
                    </Link>  
                )}
            </div>
        </nav>
    )
}