import { Button } from "@mantine/core";
import { Link } from "react-router";

interface Props {
    movieId: String,
    src: string,
    title?: string,
    description?: string
}

function MovieBox(props: Props) {
    return (
        <Link to={`/movie/${props.movieId}`}>
            <div className="flex flex-col hover:shadow-sm">
                <img className="object-cover h-70" src={props.src}/>
                <div className="flex flex-col">
                    <p className="text-xl text-center font-sans font-bold truncate">{props.title}</p>
                    {/* <p className="line-clamp-2 md:line-clamp-5">{props.description}</p>     */}
                    {/* <Button className="mt-2">Find Tickets</Button>     */}
                </div>  
            </div>      
        </Link>
    )
}

export default MovieBox;