import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAboutSection = () => {
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    navigate("/", { state: { scrollTo: "about" } });
  };

  return (
    <footer className="relative bg-black text-white px-24 py-16 border-t border-white/10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-11">

        {/* Left Side - Logo */}
        <div className="flex flex-col space-y-6 md:w-1/3">

          {/* Logo Placeholder */}
          <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            <img src="/logo.png" alt="Logo" className="w-44" />
          </div>

          <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
            FreelanceFusion is an ML-powered freelance marketplace where clients post projects
            and freelancers discover work matched to their skills.
          </p>
        </div>

        {/* Right Side - Links & Social */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:w-2/3">

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="hover:text-white transition cursor-pointer" onClick={goToAboutSection}>About</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/freelancer/find-projects")}>Find Works</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/freelancer/find-freelancer")}>Hire Freelancers</li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">
              Dashboards
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/client-dashboard")}>Client Dashboard</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/freelancer-dashboard")}>Freelancer Dashboard</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/client-dashboard/post-project")}>Post Project</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => navigate("/freelancer/apply")}>Freelancer Profile</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">
              Follow Us
            </h4>
            <div className="flex space-x-4">

              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-purple-600 transition cursor-pointer">
                <FaFacebookF />
              </a>

              <a href="https://x.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-blue-500 transition cursor-pointer">
                <FaTwitter />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                <FaLinkedinIn />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-pink-500 transition cursor-pointer">
                <FaInstagram />
              </a>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FreelanceFusion. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
