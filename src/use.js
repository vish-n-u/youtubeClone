import React, { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count == 10) return;
    console.log(`effect ran with count=${count}`);

    return () => {
      console.log(`cleanup function ran with count=${count}`);
    };
  }, [count]);

  function handleClick() {
    setCount(count + 1);
  }
  console.log("render", count);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
      {count == 10 && <div>!0th</div>}
      {/* <iframe
        src={"https://www.youtube.com/embed/" }
        width="900"
        height="500"
        controls
      ></iframe> */}
    </div>
  );
}

export default Example;
