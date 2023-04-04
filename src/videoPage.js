import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseToggle } from "./redux/hamburgerToggle";
import { useEffect, useState } from "react";
import Comments from "./comments";
import SideBar from "./SideBar";
import SideBarVids from "./sideBarVids";

async function getData(ids) {
  console.log("reached");
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?id=${ids}&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );
  const dataJson = await data.json();
  console.log("dataJson", dataJson);
  return dataJson;
}

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
    // sideBar();
    // if (!vidDetail) {
    //   vidDetail = getData(ids);
    // }
  }, []);

  return (
    <div className="flex justify-between w-screen h-screen  flex-col lg:flex-row">
      <div className="w-full flex h-screen">
        <div className="flex flex-col w-3/5 h-screen p-2 ">
          <div className=" w-full ml-10 h-4/5 flex flex-col">
            <iframe
              className="lg:mr-10 lg:w-full lg:h-[500] md:w-full md:h-[350] w-screen"
              src={"https://www.youtube.com/embed/" + ids}
              controls
            ></iframe>

            <h1 className="mt-5 text-xl mb-2    font-bold">
              {vidDetail?.snippet?.title}
            </h1>
          </div>

          <Comments Id={ids} />
        </div>
        <div className="w-2/5  ml-10">
          <SideBarVids ids={ids} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
