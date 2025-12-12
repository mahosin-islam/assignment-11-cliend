import Hamburger from "hamburger-react";
import { use, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContex } from "../../Providers/AuthContex";
import { toast } from "react-toastify";
// import log from "../assets/Logo.png";

const Navbar = () => {
  const { user, creatSingOut } = use(AuthContex);
  const [open, setOpen] = useState(false);
  const [theme, setThem] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (check) => {
    setThem(check ? "dark" : "light");
  };
          // user loadin


  const handelToge = () => {
    setOpen(!open);
  };
  const link = (
    <>
      <NavLink to="/home">Home</NavLink>
      <h2>
        <NavLink to="/Allporduct">Allporduct</NavLink>
      </h2>
          <h2>
            <NavLink to="/Aboutus">About-us</NavLink>
          </h2>
          <h2>
            <NavLink to="/contact">Contact</NavLink>
          </h2>
    </>
  );
  const navigate =useNavigate()
  const handelLogOut = () => {
    creatSingOut()
      .then(() => {
        toast("successful logout");
        navigate('/')
      })

      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="navbar  my-2 shadow-sm ">
        <div className="navbar-start">
          <div className="flex gap-2 items-center">
            <div onClick={handelToge} className="md:hidden lg:hidden block">
              <Hamburger size={20} />
            </div>
            <div>
                
                 <img className="h-20" src="https://i.ibb.co.com/VYvhHrxF/images-2-removebg-preview.png" alt="" />
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <div className="  items-center hidden md:flex gap-3 ">{link}</div>
        </div>

        <div className="navbar-end">
          <div className="mr-10 flex gap-2 items-center">
            {user ? (
              <button onClick={handelLogOut}>Logout</button>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link to="/Singup">Singup</Link>
              </>
            )}
          </div>
          {user&&
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
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="navbar">
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle"
                  />
                </div>
              </li>
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
              <li>
                <button onClick={handelLogOut}>Logout</button>
              </li>
            </ul>
          </div>
          
          }
         
        </div>
      </div>
      <div className="md:hidden lg:hidden block ">{open && <>{link}</>}</div>
    </div>
  );
};

export default Navbar;
