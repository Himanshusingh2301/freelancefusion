import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import FreelanceSidePanel from "@/components/FreelanceSidePanel";
import toast from "react-hot-toast";

const PostFreelancer = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        title: "",
        skills: "",
        experience_level: "",
        hourly_rate: "",
        availability: "",
        portfolio_url: "",
        about: "",
    });

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

            toast.success("Created successfully!");
            setLoading(false);

            setFormData({
                full_name: "",
                title: "",
                skills: "",
                experience_level: "",
                hourly_rate: "",
                availability: "",
                portfolio_url: "",
                about: "",
            })

        } catch (err) {
            console.error(err);
            toast.error(err.message);
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

                        {/* Name */}
                        <div>
                            <label className="block text-gray-300 mb-1">Full Name</label>
                            <input
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="John Doe"
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
                                placeholder="Full Stack Developer"
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
                                placeholder="React, Node.js, MongoDB"
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                required
                            />
                        </div>

                        {/* Experience & Rate */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-300 mb-1">Experience</label>
                                <select
                                    name="experience_level"
                                    value={formData.experience_level}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="expert">Expert</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-300 mb-1">Hourly Rate (₹)</label>
                                <input
                                    type="number"
                                    name="hourly_rate"
                                    value={formData.hourly_rate}
                                    onChange={handleChange}
                                    placeholder="500"
                                    className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block text-gray-300 mb-1">Availability</label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                required
                            >
                                <option value="">Select</option>
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>

                        {/* Portfolio */}
                        <div>
                            <label className="block text-gray-300 mb-1">Portfolio Link</label>
                            <input
                                type="url"
                                name="portfolio_url"
                                value={formData.portfolio_url}
                                onChange={handleChange}
                                placeholder="https://yourportfolio.com"
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                            />
                        </div>

                        {/* About */}
                        <div>
                            <label className="block text-gray-300 mb-1">About You</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell clients about your experience and work style..."
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 resize-none"

                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer  bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
                         text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Spinner />
                                    <span>Posting...</span>
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
