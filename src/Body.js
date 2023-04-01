import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import MainContent from "./mainBodyComponent";

const Body = () => {
  return (
    <div className="flex justify-start border-gray-200 w-full z-0 mt-10 ml-0">
      <SideBar />
      <Outlet />
    </div>
  );
};
export default Body;
