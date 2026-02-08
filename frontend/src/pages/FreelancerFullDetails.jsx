import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Github, ArrowLeft, Mail, Linkedin, Globe2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const FreelancerFullDetails = () => {
  const { freelancerId } = useParams();
  const navigate = useNavigate();

  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFreelancer = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/get-freelancer/${freelancerId}`);

      if (!res.ok) {
        throw new Error("Freelancer not found");
      }

      const data = await res.json();
      setFreelancer(data.freelancer);
    } catch (err) {
      console.error(err);
      setFreelancer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancer();
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner className="size-18 text-purple-500" />
      </div>
    );
  }

  if (!freelancer) {
    return (
      <p className="text-center text-2xl text-gray-300 mt-40">
        Freelancer not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/editbg.png')] bg-cover bg-center text-white pb-10">

      {/* HEADER */}
      <div className="fixed w-screen top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className="text-2xl font-bold tracking-wide">
            Freelancer Profile
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-28 max-w-5xl mx-auto px-6">
        <div
          className="
            p-8 rounded-2xl
            bg-black/40 backdrop-blur-2xl
            border border-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.3)]
          "
        >
          {/* NAME */}
          <h2 className="text-4xl font-bold text-purple-500">
            {freelancer.full_name}
          </h2>

          <p className="text-xl text-gray-200 mt-1">
            {freelancer.title}
          </p>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
              {freelancer.experience_level}
            </span>

            <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
              ₹ {freelancer.hourly_rate} / hour
            </span>

            <span className="px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
              {freelancer.availability}
            </span>
          </div>

          {/* SKILLS */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Skills</h3>
            <p className="text-gray-300">{freelancer.skills}</p>
          </div>

          {/* ABOUT */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-gray-300 leading-relaxed">
              {freelancer.about}
            </p>
          </div>

          {/* CONTACT DETAILS */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold mb-4">Contact & Profiles</h3>

            <div className="flex flex-col gap-4">

              {/* GMAIL */}
              {freelancer.email && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={18} className="text-purple-400" />
                  <a
                    href={`mailto:${freelancer.email}`}
                    className="hover:text-white transition"
                  >
                    {freelancer.email}
                  </a>
                </div>
              )}

              {/* GITHUB */}
              {freelancer.github && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Github size={18} className="text-gray-400" />
                  <a
                    href={freelancer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {freelancer.github}
                  </a>
                </div>
              )}

              {/* LINKEDIN */}
              {freelancer.linkedin && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Linkedin size={18} className="text-blue-400" />
                  <a
                    href={freelancer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {freelancer.linkedin}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            {freelancer.portfolio_url && (
              <a
                href={freelancer.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-5 py-2
                  rounded-full bg-white/20 border border-white/40
                  hover:bg-white/30 transition
                "
              >
                <Globe2 size={18} />
                View Portfolio
              </a>
            )}

            {freelancer.email && (
              <a
                href={`mailto:${freelancer.email}?subject=Project Inquiry&body=Hi ${freelancer.full_name}, I would like to discuss a project with you.`}
                className="
                  inline-flex items-center gap-2 px-6 py-3
                  rounded-full
                  bg-purple-500/20 text-purple-300
                  border border-purple-500/40
                  hover:bg-purple-500/30 transition
                "
              >
                <Mail size={18} />
                Contact Freelancer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerFullDetails;
