import React, { use } from "react";
import { TbLayoutNavbarExpand } from "react-icons/tb";
import { Link, Outlet } from "react-router";
import { AuthContex } from "../../../Providers/AuthContex";
import { IoHomeOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const { user } = use(AuthContex);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300  flex justify-between">
          <div>
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <TbLayoutNavbarExpand />
            </label>
          </div>
          <div className="w-15  rounded-full">
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Tailwind CSS Navbar component"
            />
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className=" drawer-side is-drawer-close:overflow-visible ">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-60">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
          

            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                <span>
                 <IoHomeOutline />
                </span>

                <span className="is-drawer-close:hidden ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/Myprofile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Myprofile"
              >
                <span>
                  <LuSettings />
                </span>

                <span className="is-drawer-close:hidden ml-2">Myprofile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
