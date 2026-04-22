import React from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & About */}
     
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-800 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              Garments Hub
            </h2>
          <p className="text-sm leading-relaxed">
            Amader premium clothing collection-e paben shobcheye modern ebong comfortable dress. Quality-te amra kokhono compromise kori na.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-blue-700 transition-colors"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-white transition-colors">Shop All</a></li>
            <li><a href="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Fashion Blog</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/track" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="/return" className="hover:text-white transition-colors">Return Policy</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>Dhanmondi, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500" />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500" />
              <span>support@yourbrand.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2 text-gray-500">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;