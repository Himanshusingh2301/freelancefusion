import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import FreelanceSidePanel from "@/components/FreelanceSidePanel";

const FreelancerActiveProjects = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = await getToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/active-projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch active projects");
      setProjects(data.projects || []);
    } catch (err) {
      toast.error(err.message || "Unable to load active projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (projectId) => {
    try {
      const token = await getToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/complete-project/${projectId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to complete project");
      toast.success("Project marked as completed");
      fetchProjects();
    } catch (err) {
      toast.error(err.message || "Could not complete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <FreelanceSidePanel horizontal />
          <h1 className="text-3xl font-bold tracking-wide whitespace-nowrap">Active Projects</h1>
          <div className="flex-1" />
        </div>
      </div>

      <div className="pt-28 max-w-6xl mx-auto px-6 space-y-6">
        {projects.length === 0 ? (
          <p className="text-2xl text-center font-bold text-gray-300 mt-20">
            No active projects yet. Take a project from recommendations first.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="w-full p-6 rounded-xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-purple-500">{project.title}</h2>
                <p className="text-gray-200 mt-2">{project.description}</p>
                <p className="text-gray-300 text-sm mt-2">
                  Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString("en-GB") : "N/A"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/project/${project._id}`)}
                  className="px-4 py-2 rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => markCompleted(project._id)}
                  className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500/30 transition"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreelancerActiveProjects;
