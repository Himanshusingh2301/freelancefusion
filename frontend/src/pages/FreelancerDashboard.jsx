import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ClientProfile from "@/components/ClientProfile";
import { useUser, useAuth } from "@clerk/clerk-react";
import FreelancerSectionsDash from "@/components/FreelancerSectionsDash";
import { Spinner } from "@/components/ui/spinner";

const FreelancerDashboard = () => {

    const { user, isSignedIn } = useUser();
    const [dbUser, setDbUser] = useState(null);
    const { getToken } = useAuth();
    const [picurl, setpicurl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isSignedIn) return;

        const fetchUserData = async () => {
            const token = await getToken({ template: "default" });

            try {
                const BASE_URL = import.meta.env.VITE_API_BASE_URL;

                const res = await fetch(`${BASE_URL}/get-user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setDbUser(data.user);
                } else {
                    console.error("Error fetching user:", data.error);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        setpicurl(user.imageUrl)

        fetchUserData();
    }, [isSignedIn, user, getToken]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Spinner className="size-18 text-purple-500" />
            </div>
        );
    }
    if (!dbUser) return null;
    return (
        <div className="min-h-screen bg-[url('/firstbg.png')] bg-cover bg-center bg-no-repeat">
            <Navbar />
            <div className="flex justify-evenly min-h-screen pt-[120px] pb-[20px] px-[30px]">
                <ClientProfile user={dbUser} picurl={picurl} />
                <FreelancerSectionsDash />
            </div>
        </div>
    )
}

export default FreelancerDashboard