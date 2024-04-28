import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MoviePage from "./pages/MoviePage";
import "./main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/movie/:id",
    element: <MoviePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main>
      <header className="mainHeader">
        <h1 className="mainTitle">Кино справочник</h1>
      </header>
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);
