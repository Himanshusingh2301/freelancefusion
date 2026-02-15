import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white px-24 py-16 border-t border-white/10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-11">

        {/* Left Side - Logo */}
        <div className="flex flex-col space-y-6 md:w-1/3">

          {/* Logo Placeholder */}
          <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            <img src="/logo.png" alt="Logo" className="w-44" />
          </div>

        
        </div>

        {/* Right Side - Links & Social */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:w-2/3">

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition">Home</li>
              <li className="hover:text-white transition">About</li>
              <li className="hover:text-white transition">Freelancers</li>
              <li className="hover:text-white transition">Clients</li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">
              Menu
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition">Post a Project</li>
              <li className="hover:text-white transition">Find Talent</li>
              <li className="hover:text-white transition">Dashboard</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">
              Follow Us
            </h4>
            <div className="flex space-x-4">

              <div className="p-3 bg-white/5 rounded-lg hover:bg-purple-600 transition cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="p-3 bg-white/5 rounded-lg hover:bg-blue-500 transition cursor-pointer">
                <FaTwitter />
              </div>

              <div className="p-3 bg-white/5 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                <FaLinkedinIn />
              </div>

              <div className="p-3 bg-white/5 rounded-lg hover:bg-pink-500 transition cursor-pointer">
                <FaInstagram />
              </div>

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
