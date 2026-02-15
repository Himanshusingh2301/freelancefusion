import React from "react";

const AboutSection = () => {
  return (
    <div className="relative  text-white py-28 px-24 
    bg-[url('/About.jpeg')] bg-cover bg-center bg-no-repeat">

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 "></div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-5xl font-extrabold 
        bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
        text-transparent bg-clip-text">
          About Our ML-Powered Freelance Platform
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
          Our platform is a machine learning–powered freelance job marketplace 
          designed to intelligently connect clients and freelancers. 
          By analyzing skills, project requirements, and user preferences, 
          the system delivers smarter matches and faster hiring decisions.
        </p>

        {/* Role Cards */}
        <div className="mt-16 grid grid-cols-2 gap-12">

          {/* Freelancer Role */}
          <div className="bg-white/5 border border-white/10 
          p-8 rounded-3xl backdrop-blur-md 
          hover:scale-105 hover:border-purple-500 
          transition-all duration-500 text-left">

            <h3 className="text-2xl font-bold text-purple-400">
              Freelancer Role
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Freelancers can explore and search projects based on 
              their skills, interests, and requirements. They can apply 
              for relevant job postings, manage applications, and update 
              their professional details directly from their dashboard.
            </p>

            <ul className="mt-6 space-y-3 text-gray-400 text-sm">
              <li>✔ Search projects based on skills</li>
              <li>✔ Apply for client-posted jobs</li>
              <li>✔ Update profile & portfolio anytime</li>
              <li>✔ Track applied and viewed projects</li>
            </ul>

          </div>

          {/* Client Role */}
          <div className="bg-white/5 border border-white/10 
          p-8 rounded-3xl backdrop-blur-md 
          hover:scale-105 hover:border-blue-500 
          transition-all duration-500 text-left">

            <h3 className="text-2xl font-bold text-blue-400">
              Client Role
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Clients can post projects with detailed requirements and 
              use ML-powered search to discover skilled freelancers. 
              They can manage project listings, review applicants, 
              and connect directly with freelancers from their dashboard.
            </p>

            <ul className="mt-6 space-y-3 text-gray-400 text-sm">
              <li>✔ Post and manage projects</li>
              <li>✔ Search freelancers by skill match</li>
              <li>✔ Update job details anytime</li>
              <li>✔ Contact and hire directly</li>
            </ul>

          </div>

        </div>

        {/* Closing Statement */}
        <p className="mt-16 text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Whether you're a freelancer looking for the perfect opportunity 
          or a client searching for the right talent, our intelligent 
          ML-driven system ensures precise matching, streamlined 
          communication, and a smarter hiring experience.
        </p>

      </div>
    </div>
  );
};

export default AboutSection;
