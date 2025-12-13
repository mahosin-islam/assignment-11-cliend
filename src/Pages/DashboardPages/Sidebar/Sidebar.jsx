import React, { use } from "react";
import { TbLayoutNavbarExpand } from "react-icons/tb";
import { Link, Outlet } from "react-router";
import { AuthContex } from "../../../Providers/AuthContex";
import { IoHomeOutline } from "react-icons/io5";
import { LuMapPin, LuSettings } from "react-icons/lu";
import { BsHouseAdd } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { BsFingerprint } from "react-icons/bs";
import { TfiShoppingCart } from "react-icons/tfi";
import useRole from "../../../Hooks/useRole";
import Footer from "../../../components/Footer/Footer";
import { MdManageHistory, MdPendingActions } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaCartPlus, FaMapMarkerAlt, FaUserShield, FaUserTag } from "react-icons/fa";

const Sidebar = () => {
  const { user } = use(AuthContex);
  const { role } = useRole();

  return (
    <div>
      <div className="drawer lg:drawer-open ">
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
            <ul className="menu w-full grow text-[20px] text-gray-600 font-semibold">
              <li>
                <Link to="/">
                  <div className="w-10  rounded-full">
                    home 
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                  data-tip="Dahsbord"
                >
                  <span>
                    <IoMdHome />
                  </span>

                  <span className="is-drawer-close:hidden ml-2">Dahboard</span>
                </Link>
              </li>

              {/* buyer-role-page */}
              {role == "buyer" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/My-order"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                      data-tip="My-order"
                    >
                      <span>
                        <FaCartPlus />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        My-order
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/Track-Order"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                      data-tip="Track-Order"
                    >
                      <span>
                       <FaMapMarkerAlt />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        Track-Order
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {/* admin-rol-page */}
              {role == "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/manage-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="manage-users"
                    >
                      <span>
                        <FaUserGear />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        manage-users
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/all-products"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="all-products"
                    >
                      <span>
                        <TfiShoppingCart />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        All-products
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/all-orders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="all-orders"
                    >
                      <span>
                       <FaMapMarkerAlt />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        All-orders
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* manager-rol-page */}
              {role === "manager" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/Manage-Products"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Products"
                    >
                      <span>
                        <MdManageHistory />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        Manag-Products
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/Add-product"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Add-product"
                    >
                      <span>
                        <BsHouseAdd />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        Add-product
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Pending-Orders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Pending-Orders"
                    >
                      <span>
                     <FaUserTag />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        Pending-Orders
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/Approve-Orders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approve-Orders"
                    >
                      <span>
                       <FaUserShield />
                      </span>

                      <span className="is-drawer-close:hidden ml-2">
                        Approve-Orders
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* my-profile-page */}
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
      <div className="footer-section">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Sidebar;
