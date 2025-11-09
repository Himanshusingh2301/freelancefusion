import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ClientProfile from "@/components/ClientProfile";
import { useUser, useAuth } from "@clerk/clerk-react";

const ClientDashboard = () => {
  const { user, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const { getToken } = useAuth();
  const [picurl, setpicurl] = useState(null)

  useEffect(() => {
    if (!isSignedIn) return;

    const fetchUserData = async () => {
      const token = await getToken({ template: "default" });

      try {
        const res = await fetch("http://localhost:5000/api/get-user", {
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
      }
    };
    setpicurl(user.imageUrl)

    fetchUserData();
  }, [isSignedIn, user, getToken]);

  if (!dbUser) return <div className="text-white">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-[url('/firstbg.png')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div className="flex items-center justify-start pt-[120px] pb-[20px] px-[30px]">
        <ClientProfile user={dbUser} picurl={picurl}/>
      </div>
    </div>
  );
};

export default ClientDashboard;
