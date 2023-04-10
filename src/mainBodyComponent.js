import { useState, useEffect } from "react";
import { getYoutubeData } from "./utils/constant";
import Tags from "./Tags";
import ShimmerUi from "./ShimmerUI";
import MainVideoComponentPage from "./mainVideoComponentPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addQueryVids } from "./redux/queryVids";
import { addVids } from "./redux/allVids";

const MainBodyContent = () => {
  const [vids, setVids] = useState(useSelector((store) => store.allVids.item));
  const queryVids = useSelector((store) => store.queryVids.item);
  const [selectedTag, setSelectedTag] = useState("");

  const Dispatch = useDispatch();
  useEffect(() => {
    getData(Dispatch, selectedTag, setVids, queryVids);
  }, [selectedTag]);
  let isToggleOpen = useSelector((store) => store.toggle.isToggleOpen);
  isToggleOpen = !isToggleOpen;
  console.log("istoggleOpen", isToggleOpen);

  return (
    <div className="flex-col w-full flex justify-center align-middle items-center content-center flex-nowrap">
      {/* <Tags setSelectedTag={setSelectedTag} selectedTag={selectedTag} /> */}
      {Object.keys(vids).length == 0 ? (
        <div className=" m-4 flex flex-wrap justify-start rounded-lg">
          <ShimmerUi />
        </div>
      ) : (
        <div
          className={`lg:flex-row overflow-y-hidden  md:flex-row flex-wrap flex flex-col justify-center     relative 
           
          }`}
        >
          <MainVideoComponentPage
            vidDetails={vids}
            searchQueryCharacters={selectedTag}
          />
        </div>
      )}
    </div>
  );
};

async function getData(Dispatch, selectedTag, setVids, queryVids) {
  if (queryVids[selectedTag]) {
    setVids(queryVids[selectedTag]);
    return;
  }
  let data;
  if (selectedTag == "") {
    data = await fetch(getYoutubeData);
    const jsonData = await data.json();
    setVids(jsonData.items);
    Dispatch(addVids(jsonData.items));
  } else {
    data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${selectedTag}&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
    );
    const jsonData = await data.json();
    setVids(jsonData.items);
    jsonData.key = selectedTag;
    Dispatch(addQueryVids(jsonData));
  }
}

export default MainBodyContent;
