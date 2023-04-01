import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseToggle } from "./redux/hamburgerToggle";
import { useEffect, useState } from "react";
import Comments from "./comments";
import SideBarVids from "./sideBarVids";

const VideoPage = () => {
  const Dispatch = useDispatch();

  const [id] = useSearchParams();
  let allVids = useSelector((store) => store.allVids.item);
  const queryVids = useSelector((store) => store.queryVids.item);
  const ids = id.get("v");
  const sideBar = () => Dispatch(collapseToggle());

  console.log(allVids);
  window.scrollTo(0, 0);
  let vidDetail = allVids[ids];

  useEffect(() => {
    sideBar();
  }, []);

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col  ml-10 p-2 w-9/12">
        <iframe
          src={"https://www.youtube.com/embed/" + ids}
          width="900"
          height="500"
          controls
        ></iframe>
        <h1 className="mt-2 text-xl mb-2   font-bold">
          {vidDetail.snippet.title}
        </h1>

        <Comments Id={ids} />
      </div>
      <SideBarVids ids={ids} />
    </div>
  );
};

export default VideoPage;
