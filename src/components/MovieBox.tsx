import { Button } from "@mantine/core";
import { Link } from "react-router";
import { Movie } from "../types/Movie";

interface Props {
    movie: Movie
}
// No height or width limit, please limit it from outside by wrapping in a div or grid
function MovieBox(props: Props) {
    return (
        <Link to={`/movie/${props.movie._id}`}>
            <div className="flex flex-col">
                <img className="object-cover aspect-2/3 rounded-sm hover:shadow-primary-300 hover:shadow-md hover:opacity-80" src={props.movie.img}/>
                <div className="flex justify-between">
                    <p className="text-xl text-left font-sans font-semibold truncate hover:text-primary">{props.movie.title}</p>
                    {/* <p className="line-clamp-2 md:line-clamp-5">{props.description}</p>     */}
                </div>  
            </div>      
        </Link>
    )
}

export default MovieBox;