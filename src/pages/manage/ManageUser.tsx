import { Button } from "@mantine/core";
import { useMemo, useState } from "react";
import { User } from "../../types/User";
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
  } from 'mantine-react-table';

function ManageUser() {
    const [data, setData] = useState<User[]>([]);
    const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
        {
            accessorKey: 'username',
            header: 'Username'
        },
        {
            accessorKey: 'password',
            header: 'Password'
        }
    ], [])

    const table = useMantineReactTable({
        columns: columns,
        data: data,
        enableRowSelection: true
    });

    return (
        <div className="px-20 mt-2">
            <p className="text-3xl font-bold">Manage User</p>
            <div className="mt-2"> 
                <Button>Add User</Button>
            </div>
            <div>
                <MantineReactTable table={table} />
            </div>
        </div>
    )
}

export default ManageUser;