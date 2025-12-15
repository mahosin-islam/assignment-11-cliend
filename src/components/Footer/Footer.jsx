import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {
  return (
    <div className="myt-5">
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
        <nav>
          <a href="/" className="footer-title text-2xl border-b-2 ">
            Garmants-trackar
          </a>
          <p>
            The Garments Order & <br />
            Production Tracker System
          </p>
          <div className="flex gap-3 text-2xl p-1 rounded-full">
            <span>
              <FaFacebook />
            </span>
            <span>
              <FaXTwitter />
            </span>
            <span>
              <FaInstagram />
            </span>
            <span>
              <AiOutlineYoutube />
            </span>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title border-b-2">Company</h6>

          <a href="/Aboutus" className="link link-hover">
            About us
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a href="/Allporduct" className="link link-hover">
            all-product
          </a>
        </nav>
        <nav>
          <h6 className="footer-title pb-3 border-b-2">Our Contact</h6>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <span>
              <span className="flex gap-5 ">
                {" "}
                <FiPhoneCall />
                <MdOutlineEmail />
              </span>

              <span> 7.30AP - 8PM</span>
            </span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
