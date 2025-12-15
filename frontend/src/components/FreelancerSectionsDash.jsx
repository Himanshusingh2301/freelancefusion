import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, Briefcase, Search, ArrowRight } from "lucide-react";

const FreelancerSectionsDash = () => {
  const sections = [
    {
      title: "Ratings",
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      description: "Check your average ratings and client feedback.",
    },
    {
      title: "Work History",
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      description: "View completed projects and earnings record.",
    },
    {
      title: "Active Projects",
      icon: <Briefcase className="w-6 h-6 text-green-400" />,
      description: "Manage ongoing client projects and deadlines.",
    },
    {
      title: "Find New Clients",
      icon: <Search className="w-6 h-6 text-purple-400" />,
      description: "Browse and apply for new freelance projects.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
      {sections.map((item, index) => (
        <Card
          key={index}
          className="relative bg-gray-900/60 border border-gray-700/70 shadow-lg 
                     hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] 
                     transition-all duration-500 rounded-2xl backdrop-blur-sm 
                     overflow-hidden group px-5 h-fit"
        >
          {/* subtle metallic shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] 
                          transition-transform duration-1000 ease-out"></div>

          <CardHeader className="flex flex-col items-center text-center relative z-10">
            <div className=" rounded-full bg-gray-800/70  border border-gray-700 shadow-inner">
              {item.icon}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-100 tracking-wide">
              {item.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-gray-400 text-center px-4 pb-6 relative z-10">
            <p className="mb-4">{item.description}</p>

            {/* arrow button */}
            <button
              className="cursor-pointer group/arrow flex items-center justify-center gap-2 text-purple-400 
                         hover:text-purple-300 transition-colors mx-auto"
            >
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerSectionsDash;
