import { Button } from "@mantine/core";

interface Props {
    src: string,
    title?: string,
    description?: string
}

function MovieBox(props: Props) {
    return (
        <a href="">
            <div className="flex flex-col hover:shadow-sm" onClick={() => console.log("Clicked")}>
                <img className="object-cover w-60 h-80" src={props.src}/>
                <div className="flex flex-col">
                    <p className="text-xl text-center font-sans font-bold truncate">{props.title}</p>
                    {/* <p className="line-clamp-2 md:line-clamp-5">{props.description}</p>     */}
                    {/* <Button className="mt-2">Find Tickets</Button>     */}
                </div>  
            </div>      
        </a>
    )
}

export default MovieBox;