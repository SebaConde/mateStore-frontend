import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () =>{
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href='/categories/cafe-molido' className='block'>Calabaza</Link>
                <Link href='/categories/cafe-grano' className='block'>Imperial</Link>
                <Link href='/categories/cafe-capsula' className='block'>Metal</Link>
                <Link href='/categories/cafe-capsula' className='block'>Madera</Link>
            </PopoverContent>
        </Popover>
    )
}


export default ItemsMenuMobile;