import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ClientProfile = ({ user, picurl }) => {
  const navigate = useNavigate();


  return (
    <div className="h-fit  relative bg-gray-900/60 backdrop-blur-md text-white rounded-2xl border border-gray-700 p-8 text-center shadow-lg">

      <div onClick={() => navigate("/client-edit-profile")}
        className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-full text-gray-200 hover:text-blue-400 hover:bg-white/20 cursor-pointer transition-all duration-300 shadow-lg">

        <FiEdit size={20} />
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[3px]">
          <img
            src={picurl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-gray-900"
          />
        </div>
      </div>

      {/* User Info */}
      <h2 className="text-2xl font-bold mb-1">{user?.full_name || "John Doe"}</h2>
      <p className="text-gray-400 mb-4">{user?.email || "johndoe@email.com"}</p>

      {/* Project Count */}
      {user?.role === "client" ? (
        <div className="bg-gray-800/70 rounded-lg py-2 mb-6 border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-xl font-semibold text-purple-400">
              {user?.projectsPosted || 0}
            </span>{" "}
            Projects Posted
          </p>
        </div>
      ) : user?.role === "freelancer" ? (
        <div className="bg-gray-800/70 rounded-lg py-2 mb-6 border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-xl font-semibold text-purple-400">
              {user?.projectsDone || 0}
            </span>{" "}
            Projects Done
          </p>
        </div>
      ) : null}

      {/* Social Links */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center gap-6">
          {/* GitHub Icon */}
          {user?.github ? (
            <a
              href={user.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white text-2xl transition"
            >
              <FaGithub />
            </a>
          ) : (
            <div className="text-gray-500 text-2xl opacity-50 cursor-not-allowed">
              <FaGithub />
            </div>
          )}

          {/* LinkedIn Icon */}
          {user?.linkedin ? (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white text-2xl transition"
            >
              <FaLinkedin />
            </a>
          ) : (
            <div className="text-gray-500 text-2xl opacity-50 cursor-not-allowed">
              <FaLinkedin />
            </div>
          )}
        </div>

      </div>


      {/* Intro */}
      <p className="text-gray-300 text-sm leading-relaxed">
        {user?.intro ||
          "Hello! I'm a passionate client looking for skilled freelancers to collaborate on innovative projects."}
      </p>
    </div>
  );
};

export default ClientProfile;
