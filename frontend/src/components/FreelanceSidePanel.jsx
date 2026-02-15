import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FreelanceSidePanel = ({ horizontal = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        horizontal
          ? `
              flex items-center gap-4
            `
          : `
              w-16 py-6
              flex flex-col items-center gap-6
              rounded-2xl
              bg-black/10 backdrop-blur-sm
              border border-white/10
              shadow-lg
            `
      }
    >
      {/* HOME */}
      <button
        onClick={() => navigate("/")}
        className={`
          relative group
          ${horizontal ? "p-2" : "p-3"}
          rounded-xl
          transition-all duration-300
          hover:bg-pink-500/20 hover:scale-110
        `}
      >
        <Home
          className="text-gray-300 group-hover:text-pink-500"
          size={horizontal ? 20 : 22}
        />

        {/* Tooltip only in vertical mode */}
        {!horizontal && (
          <span
            className="
              absolute left-16 top-1/2 -translate-y-1/2
              whitespace-nowrap
              px-3 py-1 text-sm font-medium
              rounded-lg
              bg-black/80 text-white
              opacity-0 scale-95
              group-hover:opacity-100 group-hover:scale-100
              transition-all duration-300
              pointer-events-none
            "
          >
            Home
          </span>
        )}
      </button>

      {/* FREELANCER DASHBOARD */}
      <button
        onClick={() => navigate("/freelancer-dashboard")}
        className={`
          relative group
          ${horizontal ? "p-2" : "p-3"}
          rounded-xl
          transition-all duration-300
          hover:bg-blue-500/20 hover:scale-110
        `}
      >
        <User
          className="text-gray-300 group-hover:text-blue-400"
          size={horizontal ? 20 : 22}
        />

        {/* Tooltip only in vertical mode */}
        {!horizontal && (
          <span
            className="
              absolute left-16 top-1/2 -translate-y-1/2
              whitespace-nowrap
              px-3 py-1 text-sm font-medium
              rounded-lg
              bg-black/80 text-white
              opacity-0 scale-95
              group-hover:opacity-100 group-hover:scale-100
              transition-all duration-300
              pointer-events-none
            "
          >
            Freelancer Dashboard
          </span>
        )}
      </button>
    </div>
  );
};

export default FreelanceSidePanel;
