import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const SideBarVids = ({ ids }) => {
  const allVids = useSelector((store) => store.allVids.item);

  return (
    <div className=" m-4 w-10/12  ">
      {Object.keys(allVids).map((vid) => {
        if (vid == ids) return;
        return (
          <Link to={"/watch?v=" + vid}>
            <div key={vid} className="  m-2 mt-5  flex">
              <img
                className="rounded-lg h-20 w-32 "
                src={allVids[vid].snippet.thumbnails.medium.url}
                alt="title.jpg"
              ></img>
              <div className="flex flex-col ml-2">
                <span className="p-1 font-medium text-sm overflow-y-clip h-12">
                  {allVids[vid].snippet.localized.title}
                </span>
                <span className="">
                  {viewCount(allVids[vid].statistics.viewCount)} views
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
