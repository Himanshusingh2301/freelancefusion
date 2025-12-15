import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Pencil, Trash2, ArrowRight, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ClientProjectsList = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const token = await getToken();
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/get-project`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };


  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = await window.Clerk.session.getToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(
        `${BASE_URL}/delete-project/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Project deleted successfully!");
        fetchProjects(); // Re-fetch project list
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  const getStatusColor = (status) => {
    return status === "completed"
      ? "bg-green-500/20 text-green-500 border-green-500/40"
      : status === "ongoing"
        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
        : "bg-red-500/20 text-red-400 border-red-500/40";
  };

  return (
    <div className="min-h-screen bg-[url('/editbg.png')] bg-cover bg-center text-white relative">

      {/* FIXED TOP HEADING */}
      <div className="fixed w-screen top-0 z-50 bg-black/10 backdrop-blur-md py-5 shadow-lg border-b border-black">
        <h1 className="text-3xl font-bold text-center tracking-wide drop-shadow-xl">
          Your Posted Projects
        </h1>
      </div>



      {/* CONTENT */}
      <div className="p-8 pt-28 max-w-6xl mx-auto space-y-6">

        {projects.length === 0 ? (
          <p className="text-3xl text-center font-bold text-gray-300">No projects found...</p>
        ) : (projects.map((project) => (
          <div
            key={project._id}
            className="
            w-full p-6 rounded-xl 
            bg-black/40 
            backdrop-blur-2xl 
            border border-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.3)]
            transition-all duration-300
            cursor-pointer

            flex items-center justify-between

            hover:scale-[1.02]
            hover:bg-black/55
            hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]
            hover:border-purple-400/40
          "
          >



            {/* LEFT SIDE */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-500 drop-shadow-md">
                {project.title}
              </h2>

              <p className="text-gray-100 text-sm mt-2">
                <strong className="text-white">Posted On:</strong>{" "}
                {project.created_at
                  ? new Date(project.created_at).toLocaleDateString("en-GB")
                  : ""}
              </p>


              {/* STATUS + BUDGET */}
              <div className="flex items-center gap-3 mt-3">

                {/* STATUS BADGE */}
                <p
                  className={`
                    inline-block px-4 py-1 rounded-full text-sm font-semibold  
                    border ${getStatusColor(project.status)}
                  `}
                >
                  {project.status.toUpperCase()}
                </p>

                {/* BUDGET BADGE */}
                <p className="
                  px-4 py-1 rounded-full 
                  text-sm font-semibold
                  bg-blue-500/20 text-blue-300 border border-blue-500/40
                ">
                  ₹ {project.budget}
                </p>

                {/* FILE (ONLY IF EXISTS) */}
                {project.file_url && (
                  <a
                    href={project.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                inline-flex items-center gap-2  px-4 py-1 
                rounded-full text-sm font-semibold
                bg-white/20 border border-white/40
                hover:bg-white/30 transition
                "
                  >
                    <Paperclip size={16} className="text-white" />
                    Attached File
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4">

              {/* EDIT */}
              <button
                onClick={() => navigate(`/edit-project/${project._id}`)}
                title="Edit Project"
                className="p-2 rounded-full bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 transition"
              >
                <Pencil size={20} className="text-purple-300" />
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(project._id)}
                title="Delete Project"
                className="p-2 rounded-full bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition"
              >
                <Trash2 size={20} className="text-red-300" />
              </button>

              {/* FULL DETAILS */}
              <button
                onClick={() => navigate(`/project/${project.id}`)}
                title="View Details"
                className="p-2 rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition"
              >
                <ArrowRight size={22} className="text-white" />
              </button>

            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default ClientProjectsList;
