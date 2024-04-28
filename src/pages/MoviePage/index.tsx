import { Movie as MovieBase } from "@src/types";
import { fetchMovie } from "@src/api/moviesAPI";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import formatDate from "@src/utils/formatDate";

type Movie = MovieBase & {
  genres: { id: number; name: string }[];
  runtime: number;
  popularity: number;
};

function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function getData() {
      const data = await fetchMovie(parseInt(params.id as string));
      setMovie(data as Movie);
    }

    getData();
  }, []);

  return (
    <>
      {movie && movie !== undefined && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.vote}>{movie.vote_average.toFixed(1)}</div>
            <h1 className={styles.title}>{movie.title}</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.info}>
              <p className={styles.overview}>{movie.overview}</p>
              <ul className={styles.genres}>
                <li>Длительность: {movie.runtime} мин</li>
                <li>Популярность: {movie.popularity}</li>
                <li>Дата выхода: {formatDate(movie.release_date)}</li>
                <li>
                  Жанр:{" "}
                  {movie.genres
                    .map((genre) => genre.name.toLowerCase())
                    .join(", ")}
                </li>
              </ul>
            </div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt="Movie poster"
              />
            </div>
          </div>
          <footer className={styles.footer}>
            <button className={styles.button} onClick={goBack}>
              Назад
            </button>
          </footer>
        </div>
      )}
      {!movie && (
        <div className={styles.error}>
          <p>Такого фильма не существует!</p>
          <button className={styles.button} onClick={goBack}>
            Назад
          </button>
        </div>
      )}
    </>
  );
}

export default MoviePage;
