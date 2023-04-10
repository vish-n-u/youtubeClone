const ShimmerUi = () => {
  console.log("TEn--");
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 10, 9];
  return arr.map((x, index) => {
    return (
      <>
        <div
          key={x}
          className="h-48 w-80 m-2 rounded-lg  border-2 border-black bg-slate-200"
        ></div>
      </>
    );
  });
};
export default ShimmerUi;
