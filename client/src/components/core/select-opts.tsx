import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SelectOptsProps {
    values: string[],
    cb?: () => void,
    defaultValue: string
    title?: string;
}

export default function SelectOpts({values, defaultValue, title}: SelectOptsProps) {
    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger className="w-[100px] px-2 ">
                <SelectValue placeholder="Set priority"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>
                    {values.map((el, index) => (
                        <SelectItem key={index} value={el}>{el}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}