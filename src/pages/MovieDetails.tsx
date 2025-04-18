import { Button, Grid } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "../types/Movie";
import { getMovieById } from "../api/MovieAPI";
import Booking from "../components/Booking";

function MovieDetails() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        getMovieById(params.movieId).then((data) => setMovie(data))
    }, [])

    return (
        <div>
            <div className="grid grid-cols-6 gap-5">
                <div>
                    <img className="object-cover aspect-2/3" src={movie?.img}/>
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

                    <Button className="self-start mt-2">See Trailer</Button>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold">Description</p>
                <p>{movie?.description}</p>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold mb-4">Schedule</p>
                {movie?._id ? <Booking movieId={movie._id} /> : null}
            </div>
        </div>
    )
}

export default MovieDetails;