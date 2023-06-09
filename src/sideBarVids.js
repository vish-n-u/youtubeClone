import { Link } from "react-router-dom";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addQueryVids } from "./redux/queryVids";
import { addVids } from "./redux/allVids";
async function getData(Dispatch, setAllVids) {
  console.log("Allvids getData");
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );
  const jsonData = await data.json();
  console.log("jsonData:---", jsonData);

  setAllVids(jsonData.items);
  Dispatch(addVids(jsonData.items));
}

const SideBarVids = ({ ids }) => {
  let [allVids, setAllVids] = useState(
    useSelector((store) => store.allVids.item)
  );

  const Dispatch = useDispatch();
  useEffect(() => {
    console.log("-----", Object.keys(allVids).length);
    if (Object.keys(allVids).length == 0) {
      getData(Dispatch, setAllVids);
    }
  }, []);
  console.log("allVids==", allVids);

  return (
    <div className="w-screen lg:w-full md:w-full  ">
      {Object.keys(allVids).map((vid) => {
        if (vid == ids) return;
        return (
          <Link to={"/watch?v=" + vid}>
            <div
              key={vid}
              className=" mt-5 lg:ml-5 md:ml-5  md:overflow-x-auto flex-col   md:flex-row lg:flex-row flex"
            >
              <img
                className="rounded-lg lg:h-20 lg:w-32 md:h-20 md:w-32 w-screen "
                src={allVids[vid]?.snippet.thumbnails.medium.url}
                alt="title.jpg"
              ></img>
              <div className="flex flex-col ml-2">
                <span className="p-1 font-medium text-sm md:overflow-y-clip h-12">
                  {allVids[vid]?.snippet?.localized?.title ||
                    allVids[vid]?.snippet?.title}
                </span>
                <span className="">
                  {viewCount(allVids[vid]?.statistics?.viewCount)} views
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
