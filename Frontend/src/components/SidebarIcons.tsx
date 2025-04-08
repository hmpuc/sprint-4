import React from "react";

export interface SidebarIconsProps {
  isActive: boolean;
  onClick: () => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * Component used to display an icon in the sidebar
 * with a hover effect and a click event.
 * It changes the background color when active.
 * @param isActive
 * @param onClick
 * @param Icon
 */
const SidebarIcons: React.FC<SidebarIconsProps> = ({
  isActive,
  onClick,
  Icon,
}) => {
  return (
    <div
      onClick={isActive ? undefined : onClick}
      className={`rounded-xl drop-shadow-lg border-gray-100 border-2 
        hover:scale-110 min-w-12 min-h-12 flex 
          justify-center items-center transition-all hover:cursor-pointer 
          ${isActive ? "bg-primary" : "bg-white"}`}
    >
      <Icon className={`w-6 h-6 ${isActive ? "fill-white" : "fill-primary"}`} />
    </div>
  );
};

export default SidebarIcons;
