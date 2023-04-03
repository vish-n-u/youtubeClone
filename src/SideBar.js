import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { collapseToggle } from "./redux/hamburgerToggle";

const SideBar = () => {
  const sideBarRef = useRef();
  const Dispatch = useDispatch();
  const isToggleOpen = useSelector((store) => store.toggle.isToggleOpen);
  useEffect(() => {
    console.log("yup getting called....");
    let handler = (e) => {
      // if (window.innerWidth > 766) return;
      if (!isToggleOpen) return;
      if (sideBarRef.current == null) return;
      setTimeout(() => {
        console.log("mouseDown handler is called");
        if (!sideBarRef?.current?.contains(e.target))
          Dispatch(collapseToggle());
      }, 200);
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <>
      {isToggleOpen && (
        // changed div , new div added

        <div
          ref={sideBarRef}
          className="  overflow-auto fixed lg:relative md:relative  container bg-white h-screen w-3/5 scrollbar z-50 rounded-lg md:w-2/5 lg:w-1/5 "
        >
          <div className="flex flex-col border-b-2 items-center    border-gray-200  p-4 m-5 ">
            <Link to="/">
              <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
                Home
              </span>
            </Link>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Shorts
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Subscription
            </span>
          </div>
          <div className="flex flex-col border-b-2  border-gray-200 row-start-4 row-end-6 items-center  p-4 m-5">
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Library
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              History
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Your videos
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Watch later
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Mix
            </span>
          </div>
          <div className="flex flex-col border-b-2  items-center row-start-7 row-end-12 border-gray-200  p-4 m-5">
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Akshay Saini
            </span>
            <span className="font-semibold  text-base p-2  w-full justify-center overflow-hidden  flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Avatar: The Last...
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              ESPN FC
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              ESPN UK
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Tifo Football
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Pitch Meeting
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Saturday Night Live
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              Raymar Football
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              The Dodo
            </span>
            <span className="font-semibold text-base p-2 w-full justify-center   flex  hover:bg-slate-200 hover:rounded-lg hover:w-full hover:items-center">
              The Viral Fever
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
