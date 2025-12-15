import React, { useEffect } from "react";
import {
    useUser,
    useAuth,
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/clerk-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        const addUserToDB = async () => {
            if (!user) return; 
            const token = await getToken({ template: "default" });
            console.log(token)
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;

            try {
                const res = await fetch(`${BASE_URL}/add-user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                });

                const data = await res.json();
                console.log("✅ User sync result:", data);
            } catch (err) {
                console.error("❌ Error syncing user:", err);
            }
        };

        addUserToDB();
    }, [user, getToken]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-md text-white px-6 py-3 flex items-center justify-between z-50">
            {/* LEFT SECTION */}
            <div className="flex gap-15 items-center">
                <div className="text-xl font-bold tracking-wide flex items-center">
                    <img width="90px" src="./logo.png" alt="Logo" />
                    <img className="h-[60px] w-[120px]" src="./logotext.png" alt="Logo Text" />

                </div>

                <div className="menulinks flex gap-12">
                    {/* Menu 1 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="outline-0">
                            <span className="cursor-pointer hover:text-pink-500">
                                Hire Freelancers
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-white">
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>List One</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="bg-gray-700 text-white">
                                    <DropdownMenuItem>Link 1</DropdownMenuItem>
                                    <DropdownMenuItem>Link 2</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>List Two</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="bg-gray-700 text-white">
                                    <DropdownMenuItem>Link A</DropdownMenuItem>
                                    <DropdownMenuItem>Link B</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuItem>Direct Link</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Menu 2 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="outline-0">
                            <span className="cursor-pointer hover:text-orange-300">
                                Find Work
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-white">
                            <DropdownMenuItem>Projects</DropdownMenuItem>
                            <DropdownMenuItem>Contests</DropdownMenuItem>
                            <DropdownMenuItem>Categories</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Menu 3 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="outline-0">
                            <span className="cursor-pointer hover:text-purple-300">
                                About Us
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-white">
                            <DropdownMenuItem>Company</DropdownMenuItem>
                            <DropdownMenuItem>Careers</DropdownMenuItem>
                            <DropdownMenuItem>Contact</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex gap-4">
                <SignedOut>
                    <SignInButton
                        className="cursor-pointer px-6 py-2 text-white font-semibold rounded-lg 
              bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
              transition-transform duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    />
                    <SignUpButton
                        className="cursor-pointer px-6 py-2 text-white font-semibold rounded-lg 
              bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
              transition-transform duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    />
                </SignedOut>

                <SignedIn>
                    <div className="p-2 flex justify-center items-center bg-gray-800 rounded-full shadow-md hover:shadow-lg transition duration-300">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: {
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "9999px",
                                        boxShadow: "0 0 0 2px #a855f7",
                                        transition: "all 0.3s ease",
                                    },
                                },
                            }}
                        />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
