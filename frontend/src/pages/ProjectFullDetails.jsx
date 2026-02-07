import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, FileText, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import SidePanel from "@/components/ClientsidePanel";

const ProjectFullDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjectDetails = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/get-project/${projectId}`);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setProject(data.project || data);
    } catch (err) {
      console.error("Failed to fetch project:", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner className="size-18 text-purple-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <p className="text-center text-2xl text-gray-300 mt-40">
        Project not found.
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
            Project Details
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
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-purple-500">
            {project.title}
          </h2>

          {/* META */}
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/40">
              ₹ {project.budget}
            </span>

            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              {project.category}
            </span>

            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
              {project.status}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* SKILLS */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Skills Required
            </h3>
            <p className="text-gray-300">
              {project.skills_required || project.skills}
            </p>
          </div>

          {/* DATES */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <Clock size={16} />
              Posted on{" "}
              {new Date(project.created_at).toLocaleDateString("en-GB")}
            </p>

            {project.deadline && project.deadline !== "0001-01-01" && (
              <p className="flex items-center gap-2">
                <Clock size={16} />
                Deadline{" "}
                {new Date(project.deadline).toLocaleDateString("en-GB")}
              </p>
            )}
          </div>

          {/* FILE */}
          {project.file_url && (
            <div className="mt-6">
              <a
                href={project.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-4 py-2
                  rounded-full text-sm font-semibold
                  bg-white/20 border border-white/40
                  hover:bg-white/30 transition
                "
              >
                <FileText size={16} />
                View Attached File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFullDetails;
