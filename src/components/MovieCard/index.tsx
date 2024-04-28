import { Movie } from "@src/types";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import formatDate from "@src/utils/formatDate";

function MovieCard(data: Movie) {
  return (
    <article className={styles.wrapper}>
      <Link to={`/movie/${data.id}`}>
        <div className={styles.cover}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
            alt="Movie poster"
          />
        </div>
      </Link>
      <div className={styles.info}>
        <div className={styles.vote}>{data.vote_average.toFixed(1)}</div>

        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            <Link to={`/movie/${data.id}`}>{data.original_title}</Link>
          </h3>

          <div className={styles.date}>{formatDate(data.release_date)}</div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
