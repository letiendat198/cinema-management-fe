import { useToggle } from "@mantine/hooks"
import { useRef, useState } from "react";
import { Seat } from "../types/Seat";
import { isSeatType } from "../types/SeatType";

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
        <div className={props.selectable ? 
                'flex justify-center items-center h-8 w-8 rounded-md select-none hover:cursor-pointer' : 
                'flex justify-center items-center h-8 w-8 rounded-md select-none'}
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
    seats: Seat[],
    onCellSelect: (index: number, value: number, isSelected: boolean) => void
}

// Should be generic enough
// Only cares about max row, max column, an array of value and label to lookup, a color map to look up value
// On click, returns index, value, is selected (boolean toggle)
function SeatSelector(props: Props) {
    return (
        <div className="flex flex-col gap-1">
            {[...Array(props.maxRow)].map((_, r) => {
                return (
                    <div key={r} className="flex gap-1">
                        {[...Array(props.maxColumn)].map((_, c) => {
                            let index = r*props.maxColumn + c;
                            if (!isSeatType(props.seats[index].seatType)) return;
                            let value = props.seats[index].seatType.value;
                            let color = props.seats[index].seatType.color;
                            color = color ? color : "#000000"
                            let label = props.seats[index].label;

                            return <SeatCell key={c} 
                                            selectable = {value >= 0} // Only positive value allow selection
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

export default SeatSelector;