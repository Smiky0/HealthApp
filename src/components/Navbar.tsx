("use client");

import { Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";

const getFirstName = (displayName: string | null): string => {
    if (!displayName) return "User"; // Handle null case
    return displayName.split(" ")[0];
};

interface NavbarProps {
    userName: string | null;
    handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, handleLogout }) => {
    const firstName = getFirstName(userName);
    return (
        <div className="flex justify-between items-center bg-teal-200 w-full sm:w-1/2 h-full rounded-3xl p-2 px-3 gap-4 border-2 border-black/20 shadow-lg">
            <div className="text-xl">
                <span>Hello,</span>
                <span className="capitalize">{" " + firstName}</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="m-2 w-44 shadow-xl bg-white text-black rounded-2xl p-2">
                    {/* <DropdownMenuLabel className="cursor-pointer rounded-2xl hover:bg-black/10">
                        Update Details
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="opacity-40" /> */}
                    <DropdownMenuLabel
                        onClick={handleLogout}
                        className="text-red-500 cursor-pointer rounded-2xl hover:bg-red-500/10"
                    >
                        Log Out
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Navbar;
