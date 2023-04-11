import { useState, useEffect, useLayoutEffect } from "react";

async function getComments(ids, setComment) {
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${ids}&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );
  let jsonData = await data.json();

  setComment(jsonData.items);
}
const Comments = ({ Id }) => {
  const [comments, setComments] = useState([]);
  const [showAllNestedComments, setShowAllNestedComments] = useState({});
  const [isNestedCommentsOpen, setIsNestedCommentsOpen] = useState({});
  const [id, setIds] = useState(Id);

  console.log("typeof", typeof comments);
  if (id != Id) setIds(Id);

  useEffect(() => {
    console.log("entered useEffect");
    getComments(id, setComments);
  }, [id]);

  return comments?.length == 0 ? null : comments?.length == undefined ? (
    <div className="flex text-lg font-semibold lg:visible md:visible justify-center md:mt-3 mt-1 lg:mt-5">
      Disabled comments
    </div>
  ) : (
    <div className="mt-3 mb-4    ">
      <h1 className="font-semibold text-xl mb-9 ml-2">Comments</h1>
      <div className="flex flex-col lg:ml-8 md:ml-8 m-0 lg:w-full md:w-full w-screen ">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="mb-4 ml-4">
              <div className="flex">
                <img
                  className="h-7 w-7 rounded-full mt-3 m-0 md:m-1 lg:m-1"
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt="userIcon"
                ></img>
                <h1 className="p-2 md:m-1 lg:m-1 m-0 font-medium">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </h1>
              </div>
              <h1 className="lg:p-1 md:p-1 p-0 mx-2 ml-7  text-sm">
                {comment.snippet.topLevelComment.snippet.textOriginal}
              </h1>
              <div className="flex ml-9 -mt-1">
                <div className="flex  ">
                  <span className=" hover:bg-gray-200 flex justify centre items-center hover:rounded-full px-2 py-2">
                    👍
                  </span>
                  <span className="p-2 my-2">
                    {comment.snippet.topLevelComment.snippet.likeCount}
                  </span>
                </div>
                <span className="ml-5 flex justify centre items-center hover:bg-gray-200 hover:rounded-full lg:px-3 md:px-3 p-1">
                  👎
                </span>
                <span className="ml-5 my-2 font-semibold hover:bg-gray-200 hover:rounded-full py-2 px-4 ">
                  reply
                </span>
              </div>

              {comment.snippet.totalReplyCount > 0 ? (
                !isNestedCommentsOpen[comment.id] ? (
                  <button
                    onClick={async () => {
                      if (showAllNestedComments[comment.id] != undefined) {
                        let open = isNestedCommentsOpen;
                        open[comment.id] = true;
                        setIsNestedCommentsOpen({ ...open });
                        return;
                      }
                      getInnerComments(
                        comment,
                        showAllNestedComments,
                        setShowAllNestedComments,
                        setIsNestedCommentsOpen,
                        isNestedCommentsOpen
                      );
                      console.log("dones123");
                    }}
                    className="ml-10 py-2 px-5 hover:bg-blue-200 hover:rounded-3xl w-max"
                  >
                    {"⬇️     " + comment.snippet.totalReplyCount + " replies"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      console.log("isNestedOpen", isNestedCommentsOpen);
                      let open = isNestedCommentsOpen;
                      open[comment.id] = false;
                      setIsNestedCommentsOpen({ ...open });
                    }}
                    className="ml-10 py-2 px-5 hover:bg-blue-200 hover:rounded-3xl w-max"
                  >
                    {"⬆️     " + comment.snippet.totalReplyCount + " replies"}
                  </button>
                )
              ) : null}

              {showAllNestedComments[comment.id] == undefined ||
              isNestedCommentsOpen[comment.id] == false ? null : (
                <div className="flex flex-col lg:ml-16 md:ml-16 ">
                  {showAllNestedComments[comment.id].items.map(
                    (innerComment) => {
                      return (
                        <div
                          key={innerComment.id}
                          className=" flex-col mt-2 mb-2"
                        >
                          {console.log(innerComment.id)}
                          <div className="flex flex-row">
                            <img
                              src={innerComment.snippet.authorProfileImageUrl}
                              className="h-5 w-5 rounded-full lg:mr-3 md:mr-3"
                              alt="userImg"
                            ></img>
                            <span className="font-medium">
                              {innerComment.snippet.authorDisplayName}
                            </span>
                          </div>
                          <h1 className="p-2">
                            {innerComment.snippet.textOriginal}
                          </h1>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

async function getInnerComments(
  comment,
  showAllComments,
  setShowAllComments,
  setIsNestedCommentsOpen,
  isNestedCommentsOpen
) {
  if (showAllComments[comment.id] != undefined) return;
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=${comment.id}&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs`
  );
  const jsonData = await data.json();

  let object = showAllComments;
  object[comment.id] = jsonData;
  setShowAllComments(object);
  let obj = isNestedCommentsOpen;
  obj[comment.id] = true;
  setIsNestedCommentsOpen({ ...obj });
}

export default Comments;
