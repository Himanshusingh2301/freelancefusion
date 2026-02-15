import React, { useEffect, useState, useMemo } from "react";
import { Github, ArrowRight, Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import SidePanel from "@/components/ClientsidePanel";
import { useNavigate } from "react-router-dom";

const FreelancerList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFreelancers = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/get-all-freelancers`);
      const data = await res.json();
      setFreelancers(data.freelancers || []);
    } catch (err) {
      console.error("Failed to fetch freelancers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  /* 🔥 SMART FILTER */
  const filteredFreelancers = useMemo(() => {
    if (!search.trim()) return freelancers;

    const keywords = search.toLowerCase().split(/\s+/).filter(Boolean);

    return freelancers.filter((f) => {
      const searchableText = `
        ${f.full_name}
        ${f.title}
        ${f.skills}
        ${f.experience_level}
        ${f.availability}
      `.toLowerCase();

      return keywords.every((word) => {
        if (!isNaN(word)) {
          return String(f.hourly_rate).includes(word);
        }
        return searchableText.includes(word);
      });
    });
  }, [search, freelancers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner className="size-18 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/editbg.png')] bg-cover bg-center text-white pb-10">

      {/* HEADER */}
      <div className="fixed w-screen top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-8xl  px-0 py-4 flex items-center gap-6 mx-5">

          {/* LEFT: ICON NAV */}
          <SidePanel horizontal />

          {/* TITLE */}
          <h1 className="text-3xl font-bold tracking-wide whitespace-nowrap">
            Freelancers
          </h1>

          {/* SPACER */}
          <div className="flex-1" />

          {/* SEARCH */}
          <div
            className="
              relative w-full max-w-md
              bg-black/40 backdrop-blur-2xl
              border border-white/20
              rounded-full
              mr-8
              shadow-[0_0_30px_rgba(168,85,247,0.15)]
              focus-within:border-purple-400/50
              focus-within:shadow-[0_0_40px_rgba(168,85,247,0.35)]
            "
          >
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-300 "
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills, role, name…"
              className="
                w-full bg-transparent
                pl-12 pr-5 py-3
                text-base text-white
                placeholder-gray-400
                focus:outline-none
              "
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="pt-28 max-w-6xl mx-auto px-6 space-y-6">
        {filteredFreelancers.length === 0 ? (
          <p className="text-center text-xl text-gray-300 mt-20">
            No matching freelancers found.
          </p>
        ) : (
          filteredFreelancers.map((freelancer) => (
            <div
              key={freelancer._id}
              className="
                w-full p-6 rounded-xl
                bg-black/40 backdrop-blur-2xl
                border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-black/55
                hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]
                hover:border-purple-400/40
              "
            >
              <h2 className="text-2xl font-bold text-purple-500">
                {freelancer.full_name}
              </h2>

              <div className="flex items-center gap-3 mt-1">
                <p className="text-gray-200">{freelancer.title}</p>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {freelancer.experience_level}
                </span>
              </div>

              <p className="text-gray-300 mt-2">
                <span className="text-white font-semibold">Skills:</span>{" "}
                {freelancer.skills}
              </p>

              <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/40">
                    ₹ {freelancer.hourly_rate}/hr
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                    {freelancer.availability}
                  </span>

                  {freelancer.portfolio_url && (
                    <a
                      href={freelancer.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-white/20 border border-white/40 hover:bg-white/30 transition"
                    >
                      <Github size={14} />
                      Portfolio
                    </a>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/freelancer/${freelancer._id}`)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition"
                >
                  Contact
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreelancerList;
