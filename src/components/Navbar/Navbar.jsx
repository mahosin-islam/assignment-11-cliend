import Hamburger from "hamburger-react";
import { use, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContex } from "../../Providers/AuthContex";
import { toast } from "react-toastify";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, creatSingOut } = use(AuthContex);
  const [open, setOpen] = useState(false);
  // const [theme, setThem] = useState(localStorage.getItem("theme") || "light");
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);
  // const handleTheme = (check) => {
  //   setThem(check ? "dark" : "light");
  // };
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
      {/* ===== TOP NAVBAR ===== */}
      <div className="navbar fixed top-0 left-0 z-50 w-full     bg-[#0f172a] shadow-sm">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <div className="md:hidden text-white">
              <Hamburger toggled={open} toggle={setOpen} size={20} />
            </div>
            <img
              className="w-12"
              src="https://i.ibb.co.com/vxWfnnsR/logo-removebg-preview.png"
              alt="logo"
            />
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="flex gap-6 font-medium text-white">
            {["home", "Allporduct", "Aboutus", "contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item}`}
                  className="hover:text-green-500 transition"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2 mr-6">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10  rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Tailwind CSS Navbar component"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <button
                    onClick={() => setDark(!dark)}
                    className="p-1 rounded-full w-15 border bg-base-200 hover:bg-base-300 transition-all duration-300"
                    aria-label="Toggle Theme"
                  >
                    {dark ? (
                      <FiSun className="h-6 w-6 text-yellow-400 rotate-0 transition-transform duration-300" />
                    ) : (
                      <FiMoon className="h-6 w-6 text-indigo-500 rotate-0 transition-transform duration-300" />
                    )}
                  </button>
                </li>

                <li>
                  <Link to="/dashboard">dashboard</Link>
                </li>
                <li>
                  <button onClick={handelLogOut} className="btn btn-sm">
                    Logout <MdLogout />
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm">
                Login
              </Link>
              <Link to="/Singup" className="btn btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ===== MOBILE MENU (FRAMER MOTION) ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed  inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-72 text-white 
              bg-[#0f172a] md:hidden
              z-50 shadow-lg p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <ul className="flex flex-col gap-3 mt-10 text-lg font-medium">
                {["home", "Allporduct", "Aboutus", "contact"].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setOpen(false)}
                  >
                    <NavLink
                      to={`/${item}`}
                      className="block px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                    >
                      {item}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {user && (
                <div className="mt-6">
                  <button
                    onClick={() => setDark(!dark)}
                    className="p-1 rounded-full w-15 border bg-base-200 hover:bg-base-300 transition-all duration-300"
                    aria-label="Toggle Theme"
                  >
                    {dark ? (
                      <FiSun className="h-6 w-6 text-yellow-400 rotate-0 transition-transform duration-300" />
                    ) : (
                      <FiMoon className="h-6 w-6 text-indigo-500 rotate-0 transition-transform duration-300" />
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
