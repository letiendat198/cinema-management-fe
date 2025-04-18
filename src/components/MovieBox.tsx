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
            <div className="flex flex-col hover:shadow-sm">
                <img className="object-cover aspect-2/3" src={props.movie.img}/>
                <div className="flex flex-col">
                    <p className="text-xl text-center font-sans font-bold truncate">{props.movie.title}</p>
                    {/* <p className="line-clamp-2 md:line-clamp-5">{props.description}</p>     */}
                    {/* <Button className="mt-2">Find Tickets</Button>     */}
                </div>  
            </div>      
        </Link>
    )
}

export default MovieBox;