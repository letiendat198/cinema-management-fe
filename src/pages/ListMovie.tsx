import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { getAllMovies } from "../api/MovieAPI";
import MovieBox from "../components/MovieBox";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

function ListMovie() {
    dayjs.extend(isSameOrAfter)
    const [movieData, setMovieData] = useState<Movie[]>([]);

    useEffect(() => {
        getAllMovies().then(data => setMovieData(data.filter(e => e.unlisted == false)))
    }, [])

    return (
        <div>
            <div className="mt-2">
                <p className="text-left font-bold text-3xl mb-2">Ongoing</p>
                <div className='grid grid-cols-4 gap-10'>
                    {movieData.map((movie, index) => {
                        if (!dayjs().isSameOrAfter(dayjs(movie.releaseDate))) return;
                        return (
                            <div key={index}>
                                <MovieBox movie={movie}></MovieBox>
                            </div>    
                        )
                    })}
                </div>    
            </div>
            <div className="mt-2">
                <p className="text-left font-bold text-3xl mb-2">Upcoming</p>
                <div className='grid grid-cols-4 gap-10'>
                    {movieData.map((movie, index) => {
                        if (!dayjs().isBefore(dayjs(movie.releaseDate))) return;
                        return (
                            <div key={index}>
                                <MovieBox movie={movie}></MovieBox>
                            </div>    
                        )
                    })}
                </div>    
            </div>
        </div>
    )
}

export default ListMovie;