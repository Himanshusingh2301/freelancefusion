import React from 'react'
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

const FirstSec = () => {

  const { getToken } = useAuth();
  const navigate = useNavigate();
  const loadingRef = useRef(null)
  const handleRoleSelect = async (role) => {
    try {

      loadingRef.current.staticStart(80);

      // Get the Clerk token
      const token = await getToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      // Make request to backend
      const res = await fetch(`${BASE_URL}/update-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Role updated successfully to ${role}!`);
      } else {
        console.log(`Failed: ${data.error}`);
      }
      loadingRef.current.complete();

      if (role === "client") {
        navigate("/client-dashboard");
      } else if (role === "freelancer") {
        navigate("/freelancer-dashboard");
      }
    } catch (err) {
      loadingRef.current.complete();
      console.error("Error updating role:", err);
    }
  };

  return (
    <>
    <LoadingBar
        ref={loadingRef}
        color="#a855f7"   // purple
        height={3}
        transitionTime={150}
        shadow={false}
      />

    <div className='h-[100vh] bg-[url("/firstbg.png")] bg-cover bg-center bg-no-repeat'>

      <div className=' flex flex-col justify-center w-[60%]  h-full  items-center'>
        <span
          className="ml-[100px] text-[60px] text-center font-extrabold 
          bg-gradient-to-r from-purple-300 via-pink-300 to-orange-400 
          text-transparent bg-clip-text 
          transition-all duration-700 ease-in-out 
          hover:scale-105 hover:tracking-wider hover:brightness-110 
          drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        >
          Tell me what role you want to act as.
        </span>
        <div className="flex justify-center items-center  w-full ml-[60px] gap-10 mt-12">
          <button
            onClick={() => handleRoleSelect("freelancer")}
            className="cursor-pointer relative px-10 py-4 text-lg font-semibold text-white uppercase tracking-wide 
            bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 
            rounded-xl overflow-hidden transition-all duration-500 ease-out 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] 
            border border-gray-700 hover:border-purple-500 
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
            before:via-white/10 before:to-transparent before:translate-x-[-100%] 
            before:skew-x-12 hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            Act as Freelancer
          </button>

          <button
            onClick={() => handleRoleSelect("client")}
            className="cursor-pointer relative px-10 py-4 text-lg font-semibold text-white uppercase tracking-wide 
            bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 
            rounded-xl overflow-hidden transition-all duration-500 ease-out 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] 
            border border-gray-700 hover:border-blue-500 
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
            before:via-white/10 before:to-transparent before:translate-x-[-100%] 
            before:skew-x-12 hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            Act as Client
          </button>
        </div>




      </div>
    </div>
    </>
  )
}

export default FirstSec