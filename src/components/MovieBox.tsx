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
                <img className="object-cover aspect-2/3 rounded-xs hover:shadow-primary-300 hover:shadow-md" src={props.movie.img}/>
                <div className="flex flex-col">
                    <p className="text-xl text-left font-sans font-semibold truncate hover:text-primary">{props.movie.title}</p>
                    {/* <p className="line-clamp-2 md:line-clamp-5">{props.description}</p>     */}
                    {/* <Button className="mt-2">Find Tickets</Button>     */}
                </div>  
            </div>      
        </Link>
    )
}

export default MovieBox;