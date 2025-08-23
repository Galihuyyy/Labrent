import { NavLink } from "react-router-dom"

const SidebarLink = ({ icon, children, to }) => {
  return (
	<NavLink to={to} className={({ isActive }) => `w-full hover:!ps-6 duration-300 ease-in-out flex items-center gap-x-2 ps-3 text-sm rounded py-2.5 !no-underline ${ isActive ? "bg-indigo-500 text-white shadow-md shadow-indigo-300" : "bg-transparent !text-gray-600"}`} > {icon} <span>{children}</span> </NavLink>
  )
}

export default SidebarLink