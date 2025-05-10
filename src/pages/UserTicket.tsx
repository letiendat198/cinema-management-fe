import { useEffect, useState } from "react";
import { useUserStore } from "../hooks/userStore";
import { Ticket } from "../types/Ticket";
import { getTicketByUserId } from "../api/TicketAPI";
import TicketBox from "../components/TicketBox";


function UserTicket() {
    const user = useUserStore(state => state.user);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        getTicketByUserId(user?._id).then(data => setTickets(data));
    }, [])

    return (
        <div className="mt-4">
            <p className="text-3xl font-bold">My tickets</p>
            <div>
                {tickets.map(ticket => <TicketBox ticket={ticket} />)}
            </div>
        </div>
    );
}

export default UserTicket;