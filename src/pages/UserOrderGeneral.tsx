import { Tabs } from "@mantine/core";
import UserTicket from "./UserTicket";
import { useRestrictUser } from "../hooks/restrictUser";
import UserOrder from "./UserOrder";

function UserOrderGeneral() {
    useRestrictUser('user');
    
    return (
        <div>
            <Tabs defaultValue='ticket'>
                <Tabs.List>
                    <Tabs.Tab value="ticket">
                        My tickets
                    </Tabs.Tab>
                    <Tabs.Tab value="order">
                        Pending orders
                    </Tabs.Tab> 
                </Tabs.List>
                <Tabs.Panel value="ticket">
                    <UserTicket />
                </Tabs.Panel>
                <Tabs.Panel value="order">
                    <UserOrder />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default UserOrderGeneral;