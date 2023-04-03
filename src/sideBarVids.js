import { Link } from "react-router-dom";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addQueryVids } from "./redux/queryVids";
async function getData(Dispatch) {
  console.log("Allvids getData");
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );
  const jsonData = await data.json();

  Dispatch(addQueryVids(jsonData));
  return jsonData;
}

const SideBarVids = ({ ids }) => {
  let allVids = useSelector((store) => store.allVids.item);
  const Dispatch = useDispatch();
  useEffect(() => {
    allVids = getData(Dispatch);
  }, []);
  console.log("allVids==", allVids);

  return (
    <div className=" m-4 w-5/12  ">
      {Object.keys(allVids).map((vid) => {
        if (vid == ids) return;
        return (
          <Link to={"/watch?v=" + vid}>
            <div key={vid} className="  m-2 mt-5  flex">
              <img
                className="rounded-lg h-20 w-32 "
                src={allVids[vid]?.snippet.thumbnails.medium.url}
                alt="title.jpg"
              ></img>
              <div className="flex flex-col ml-2">
                <span className="p-1 font-medium text-sm overflow-y-clip h-12">
                  {allVids[vid]?.snippet.localized.title}
                </span>
                <span className="">
                  {viewCount(allVids[vid]?.statistics.viewCount)} views
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
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
export default SideBarVids;
