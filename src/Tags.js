import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchPage1 from "./searchSuggestionPage";

const Tags = ({ setSelectedTag, selectedTag }) => {
  let arr = [
    "Leo Messi",
    "Sparta",
    "tags",
    "Childrens cartoon",
    "Cr7",
    "Career ",
    "Tifo",
    "Leo Messi",
    "Sparta",
    "tags",
    "Childrens cartoon",
    "Cr7",
    "Career ",
    "Tifo",
  ];

  return (
    <div
      id="tags"
      className="flex  w-full invisible md:invisible lg:visible  h-14 m-2 p-2 "
    >
      {arr.map((content) => {
        return (
          <span
            className={
              "flex items-center pr-3 pl-3 pt-4 pb-4 m-2 w-auto  text-sm font-normal hover:opacity-80 bg-blue-100 rounded-lg cursor-pointer " +
              (selectedTag == content ? "bg-black text-white" : "")
            }
            onClick={() => {
              setSelectedTag(content);
            }}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
};
export default Tags;
