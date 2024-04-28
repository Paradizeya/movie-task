import { useEffect, useState } from "react";
import { useNavigate, useLocation, ScrollRestoration } from "react-router-dom";
import { fetchMovies } from "@src/api/moviesAPI";
import { Movie } from "@src/types";
import MovieCard from "@src/components/MovieCard";
import styles from "./styles.module.scss";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function MoviesList({ data }: { data: Movie[] }) {
  return (
    <div className={styles.list}>
      {data.map((movie: Movie) => {
        return <MovieCard key={movie.id} {...movie} />;
      })}
    </div>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(getPageFromQuery(location.search));
  const [isFirstPage, setIsFirstPage] = useState<boolean>(page === 1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const data = await fetchMovies(page);
      setMovies(data);
      setIsFirstPage(page === 1);
      setIsLastPage(data.length === 0);
    }

    getData();
  }, [page]);

  useEffect(() => {
    setIsFirstPage(page === 1);
    navigate(`/?page=${page}`);
  }, [navigate, page]);

  const pageBack = () => {
    if (isFirstPage) {
      return;
    }
    setPage((prev) => prev - 1);
  };
  const pageForward = () => {
    if (isLastPage) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <section className={styles.body}>
        <MoviesList data={movies} />
      </section>
      <footer className={styles.footer}>
        <button
          className={styles.button}
          disabled={isFirstPage}
          onClick={pageBack}
        >
          <FaArrowLeft />
        </button>

        <div className={styles.page}>{page}</div>

        <button
          className={styles.button}
          disabled={isLastPage}
          onClick={pageForward}
        >
          <FaArrowRight />
        </button>
      </footer>
      <ScrollRestoration />
    </div>
  );
}

function getPageFromQuery(query: string) {
  const params = new URLSearchParams(query);
  return parseInt(params.get("page") || "1");
}

export default MainPage;
