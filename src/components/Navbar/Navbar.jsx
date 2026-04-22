import Hamburger from "hamburger-react";
import { use, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContex } from "../../Providers/AuthContex";
import { toast } from "react-toastify";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, creatSingOut } = use(AuthContex);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [dark]);

  const navigate = useNavigate();

  const handelLogOut = () => {
    creatSingOut()
      .then(() => {
        toast.success("Successful logout");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="relative">
      {/* ===== TOP NAVBAR ===== 
        - fixed & z-50: Slider er opore thakar jonno.
        - bg-white/10 & backdrop-blur-md: Glass effect er jonno.
      */}
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300 p-4 md:px-8">

        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <div className="md:hidden text-base-content ml-2">
              <Hamburger toggled={open} toggle={setOpen} size={20} />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-800 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              Garments Hub
            </h2>
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="flex gap-8 font-semibold text-base-content tracking-wide">
            {["home", "Allporduct", "Aboutus", "contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `capitalize transition-all duration-300 hover:text-pink-400 ${isActive ? "text-pink-500 border-b-2 border-pink-500 pb-1" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-3 ">
          {/* Theme Toggle for Desktop */}
          <button
            onClick={() => setDark(!dark)}
            className="hidden md:flex p-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/20 transition-all"
          >
            {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-indigo-300" />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-white/30"
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="user profile"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-40 p-2 shadow-2xl border border-base-300">
                <li className="md:hidden">
                  <button onClick={() => setDark(!dark)} className="flex justify-between">
                    Theme {dark ? <FiSun /> : <FiMoon />}
                  </button>
                </li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <button onClick={handelLogOut} className="text-red-500 hover:bg-red-50">
                    Logout <MdLogout />
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-black">
                Login
              </Link>
              <Link to="/Singup" className="btn btn-sm bg-green-600 border-none text-white hover:bg-green-700">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ===== MOBILE MENU (FRAMER MOTION) ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-72 text-white bg-slate-900 z-50 shadow-2xl p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <div className="flex justify-between items-center mb-10">
                <img className="w-10" src="https://i.ibb.co.com/vxWfnnsR/logo-removebg-preview.png" alt="logo" />
                <button onClick={() => setOpen(false)} className="text-gray-400 italic text-sm underline">Close</button>
              </div>

              <ul className="flex flex-col gap-5 text-xl font-medium">
                {["home", "Allporduct", "Aboutus", "contact"].map((item) => (
                  <motion.li key={item} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to={`/${item}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 hover:text-green-400 capitalize transition"
                    >
                      {item}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-10 left-6">
                <button
                  onClick={() => setDark(!dark)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5"
                >
                  {dark ? <><FiSun className="text-yellow-400" /> Light Mode</> : <><FiMoon className="text-indigo-400" /> Dark Mode</>}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;