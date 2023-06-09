import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSingleVid } from "./redux/allVids";
import { useEffect } from "react";
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
let handleClick = (
  vidId,
  vidDetails,
  searchQueryCharacters,
  homePageVids,
  Dispatch,
  queryVids
) => {
  // event.preventDefault();

  if (!homePageVids[vidId]) {
    Dispatch(
      addSingleVid({ [vidId]: queryVids[searchQueryCharacters][vidId] })
    );
  }
};

const MainVideoComponentPage = ({ vidDetails, searchQueryCharacters, col }) => {
  const homePageVids = useSelector((store) => store.allVids.item);
  const queryVids = useSelector((store) => store.queryVids.item);
  const Dispatch = useDispatch();
  let isToggleOpen = useSelector((store) => store.toggle.isToggleOpen);

  console.log("istoggleOpen", isToggleOpen, getWidth());
  let width = getWidth();
  // useEffect(() => {
  //   console.log("useEffect:", isToggleOpen);
  //   function fixScroll(isToggleOpen) {
  //     console.log("log----", isToggleOpen, isToggleOpen && getWidth() < 768);
  //     if (isToggleOpen && getWidth() < 768) scrollTo(0, 0);
  //   }

  //   addEventListener("scroll", () => {
  //     console.log("-----=", isToggleOpen, "=====------");
  //     fixScroll(isToggleOpen);
  //   });
  //   return () => {
  //     removeEventListener("scroll", () => {
  //       fixScroll();
  //     });
  //   };
  // }, [getWidth(), isToggleOpen]);
  // console.log(width);
  return (
    <>
      {Object.keys(vidDetails).map((vidId) => {
        return (
          <div
            key={vidDetails[vidId].id.videoId}
            className={`w-screen  ${
              col ? "lg:-mt-10" : null
            } lg:h-72 lg:w-80 lg:m-3  lg:my-5 md:m-2 md:h-52 md:w-60 my-1   ${
              isToggleOpen && getWidth() < 648 ? "opacity-30" : null
            }`}
          >
            <Link
              to={
                "/watch?v=" +
                (vidDetails[vidId].id.videoId || vidDetails[vidId].id)
              }
              onClick={() => {
                let x = vidDetails[vidId].id.videoId || vidDetails[vidId].id;

                searchQueryCharacters &&
                  handleClick(
                    x,
                    vidDetails,
                    searchQueryCharacters,
                    homePageVids,
                    Dispatch,
                    queryVids
                  );
              }}
            >
              <div
                className={
                  col
                    ? "flex flex-col  md:flex-row lg:flex-row lg:justify-start  justify-center align-middle items-center content-center  w-screen "
                    : "flex-col flex justify-center align-middle items-center"
                }
              >
                <img
                  className="lg:rounded-lg lg:w-screen lg:max-w-[300px] md:w-screen md:max-w-[220px] md:rounded-lg w-screen max-h-60 max-w-[400px] "
                  src={vidDetails[vidId].snippet.thumbnails.medium.url}
                  alt="title.jpg"
                ></img>
                <div
                  className={
                    col
                      ? "flex flex-col justify-center items-center -mt-10 md:pt-5 lg:pt-5 h-36 w-[400px] mx-2 lg:justify-start lg:items-start md:justify-start md:items-start   "
                      : "mx-3 lg:w-full md:w-full w-[400px] justify-center items-center"
                  }
                >
                  <h1 className="p-1 font-semibold mx-4">
                    {vidDetails[vidId].snippet?.localized?.title ||
                      vidDetails[vidId]?.snippet?.title}
                  </h1>
                  <h1 className="mx-4 text-green-400">
                    {!col
                      ? viewCount(vidDetails[vidId]?.statistics?.viewCount)
                      : vidDetails[vidId]?.statistics?.description}{" "}
                    {col ? "" : "views"}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

function viewCount(num) {
  switch (true) {
    case num / 1000000000 > 1:
      return (
        Math.fround(num / 1000000000)
          .toString()
          .slice(0, 4) + "b"
      );
    case num / 1000000 > 1:
      return (
        Math.fround(num / 1000000)
          .toString()
          .slice(0, 4) + "m"
      );
    case num / 1000 > 1:
      return (
        Math.fround(num / 1000)
          .toString()
          .slice(0, 5) + "k"
      );
    default:
      return num;
  }
}
export default MainVideoComponentPage;
