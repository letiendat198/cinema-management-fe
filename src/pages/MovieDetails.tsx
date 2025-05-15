import { ActionIcon, Button, Grid, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "../types/Movie";
import { getMovieById, incrementMovieLike } from "../api/MovieAPI";
import MovieSchedule from "../components/MovieSchedule";
import { IconHeart, IconPlayerPlay } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ReactPlayer from 'react-player/youtube'
import dayjs from "dayjs";

function MovieDetails() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie>();
    const [trailerOpened, {open: trailerOpen, close: trailerClose}] = useDisclosure(false);

    useEffect(() => {
        getMovieById(params.movieId).then((data) => setMovie(data))
    }, [])

    return (
        <div>
            <div className="relative">
                <img className="object-fill aspect-22/10 opacity-80" src={movie?.bannerImage}/>
                {movie?.trailer?<div className="absolute top-1/2 left-1/2">
                    <ActionIcon size="xl" radius="xl" onClick={trailerOpen}>
                        <IconPlayerPlay />
                    </ActionIcon>
                </div>:<></>}
            </div>
            <div className="flex gap-8 px-4">
                <div className="bg-white p-1 -translate-y-16 shadow-2xl">
                    <img className="object-cover aspect-2/3 w-60" src={movie?.img}/>
                </div>
                <div className="flex flex-col -translate-y-16 justify-end mt-20" >
                    <div className="flex gap-4 items-center">
                        <p className="text-3xl font-bold mb-2">{movie?.title}</p>
                        <div className="flex items-center">
                            <ActionIcon variant="transparent" onClick={() => incrementMovieLike(movie?._id)}>
                                <IconHeart />
                            </ActionIcon>
                            <p>{movie?.like}</p>      
                        </div>
                    </div>
                    <p className="flex-1 text-lg"><span className="font-semibold">Premier date:</span> {dayjs(movie?.releaseDate).format("DD/MM/YYYY")}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Director:</span> {movie?.director}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Stars:</span> {movie?.moviestars.join(", ")}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Genre:</span> {movie?.genre}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Year:</span> {movie?.year}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Length:</span> {movie?.length}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Language:</span> {movie?.language.join(", ")}</p>
                    <p className="flex-1 text-lg"><span className="font-semibold">Rated:</span> {movie?.rating}</p>    
                </div>
            </div>
            <div>
                <p className="text-2xl font-bold">Description</p>
                <p>{movie?.description}</p>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold mb-4">Schedule</p>
                {movie?._id ? <MovieSchedule movie={movie} /> : null}
            </div>
            <Modal size={680} opened={trailerOpened} onClose={trailerClose} title={`Trailer: ${movie?.title}`}>
                <div className="flex justify-center">
                    <ReactPlayer controls={true} url={movie?.trailer}/>    
                </div>
            </Modal>
        </div>
    )
}

export default MovieDetails;