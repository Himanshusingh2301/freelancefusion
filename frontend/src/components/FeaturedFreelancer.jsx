import React from "react";

const FreelancerFeatures = () => {
  return (
    <div className='relative h-[100vh] bg-[url("/freelancer.jpeg")] bg-cover bg-center bg-no-repeat'>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 "></div>

      <div className="relative z-10 flex flex-col justify-center items-end h-full px-24 text-white">

        {/* Content Wrapper */}
        <div className="w-[75%] text-left">

          {/* Heading */}
          <h2
            className="text-5xl font-extrabold w-[85%]
            bg-gradient-to-r from-purple-300 via-pink-300 to-orange-400
            text-transparent bg-clip-text
            drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] my-3"
          >
            Everything a Freelancer Needs
          </h2>

          {/* Short Intro */}
          <p className="mt-6 w-[80%] text-lg text-gray-300 leading-relaxed">
            A smart system designed to help freelancers grow faster,
            find better projects, and stay organized effortlessly.
          </p>

          {/* Feature Points */}
          <div className="mt-12 grid grid-cols-3 gap-10">

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-purple-500 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-purple-400">
                Dynamic Profile Control
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Create, edit, and update your skills, experience,
                and portfolio anytime to match evolving opportunities.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-pink-500 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-pink-400">
                Intelligent Project Search
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Find projects aligned with your expertise using
                machine learning–based skill matching.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-orange-400 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-orange-400">
                Smart Activity Tracking
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                View your project watch history and stay organized
                with complete visibility of explored opportunities.
              </p>
            </div>

          </div>

          {/* Button */}
          <button className="mt-10 px-8 py-4 text-lg font-semibold text-white 
            bg-gradient-to-r from-purple-600 to-pink-600 
            rounded-xl transition-all duration-500 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            See How It Works
          </button>

        </div>
      </div>
    </div>
  );
};

export default FreelancerFeatures;
