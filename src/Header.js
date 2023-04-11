import { useDispatch, useSelector } from "react-redux";
import { changeToggleState } from "./redux/hamburgerToggle";
import { addData } from "./redux/searchCache";

import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

async function getData(searchQuery, Dispatch, searchSuggestion) {
  if (searchSuggestion.obj.lruObj[searchQuery]) {
    console.log("returned from searching");
    return;
  }
  try {
    const data = await fetch(
      "https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=" +
        searchQuery
    );

    const textData = await data.text();
    console.log("---++--", textData);
    let searchSuggestions = [];
    textData.split("[").forEach((ele, index) => {
      if (!ele.split('"')[1] || index === 1) return;
      return searchSuggestions.push(ele.split('"')[1]);
    });

    searchSuggestions = searchSuggestions.splice(0, 9);
    console.log(searchSuggestions);

    Dispatch(addData({ [searchQuery]: searchSuggestions }));
  } catch (err) {
    console.log(err);
    return;
  }
}

const Header = () => {
  const Dispatch = useDispatch();
  const changeToggle = () => Dispatch(changeToggleState());
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputTagFocused, setInputTagIsFocused] = useState(false);
  const searchSuggestion = useSelector((store) => store.searchCache);
  const toggleState = useSelector((store) => store.toggle);
  const navigate = useNavigate();
  console.log(toggleState);

  function handleKey(event, data) {
    // If the user presses the "Enter" key on the keyboard
    console.log("reached", data, event, event.key);
    if (event.key === "Enter") {
      navigate("/search?q=" + event.target.value);
      setInputTagIsFocused(false);
    }
  }

  useEffect(() => {
    if (searchQuery.length == 0) return;
    const timer = setTimeout(() => {
      getData(searchQuery, Dispatch, searchSuggestion);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  useEffect(() => {});
  console.log("header function called");
  return (
    <div className="h-24 w-screen flex flex-row justify-between items-center top-0 sticky z-30 bg-slate-50 shadow-lg">
      <button
        className="m-2  lg:ml-10  lg:-mr-8 p-2 pl-2 h-10 w-10 cursor-pointer hover:bg-slate-300 hover:rounded-full"
        onClick={() => {
          console.log("toggle click", toggleState);
          changeToggle();
        }}
      >
        <img
          className=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAPFBMVEX///8AAADPz8/f39/T09Pv7++5ubn09PQ3NzeBgYHX19dxcXEODg6YmJh0dHQ8PDzJyclZWVkvLy+Hh4dzYEMPAAABHElEQVR4nO3aWQ6DMAyEYQxlX7rd/64tlfpk4K3DVPq/E4yEieMkRQEAAAAAUvVQCgz1QYRq7KYQmLqx2sswKwJ8zdsZFmWGiGUrQ6PNENHkDO1VHeLaphA3dYaIWwrR60P0KcRdH+LuGeKpD/H0LMz2oc7wyL+oxWIlr4pcER8ODezdymUrVr/byld1JXC0pwEAAH+vuggc7miGUXJGEjGNw14Ghz2meCTO43DhMXe0nTpElyewUp0hojy7IlYckuyHsPgcFoVp8YtaLFYey7ZHA/No5avzNzUAAODfnX/p4nD95LDHdLiSdJg7LK6pLS7sT5jKc1VYnE9YhLA4JLEoTIvHXhaLlccDQI8G5vEotLB4HgsAAAAAP/ACOSEhx/zSpj4AAAAASUVORK5CYII="
          alt="menu"
        ></img>
      </button>
      <a href="/">
        <img
          className="m-2   p-2  h-[70px] "
          src="https://th.bing.com/th/id/OIP._IfEaUssjZQwZ1u92b1_GgHaEK?w=329&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="logo"
        ></img>
      </a>
      <div className=" justify-center mr-5 w-9/12 flex">
        <input
          id="searchBar"
          className="  border-5 pl-7 h-10 rounded-l-full border-gray-700 w-7/12"
          value={searchQuery}
          onFocus={() => {
            setInputTagIsFocused(true);
          }}
          onChange={(e) => {
            let data = e.target.value;
            setSearchQuery(data);
            setInputTagIsFocused(true);
          }}
          onKeyDown={handleKey}
        ></input>
        {searchQuery && <Link to={`/search?q=${searchQuery}`}></Link>}
        <span
          onClick={() => {
            setInputTagIsFocused(false);
          }}
          className="bg-slate-200 flex items-center align-middle justify-center md:px-4 lg:px-5 p-1 pr-3 rounded-r-full hover:cursor-pointer"
        >
          <Link to={"/search?q=" + searchQuery}>
            <h1>🔍</h1>
          </Link>
        </span>

        {searchQuery.length > 0 && isInputTagFocused && (
          <div className="flex  flex-col justify-center lg:w-[43%] md:w-[43%] w-screen rounded-lg shadow-xl mr-14 mt-12 fixed bg-white">
            {searchSuggestion.obj.lruObj?.[searchQuery]?.data?.[
              searchQuery
            ]?.map((item) => {
              return (
                <Link to={"/search?q=" + item}>
                  <h1
                    className="p-1 m-1 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(item);
                      setInputTagIsFocused(false);
                    }}
                  >
                    {item}
                  </h1>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <img
        className=" h-[20px] w-[20px] mr-5"
        src="data:image/jpeg;base64,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"
        alt="userIcon"
      ></img>
    </div>
  );
};

export default Header;
