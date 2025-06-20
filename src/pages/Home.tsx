import { Carousel } from '@mantine/carousel';
import MovieBox from "../components/MovieBox"
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { getAllMovies, getPopularMovie, getRecommendedMovie } from "../api/MovieAPI";
import { useUserStore } from "../hooks/userStore";

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieRecommend, setMovieRecommend] = useState<Movie[]>([]);

    const user = useUserStore(state => state.user);

    useEffect(() => {
        getPopularMovie().then((data) => {
            setMovies(data.filter(e => e.unlisted == false));
        });
        if (user) getRecommendedMovie(user._id).then(data => setMovieRecommend(data.filter(e => e.unlisted == false)));
    }, []);

    return (
        <div className="flex flex-col">
            <div>
                <Carousel withIndicators>
                    {movies.map(movie => {
                        if (!movie.bannerImage) return;
                        return (
                            <Carousel.Slide>
                                <img className="object-fill aspect-22/10" src={movie.bannerImage}/>    
                            </Carousel.Slide>    
                        )
                    })}
                </Carousel>    
            </div>
            {movieRecommend.length ? <div className="mt-2">
                <p className="text-left font-bold text-3xl mb-2">Based on your recent movies</p>
                <div className='grid grid-cols-4 gap-10'>
                    {movieRecommend.map((movie, index) => (
                        <div key={index}>
                            <MovieBox movie={movie}></MovieBox>
                        </div>    
                    ))}
                </div>    
            </div> : <></>}
            <div className="mt-2">
                <p className="text-left font-bold text-3xl mb-2">Popular</p>
                <div className='grid grid-cols-4 gap-10'>
                    {movies.map((movie, index) => (
                        <div key={index}>
                            <MovieBox movie={movie}></MovieBox>
                        </div>    
                    ))}
                </div>    
            </div>
        </div>
    )
}

export default Home