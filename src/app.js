import React from "react";
import { render, createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchPage1 from "./searchSuggestionPage";

import Header from "./Header";
import Body from "./Body";
import store from "./redux/store";
import { Outlet } from "react-router-dom";
import MainBodyContent from "./mainBodyComponent";
import VideoPage from "./videoPage";
import Example from "./use";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        children: [
          {
            path: "/",
            element: <MainBodyContent />,
          },
          {
            path: "watch",
            element: <VideoPage />,
          },
          {
            path: "example",
            element: <Example />,
          },
          {
            path: "search",
            element: <SearchPage1 />,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
