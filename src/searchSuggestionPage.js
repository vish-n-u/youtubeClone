import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShimmerUi from "./ShimmerUI";
import MainVideoComponentPage from "./mainVideoComponentPage";
import { addQueryVids } from "./redux/queryVids";

const SearchPage1 = () => {
  const vids = useSelector((store) => store.queryVids.item);

  const [id] = useSearchParams();
  const ids = id.get("q");
  console.log("SearchSuggestionPageIds", ids);

  const Dispatch = useDispatch();
  useEffect(() => {
    if (vids[ids]) return;
    getData(Dispatch, ids);
  }, [ids]);
  return (
    <div className="flex-col w-full z-10">
      {!vids[ids] || Object.keys(vids[ids]).length == 0 ? (
        <ShimmerUi />
      ) : (
        <div className="flex flex-col mx-4 align-middle flex-wrap">
          <MainVideoComponentPage
            vidDetails={vids[ids]}
            searchQueryCharacters={ids}
          />
        </div>
      )}
    </div>
  );
};

async function getData(Dispatch, ids) {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${ids}&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );

  const jsonData = await data.json();

  jsonData.key = ids;
  Dispatch(addQueryVids(jsonData));
}

export default SearchPage1;
