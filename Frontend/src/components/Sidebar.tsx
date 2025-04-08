import React from "react";
import { RiGroupLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { DiMagento } from "react-icons/di";
import useAuth from "../hooks/useAuth";
import { FaBuildingLock } from "react-icons/fa6";
import SidebarIcons from "./SidebarIcons";
import { BiQrScan } from "react-icons/bi";

/**
 * Sidebar for navigation in the application.
 * It uses the url path to highlight the active page.
 * It also includes a logout button.
 */
const Sidebar = () => {
  const nav = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const handleClick = (route: string) => {
    nav(route, { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div
      className="w-20 h-screen bg-white shadow-2xl justify-between 
    flex flex-col items-center py-8"
    >
      <div className="flex flex-col gap-4 items-center">
        <DiMagento className="w-12 h-12 text-primary" />
        <div className="w-1/2 border-2 border-gray-100 my-2 rounded-full"></div>
        <SidebarIcons
          isActive={location.pathname == "/user-list"}
          onClick={() => handleClick("/user-list")}
          Icon={RiGroupLine}
        />
        <SidebarIcons
          isActive={location.pathname == "/place-list"}
          onClick={() => handleClick("/place-list")}
          Icon={FaBuildingLock}
        />
        <SidebarIcons
          isActive={location.pathname == "/allow-acess"}
          onClick={() => handleClick("/allow-acess")}
          Icon={BiQrScan}
        />
      </div>
      <MdLogout
        onClick={handleLogout}
        className="w-8 h-8 fill-primary hover:opacity-40 hover:cursor-pointer"
      />
    </div>
  );
};

export default Sidebar;
