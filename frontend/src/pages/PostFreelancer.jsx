import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import FreelanceSidePanel from "@/components/FreelanceSidePanel";
import toast from "react-hot-toast";

const PostFreelancer = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",          // ✅ REQUIRED
    title: "",
    skills: "",
    experience_level: "",
    hourly_rate: "",
    availability: "",
    portfolio_url: "",
    github: "",         // ✅ OPTIONAL
    linkedin: "",       // ✅ OPTIONAL
    about: "",
  });

  // ✅ Prefill data from Clerk
  useEffect(() => {
    const user = window.Clerk?.user;

    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await window.Clerk.session.getToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${BASE_URL}/post-freelancer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to post freelancer");
      }

      toast.success("Freelancer profile created successfully!");

      setFormData({
        full_name: formData.full_name,
        email: formData.email,
        title: "",
        skills: "",
        experience_level: "",
        hourly_rate: "",
        availability: "",
        portfolio_url: "",
        github: "",
        linkedin: "",
        about: "",
      });

    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-[url('/editbg.png')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="fixed left-6 top-1/4 -translate-y-1/2 z-50">
        <FreelanceSidePanel />
      </div>

      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-100">
            Post Freelancer Profile
          </CardTitle>
          <p className="text-sm text-gray-400">
            Share your skills and get hired by clients
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Email (Gmail) */}
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-1">Professional Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-300 mb-1">Skills</label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Experience & Rate */}
            <div className="flex gap-4">
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              >
                <option value="">Experience</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>

              <input
                type="number"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={handleChange}
                placeholder="Hourly Rate (₹)"
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Availability */}
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
              required
            >
              <option value="">Availability</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>

            {/* Portfolio */}
            <input
              type="url"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              placeholder="Portfolio URL"
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
            />

            {/* GitHub */}
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub Profile (optional)"
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
            />

            {/* LinkedIn */}
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile (optional)"
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
            />

            {/* About */}
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              placeholder="About you"
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
              text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner />
                  Posting...
                </>
              ) : (
                "Post Profile"
              )}
            </button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostFreelancer;
