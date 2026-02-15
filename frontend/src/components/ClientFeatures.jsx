import React from "react";

const ClientFeatures = () => {
  return (
    <div className='relative h-[100vh] bg-[url("/client.jpeg")] bg-cover bg-center bg-no-repeat'>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-24 text-white text-center">

        {/* Content Wrapper */}
        <div className="w-[75%] flex flex-col items-center">

          {/* Heading */}
          <h2
            className="text-5xl font-extrabold w-[85%]
            bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400
            text-transparent bg-clip-text
            drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          >
            Built for Smart Clients
          </h2>

          {/* Intro */}
          <p className="mt-6 w-[75%] text-lg text-gray-300 leading-relaxed">
            A powerful ML-driven freelance platform that helps clients
            post projects, discover top talent, and manage collaborations
            with complete control and efficiency.
          </p>

          {/* Feature Grid */}
          <div className="mt-12 grid grid-cols-3 gap-10 w-full">

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-blue-500 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-blue-400">
                Post Projects Instantly
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Create and publish detailed job listings to attract
                qualified freelancers that match your project needs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-cyan-400 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-cyan-400">
                Intelligent Freelancer Search
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Use ML-powered recommendations to discover freelancers
                based on skills, experience, and job relevance.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 
            p-6 rounded-2xl backdrop-blur-md 
            hover:scale-105 hover:border-purple-400 
            transition-all duration-500">

              <h3 className="text-xl font-semibold text-purple-400">
                Manage & Connect Easily
              </h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Update project details, manage listings, and directly
                contact freelancers to hire the perfect fit.
              </p>
            </div>

          </div>

          {/* CTA */}
          <button className="mt-10 px-8 py-4 text-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 to-purple-600 
            rounded-xl transition-all duration-500 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            Start Posting Projects
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClientFeatures;
