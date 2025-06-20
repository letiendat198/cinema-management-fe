import { Tabs } from "@mantine/core";
import ManageCinema from "./ManageCinema";
import ManageRoom from "./ManageRoom";
import ManageSeat from "./ManageSeat";
import { useEffect, useState } from "react";
import { Cinema } from "../../../types/Cinema";
import { getAllCinemas } from "../../../api/CinemaAPI";
import { useToggle } from "@mantine/hooks";
import { useRestrictUser } from "../../../hooks/restrictUser";
import ManageSeatType from "./ManageSeatType";

function ManageCinemaGeneral() {
    useRestrictUser('admin');
    const [cinemaData, setCinemaData] = useState<Cinema[]>([]);
    const [refresh, refreshToggle] = useToggle();

    useEffect(() => {
        getAllCinemas().then(data => setCinemaData(data));
    }, [refresh])

    return (
        <div>
            <Tabs defaultValue='cinema'>
                <Tabs.List>
                    <Tabs.Tab value="cinema">
                        Manage Cinema
                    </Tabs.Tab>
                    <Tabs.Tab value="room">
                        Manage Room
                    </Tabs.Tab>
                    <Tabs.Tab value="seat">
                        Manage Seat
                    </Tabs.Tab>   
                    <Tabs.Tab value="seattype">
                        Manage Seat Type
                    </Tabs.Tab>  
                </Tabs.List>
                <Tabs.Panel value="cinema">
                    <ManageCinema data={cinemaData} refreshToggle={refreshToggle} />
                </Tabs.Panel>
                <Tabs.Panel value="room">
                    <ManageRoom cinemaData={cinemaData} />
                </Tabs.Panel>
                <Tabs.Panel value="seat">
                    <ManageSeat cinemaData={cinemaData} />
                </Tabs.Panel>
                <Tabs.Panel value="seattype">
                    <ManageSeatType />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default ManageCinemaGeneral;