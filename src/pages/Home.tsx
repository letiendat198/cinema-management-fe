import { Grid } from "@mantine/core"
import { Carousel } from '@mantine/carousel';
import MovieBox from "../components/MovieBox"
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { getAllMovies } from "../api/MovieAPI";

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const colSpan = 2;

    useEffect(() => {
        getAllMovies().then((data) => {
            setMovies(data);
        });
    }, [])

    return (
        <div className="flex flex-col">
            <div>
                <Carousel withIndicators>
                    <Carousel.Slide>
                        <img className="object-fill aspect-5/2"
                            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018483.jpg&w=1920&q=75"/>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img className="object-cover aspect-5/2"
                            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018469.jpg&w=1920&q=75"/>
                    </Carousel.Slide>
                </Carousel>    
            </div>
            <div className="mt-2">
                <h1 className="text-left font-bold text-2xl mb-2">Hot movies</h1>
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