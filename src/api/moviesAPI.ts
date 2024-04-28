import axios, { AxiosResponse } from "axios";
import { Movie } from "@src/types";

interface TMDbResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export async function fetchMovies(page: number): Promise<Movie[]> {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

    const response: AxiosResponse<TMDbResponse> = await axios.get(url);

    if (response.status === 200 && response.data.results.length > 0) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchMovie(movieId: number): Promise<Movie | undefined> {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    const response: AxiosResponse<Movie> = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return undefined;
  }
}
