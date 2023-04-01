import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSingleVid } from "./redux/allVids";

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

const MainVideoComponentPage = ({ vidDetails, searchQueryCharacters }) => {
  const homePageVids = useSelector((store) => store.allVids.item);
  const queryVids = useSelector((store) => store.queryVids.item);
  const Dispatch = useDispatch();

  return (
    <>
      {Object.keys(vidDetails).map((vidId) => {
        return (
          <div
            key={vidDetails[vidId].id.videoId}
            className="w-screen   lg:h-72 lg:w-80 lg:m-3 lg:my-5 md:m-2 md:h-52 md:w-60 my-8"
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
              <img
                className="lg:rounded-lg md:rounded-lg w-screen"
                src={vidDetails[vidId].snippet.thumbnails.medium.url}
                alt="title.jpg"
              ></img>
              <h1 className="p-1 font-semibold">
                {vidDetails[vidId].snippet?.localized?.title ||
                  vidDetails[vidId]?.snippet?.title}
              </h1>
              <h1 className="ml-2">
                {viewCount(vidDetails[vidId]?.statistics?.viewCount)} views
              </h1>
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
