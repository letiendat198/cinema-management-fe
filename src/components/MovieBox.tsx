import { Button } from "@mantine/core";
import { Link } from "react-router";
import { Movie } from "../types/Movie";

interface Props {
    movie: Movie
}

function MovieBox(props: Props) {
    return (
        <Link to={`/movie/${props.movie._id}`}>
            <div className="flex flex-col hover:shadow-sm">
                <img className="object-cover h-70" src={props.movie.img}/>
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