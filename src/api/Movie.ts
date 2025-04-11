import { Movie } from "../types/Movie";
import { apiClient } from "./Client";

const getAllMovies = async () => {
    let res = await apiClient.get('/movie');
    let data: Movie[] = res.data?.data;
    return data;
}

const getMovieById = async (id: string | undefined) => {
    let res = await apiClient.get(`/movie/${id}`);
    let data: Movie = res.data?.data;
    return data;
}

export {getAllMovies, getMovieById}