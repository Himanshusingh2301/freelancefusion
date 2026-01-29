import React, { useState, useEffect,useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SidePanel from "@/components/ClientsidePanel";
import LoadingBar from "react-top-loading-bar";
import FreelanceSidePanel from "@/components/FreelanceSidePanel";

const EditProfile = () => {
  const loadingRef = useRef(null);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    github: "",
    linkedin: "",
    intro: "",
  });
  const [loading, setLoading] = useState(true);
  const [spiralLoading, setspiralLoading] = useState(false)
  const [userRole, setuserRole] = useState("")
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch current user data on load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${BASE_URL}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setuserRole(data.user.role)
        if (res.ok && data.user) {
          setFormData({
            full_name: data.user.full_name || "",
            github: data.user.github || "",
            linkedin: data.user.linkedin || "",
            intro: data.user.intro || "",
          });
        } else {
          console.error("Failed to load user:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getToken]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update user profile in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setspiralLoading(true);

    try {
      const token = await getToken();

      const res = await fetch(`${BASE_URL}/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error || "Update failed");
      }

      toast.success("Profile updated successfully");

      // Navigate AFTER success
      if (userRole === "client") {
        navigate("/client-dashboard");
      } else if (userRole === "freelancer") {
        navigate("/freelancer-dashboard");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setspiralLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner className="size-18 text-purple-500" />
      </div>
    );
  }

  return (
    <>
      <LoadingBar
        ref={loadingRef}
        color="#a855f7"   // purple
        height={3}
        transitionTime={150}
        shadow={false}
      />

      <div className=" realtive min-h-screen bg-[url('/editbg.png')] bg-cover bg-center flex items-center justify-center">
      <div className="fixed left-6 top-1/4 -translate-y-1/2 z-50">
        {userRole === "client" ? <SidePanel /> : <FreelanceSidePanel />}
      </div>

        <div className="bg-[url('/firstbg.png')] p-8 rounded-2xl shadow-lg w-full max-w-lg text-white border border-gray-700">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-100 mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* GitHub & LinkedIn */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-100 mb-1">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="github.com/username"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-100 mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>

            {/* Intro */}
            <div>
              <label className="block text-gray-100 mb-1">Introduction</label>
              <textarea
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                placeholder="Write a short introduction about yourself..."
              ></textarea>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={spiralLoading}
              className={`w-full cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-medium py-3 rounded-lg mt-2 transition-all duration-200 shadow-md ${spiralLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {spiralLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <Spinner />
                  <span>Updating...</span>
                </div>
              ) : (
                "Update Profile"
              )}

            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
