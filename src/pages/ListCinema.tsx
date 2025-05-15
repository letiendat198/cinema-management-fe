import { useEffect, useState } from "react";
import { Cinema } from "../types/Cinema";
import { getAllCinemas } from "../api/CinemaAPI";
import { Select } from "@mantine/core";

function ListCinema() {
    const [cinemaData, setCinemaData] = useState<Cinema[]>([]);
    const [selectedCinemaAddr, setSelectedCinemaAddr] = useState<string | undefined | null>();

    useEffect(() => {
        getAllCinemas().then(data => setCinemaData(data));
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <p className="font-bold text-3xl">Our location</p>
            <Select className="self-start" 
                    placeholder="Select a cinema"
                    data={cinemaData?.map((cinema) => {
                        return {
                            value: cinema.location,
                            label: cinema.name
                        }
                    })} 
                    value={selectedCinemaAddr} 
                    onChange={setSelectedCinemaAddr} />  
                <div className="flex flex-col gap-2">
                    <p><span className="font-semibold">Address: </span>{selectedCinemaAddr}</p>
                    <div className="w-1/2">
                        <iframe width="100%" height="400" src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${selectedCinemaAddr ? encodeURI(selectedCinemaAddr) : ""}+()&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe></div>
                </div>
        </div>
    );
}

export default ListCinema;