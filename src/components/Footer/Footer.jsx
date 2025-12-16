import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import { FiPhoneCall } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content ">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <div className="flex gap-2 justify-items-center">
            <img
              src="https://i.ibb.co.com/vxWfnnsR/logo-removebg-preview.png"
              alt=""
            />
            <span className="text-2xl font-bold mt-2">Company</span>
          </div>

          <p className="text-lg text-gray-400 my-5">
            Building innovative solutions for the modern world.
          </p>

          <div className="flex gap-3 ">
            <a className="btn  btn-circle btn-sm  bg-neutral hover:bg-[#1877f2] border-none text-white bg-gray-400">
              <FaFacebookF />
            </a>
            <a className="btn btn-circle btn-sm bg-neutral hover:bg-[#1da1f2] border-none text-white">
              <FaXTwitter />
            </a>
            <a className="btn btn-circle btn-sm bg-neutral hover:bg-[#0a66c2] border-none text-white">
              <FaLinkedinIn />
            </a>
            <a className="btn btn-circle btn-sm bg-neutral hover:bg-gradient-to-r hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] border-none text-white">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-lg">
            <Link to="/Home">
              <li className="hover:text-primary cursor-pointer">Home</li>
            </Link>
            <Link to="/Aboutus">
              <li className="hover:text-primary cursor-pointer">About Us</li>
            </Link>
            <Link to="/contact">
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </Link>

            <Link to="/Allporduct">
              <li className="hover:text-primary cursor-pointer">Allporduct</li>
            </Link>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <ul className="space-y-2 text-sm">
            <li>Admin managment</li>
             <li>Sell prodcut</li>
            <li>Addprodct</li>
            <li>Manager</li>
            <li>Buyer</li>
           
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-sm opacity-80">123 Dhaka gulsan</p>
          <p className="text-sm opacity-80">San Francisco, CA</p>
          <p className="text-sm opacity-80">mahosin@gmail.com</p>
          <p className="text-sm opacity-80">Phone: +1 (123) 456-7890</p>
          <div className="text-2xl flex gap-3 mt-3">
            <MdEmail />
         <FiPhoneCall />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-base-content/10 py-4 text-center text-sm opacity-70">
        © 2025 Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
