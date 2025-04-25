import { useEffect, useState } from "react";
import { Item } from "../types/Item";
import { getAllItems } from "../api/ItemAPI";
import { ActionIcon, NumberInput, TextInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface Props {
    onItemChange: (itemMap: Map<string, number>) => void
}

function ItemSelect(props: Props) {
    const [itemData, setItemData] = useState<Item[]>([])
    const [itemQuantityMap, setItemQuantityMap] = useState<Map<string,number>>(new Map())

    const onItemQuantityChange = (id: string, value: number) => {
        let cloneMap = new Map(itemQuantityMap);
        cloneMap.set(id, value);
        setItemQuantityMap(cloneMap);
    }

    useEffect(() => {
        if (itemQuantityMap.size > 0) props.onItemChange(itemQuantityMap);
    }, [itemQuantityMap])

    useEffect(() => {
        getAllItems().then(data => {
            let map = new Map()
            data.forEach(item => {
                map.set(item._id, 0);
            });

            setItemQuantityMap(map);
            setItemData(data);    
        });
    }, [])

    return (
        <div className="flex flex-col gap-4">
            {itemData.map((e,i) => {
                return (
                    <div className="flex gap-2">
                        <img className="max-w-20 " src={e.imageUrl} />
                        <div className="flex flex-col">
                            <p className="font-semibold">{e.name}</p>
                            <p>{e.description}</p>    
                            <p>Price: {e.price.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>
                            <div className="flex">
                                <NumberInput size="xs" allowNegative={false} value={itemQuantityMap.get(e._id)} onChange={(value) => onItemQuantityChange(e._id, Number(value))}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>    
    )
}

export default ItemSelect;