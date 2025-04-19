import { useToggle } from "@mantine/hooks"
import { useRef, useState } from "react";

interface CellProps {
    selectable: boolean,
    index: number,
    value: number,
    color: string,
    label: string,
    onSelect: (index: number, value: number, isSelected: boolean) => void
}

function SeatCell(props: CellProps) {
    const isSelected = useRef<boolean>(false);
    return (
        <div className='flex justify-center items-center h-8 w-8 rounded-md select-none hover:cursor-pointer'
            style={{backgroundColor: props.color}} 
            onClick={() => {
                if (!props.selectable) return;

                isSelected.current = !isSelected.current;
                props.onSelect(props.index, props.value, isSelected.current);
            }}
        >
                <p className="text-white">{props.label}</p>
        </div>
    )
}

interface Props {
    maxRow: number,
    maxColumn: number,
    valueData: number[],
    labelData: string[],
    colorMap: Map<number, string>,
    onCellSelect: (index: number, value: number, isSelected: boolean) => void
}

// Should be generic enough
// Only cares about max row, max column, an array of value and label to lookup, a color map to look up value
// On click, returns index, value, is selected (boolean toggle)
function SeatMap(props: Props) {
    return (
        <div className="flex flex-col gap-1">
            {[...Array(props.maxRow)].map((_, r) => {
                return (
                    <div key={r} className="flex gap-1">
                        {[...Array(props.maxColumn)].map((_, c) => {
                            let index = props.maxColumn*r + c;
                            let value = props.valueData[index];
                            let color = props.colorMap.get(value);
                            color = color ? color : "#000000"
                            let label = props.labelData[index];

                            return <SeatCell key={c} 
                                            selectable 
                                            index={index} 
                                            value = {value}
                                            color = {color}
                                            label = {label}
                                            onSelect={props.onCellSelect} />    
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default SeatMap;