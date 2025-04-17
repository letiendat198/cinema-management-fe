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

const addMovie = async (movie: Movie) => {
    try {
        let res = await apiClient.post(`/movie`, movie);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

const updateMovie = async (id: string, movie: Movie) => {
    try {
        let res = await apiClient.put(`/movie/${id}`, movie);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

const deleteMovie = async (id: string) => {
    try {
        let res = await apiClient.delete(`/movie/${id}`);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

export {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie}