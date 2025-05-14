import { Grid } from "@mantine/core"
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
    const colSpan = 2;

    useEffect(() => {
        getPopularMovie().then((data) => {
            setMovies(data);
        });
        if (user) getRecommendedMovie(user._id).then(data => setMovieRecommend(data));
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
                <h1 className="text-left font-bold text-2xl mb-2">Based on your recent movies</h1>
                <Grid>
                    {movieRecommend.map((movie, index) => (
                        <Grid.Col key={index} span={{base: colSpan}}>
                            <MovieBox movie={movie}></MovieBox>
                        </Grid.Col>    
                    ))}
                </Grid>    
            </div> : <></>}
            <div className="mt-2">
                <h1 className="text-left font-bold text-2xl mb-2">Popular</h1>
                <Grid>
                    {movies.map((movie, index) => (
                        <Grid.Col key={index} span={{base: colSpan}}>
                            <MovieBox movie={movie}></MovieBox>
                        </Grid.Col>    
                    ))}
                </Grid>    
            </div>
        </div>
    )
}

export default Home