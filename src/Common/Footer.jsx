import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1E43] text-white px-6 py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Logo */}
        <div className="md:col-span-1">
          <div className="text-xl font-bold mb-4">
            <span >8Bross</span>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-base font-semibold mb-2">About Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className={linkClass}>Company Overview</a></li>
            <li><a href="#" className={linkClass}>Our Mission & Values</a></li>
            <li><a href="#" className={linkClass}>Careers</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-base font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1">
            <li><a href="#" className={linkClass}>Contact Us</a></li>
            <li><a href="#" className={linkClass}>FAQs</a></li>
            <li><a href="#" className={linkClass}>Live Chat</a></li>

          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-base font-semibold mb-2">Explore</h3>
          <ul className="space-y-1">
            <li><a href="#" className={linkClass}>Destinations</a></li>
            <li><a href="#" className={linkClass}>Special Offers</a></li>
            <li><a href="#" className={linkClass}>Last-Minute Deals</a></li>
     
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className={linkClass}>Privacy Policy</a></li>
            <li><a href="#" className={linkClass}>Terms & Conditions</a></li>
      
          </ul>
        </div>

        {/* Membership */}
       
      </div>

      <hr className="my-5.5 border-white/20" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-4">
        <div>© 2025 Công ty TNHH 8Bross</div>
        <div className="flex gap-4 text-white text-lg">
          <a href="#" aria-label="Twitter" className={iconClass}><FaTwitter /></a>
          <a href="#" aria-label="LinkedIn" className={iconClass}><FaLinkedinIn /></a>
          <a href="#" aria-label="WhatsApp" className={iconClass}><FaWhatsapp /></a>
          <a href="#" aria-label="Facebook" className={iconClass}><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
};

const linkClass = "hover:underline hover:text-indigo-400 block";
const iconClass = "hover:text-indigo-400 transition-colors";

export default Footer;
