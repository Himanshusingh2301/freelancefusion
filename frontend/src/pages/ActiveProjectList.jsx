import React, { useEffect, useMemo, useState } from "react";
import { Paperclip, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import FreelanceSidePanel from "@/components/FreelanceSidePanel";

const ActiveProjectList = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRecommendedView, setIsRecommendedView] = useState(false);

  const fetchProjects = async () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Missing auth token");
      }

      const recRes = await fetch(`${BASE_URL}/recommend-projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const recData = await recRes.json();

      if (!recRes.ok) {
        throw new Error(recData.error || "Failed to fetch recommendations");
      }

      setProjects(recData.recommended_projects || []);
      setIsRecommendedView(true);
    } catch (err) {
      console.warn("Recommendation failed, using default project list:", err?.message || err);
      try {
        const res = await fetch(`${BASE_URL}/get-all-projects`);
        const data = await res.json();
        const notTakenProjects = (data.projects || []).filter(
          (project) => (project.status || "not taken") === "not taken"
        );
        setProjects(notTakenProjects);
        setIsRecommendedView(false);
      } catch (fallbackErr) {
        console.error(fallbackErr);
        setProjects([]);
        setIsRecommendedView(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;

    const keywords = search.toLowerCase().split(/\s+/).filter(Boolean);
    return projects.filter((project) => {
      const searchableText = `
        ${project.title}
        ${project.description}
        ${project.skills_required || ""}
        ${project.skills || ""}
        ${project.category}
        ${project.status || "not taken"}
      `.toLowerCase();

      return keywords.every((word) => {
        if (!isNaN(word)) {
          return String(project.budget).includes(word);
        }
        return searchableText.includes(word);
      });
    });
  }, [search, projects]);

  const formatMatchScore = (score) => {
    if (typeof score !== "number") return null;
    return `${Math.round(score * 100)}% Match`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner className="size-18 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/editbg.png')] bg-cover bg-center text-white pb-10">
      <div className="fixed w-screen top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-8xl mx-auto px-6 py-4 flex items-center gap-6">
          <FreelanceSidePanel horizontal />

          <h1 className="text-3xl font-bold tracking-wide whitespace-nowrap">
            {isRecommendedView ? "Recommended Projects" : "Available Projects"}
          </h1>

          <div className="flex-1" />

          <div
            className="
              relative w-full max-w-md
              bg-black/40 backdrop-blur-2xl
              border border-white/20
              rounded-full
              shadow-[0_0_30px_rgba(168,85,247,0.15)]
              focus-within:border-purple-400/50
              focus-within:shadow-[0_0_40px_rgba(168,85,247,0.35)]
              mr-8
            "
          >
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills, category, budget, keywords..."
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

      <div className="pt-28 max-w-6xl mx-auto px-6 space-y-6">
        {filteredProjects.length === 0 ? (
          <p className="text-2xl text-center font-bold text-gray-300 mt-20">
            No matching projects found.
          </p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project._id}
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
                relative
              "
            >
              <div>
                <h2 className="text-2xl font-semibold text-purple-500">{project.title}</h2>

                <p className="text-gray-100 text-sm mt-2">
                  <strong className="text-white">Category:</strong> {project.category}
                </p>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="px-4 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500/40">
                    Deadline:{" "}
                    {project.deadline && project.deadline !== "0001-01-01"
                      ? new Date(project.deadline).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>

                  <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    ₹ {project.budget}
                  </span>

                  {isRecommendedView && formatMatchScore(project.match_score) && (
                    <span className="px-4 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {formatMatchScore(project.match_score)}
                    </span>
                  )}

                  {project.file_url && (
                    <a
                      href={project.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 px-4 py-1
                        rounded-full text-sm font-semibold
                        bg-white/20 border border-white/40
                        hover:bg-white/30 transition
                      "
                    >
                      <Paperclip size={16} />
                      Attached File
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate(`/project/${project._id}`)}
                className="
                  absolute bottom-6 right-6
                  px-4 py-2 text-sm font-semibold
                  rounded-full
                  bg-white/20 border border-white/40
                  hover:bg-white/30 transition
                "
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveProjectList;
