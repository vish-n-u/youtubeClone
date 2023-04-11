import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseToggle } from "./redux/hamburgerToggle";
import { useEffect, useState } from "react";
import Comments from "./comments";
import SideBar from "./SideBar";
import SideBarVids from "./sideBarVids";
import { getWidth } from "./utils/constant";

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
  const [isCommentsOn, setIsCommentsOn] = useState(false);
  const [isSeuggestionsOn, setIsSuggestionsOn] = useState(false);
  const Dispatch = useDispatch();

  const [id] = useSearchParams();
  let allVids = useSelector((store) => store.allVids.item);
  //const queryVids = useSelector((store) => store.queryVids.item);
  const ids = id.get("v");
  const sideBar = () => Dispatch(collapseToggle());

  console.log(allVids);
  window.scrollTo(0, 0);
  let vidDetail = allVids[ids];

  useEffect(() => {
    sideBar();
    // if (!vidDetail) {
    //   vidDetail = getData(ids);
    // }
  }, []);

  return (
    <div className="flex justify-between w-screen h-screen  flex-col lg:flex-row">
      <div className="w-full flex lg:flex-row md:flex-row flex-col h-screen">
        <div className="flex flex-col w-3/5  md:p-2 lg:p-2 ">
          <div className=" w-full lg:ml-10 md:ml-10  flex flex-col ">
            <iframe
              className="lg:mr-10 lg:w-full md:aspect-video lg:aspect-video  m-0 md:w-full aspect-video  w-screen"
              src={"https://www.youtube.com/embed/" + ids}
              controls
            ></iframe>

            <h1 className="mt-5 sm text-xl mb-2 w-screen md:w-full lg:w-full   font-bold">
              {vidDetail?.snippet?.title}
            </h1>
          </div>
          {getWidth() < 640 ? (
            isCommentsOn ? (
              <button
                className="flex font-bold justify-center  w-screen"
                onClick={() => {
                  setIsCommentsOn(false);
                }}
              >
                hide comments
              </button>
            ) : (
              <button
                className="flex font-bold justify-center  w-screen"
                onClick={() => {
                  setIsCommentsOn(true);
                }}
              >
                show comments
              </button>
            )
          ) : null}

          {getWidth() > 640 ? (
            <Comments Id={ids} />
          ) : isCommentsOn ? (
            <Comments Id={ids} />
          ) : (
            ""
          )}
        </div>

        <div className="w-2/5     lg:ml-10 md:ml-10">
          {getWidth() < 640 ? (
            isSeuggestionsOn ? (
              <button
                className="flex justify-center mt-10 font-bold w-screen"
                onClick={() => {
                  setIsSuggestionsOn(false);
                }}
              >
                hide suggestions
              </button>
            ) : (
              <button
                className="flex justify-center  w-screen font-bold mt-5"
                onClick={() => {
                  setIsSuggestionsOn(true);
                }}
              >
                show suggestions
              </button>
            )
          ) : null}

          {getWidth() > 640 ? (
            <SideBarVids ids={ids} />
          ) : isSeuggestionsOn ? (
            <SideBarVids ids={ids} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
