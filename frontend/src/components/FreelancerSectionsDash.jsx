import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Briefcase,
  Search,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FreelancerSectionsDash = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Apply for Freelancing",
      icon: <UserPlus className="w-6 h-6 text-yellow-400" />,
      description:
        "Post your skills and profile so clients can discover and hire you.",
      buttonText: "Apply Now",
      onClick: () => navigate("/freelancer/apply"),
    },
    {
      title: "Find New Projects",
      icon: <Search className="w-6 h-6 text-purple-400" />,
      description: "Browse and apply for new freelance projects.",
      buttonText: "Browse Projects",
      onClick: () => navigate("/freelancer/find-projects"),
    },
    {
      title: "Work History",
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      description: "View completed projects and earnings record.",
      buttonText: "View History",
      onClick: () => navigate("/freelancer/work-history"),
    },
    {
      title: "Active Projects",
      icon: <Briefcase className="w-6 h-6 text-green-400" />,
      description: "Manage ongoing client projects and deadlines.",
      buttonText: "Manage Projects",
      onClick: () => navigate("/freelancer/active-projects"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {sections.map((item, index) => (
        <Card
          key={index}
          className="relative bg-gray-900/60 border border-gray-700/70 shadow-lg 
                     hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] 
                     transition-all duration-500 rounded-2xl backdrop-blur-sm 
                     overflow-hidden group px-1 h-fit"
        >
          {/* subtle metallic shine effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] 
                          transition-transform duration-1000 ease-out"
          ></div>

          <CardHeader className="flex flex-col items-center text-center relative z-10 ">
            <div className="rounded-full bg-gray-800/70 border border-gray-700 shadow-inner p-2">
              {item.icon}
            </div>
            <CardTitle className="text-lg font-semibold  text-gray-100 tracking-wide">
              {item.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-gray-400 text-center px-4 pb-5 relative z-10">
            <p className="mb-4">{item.description}</p>

            {/* action button */}
            <button
              onClick={item.onClick}
              className="cursor-pointer group/arrow flex items-center justify-center gap-2 text-purple-400 
                         hover:text-purple-300 transition-colors mx-auto"
            >
              <span className="text-sm font-medium">{item.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerSectionsDash;
