import React, { useEffect, useState } from "react";
import { Pencil, Trash2, ArrowRight, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import SidePanel from "@/components/ClientsidePanel";

const ActiveProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/get-all-projects`, {
       
      });

      const data = await res.json();

      // ✅ FILTER ONLY "not taken" PROJECTS
      const notTakenProjects = (data.projects || []).filter(
        (project) => project.status === "not taken"
      );
      setProjects(notTakenProjects);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
    <div className="min-h-screen bg-[url('/editbg.png')] bg-cover bg-center text-white relative">
      <div className="fixed left-6 top-1/3 -translate-y-1/2 z-50">
        <SidePanel />
      </div>
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
                    border bg-red-500/20 text-red-400 border-red-500/40
                  `}
                >
                  Deadline: { new Date(project.deadline).toLocaleDateString("en-GB")}
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

              
              {/* FULL DETAILS */}
              <button
                onClick={() => navigate(`/project/${project._id}`)}
                className="px-2 py-1 text-sm font-semibold rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition"
              >
                View Details
              </button>

              <button>
                
              </button>

            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default ActiveProjectList;
