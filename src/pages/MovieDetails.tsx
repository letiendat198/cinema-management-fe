import { Button, Grid } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "../types/Movie";
import { getMovieById } from "../api/Movie";

function MovieDetails() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        getMovieById(params.movieId).then((data) => setMovie(data))
    }, [])

    return (
        <div className="container px-20 mt-4">
            <div className="grid grid-cols-6">
                <div>
                    <img className="object-cover w-40 h-60" src={movie?.img}/>
                </div>
                <div className="flex flex-col col-span-4" >
                    <p className="text-3xl font-bold mb-2">{movie?.title}</p>
                    <p className="text-lg"><span className="font-semibold">Director:</span> {movie?.director}</p>
                    <p className="text-lg"><span className="font-semibold">Stars:</span> {movie?.moviestars.join(", ")}</p>
                    <p className="text-lg"><span className="font-semibold">Genre:</span> {movie?.genre}</p>
                    <p className="text-lg"><span className="font-semibold">Premiere Date:</span> {movie?.year}</p>
                    <p className="text-lg"><span className="font-semibold">Length:</span> {movie?.length}</p>
                    <p className="text-lg"><span className="font-semibold">Language:</span> {movie?.language.join(", ")}</p>
                    <p className="text-lg"><span className="font-semibold">Rated:</span> {movie?.rating}</p>

                    <Button className="self-start">Buy Ticket</Button>
                </div>
            </div>
            <div>
                <p className="text-2xl font-bold">Description</p>
                <p>{movie?.description}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Available cinemas</p>
            </div>
        </div>
    )
}

export default MovieDetails;