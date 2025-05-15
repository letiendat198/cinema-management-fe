import { Button } from "@mantine/core";
import { Link } from "react-router";
import { Movie } from "../types/Movie";
import dayjs from "dayjs";

interface Props {
    movie: Movie
}
// No height or width limit, please limit it from outside by wrapping in a div or grid
function MovieBox(props: Props) {
    return (
        <Link to={`/movie/${props.movie._id}`}>
            <div className="flex flex-col">
                <img className="object-cover aspect-2/3 rounded-sm hover:shadow-primary-300 hover:shadow-md hover:opacity-80" src={props.movie.img}/>
                <div className="flex items-center gap-2 justify-between">
                    <p className="text-xl text-left font-sans font-semibold truncate hover:text-primary">{props.movie.title}</p>
                    <p className="font-light">{dayjs(props.movie.releaseDate).format("DD/MM/YYYY")}</p>
                </div>  
            </div>      
        </Link>
    )
}

export default MovieBox;