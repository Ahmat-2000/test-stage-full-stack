'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Twirl as Hamburger } from 'hamburger-react';
import logo from "public/images/logo.png";

/**
 * @typedef {Object} LinkType
 * @property {string} url - The URL of the navigation link.
 * @property {string} text - The displayed text for the link.
 */
type LinkType = {
    url: string;
    text: string;
};

/**
 * Navigation links for the Fun Game Store application.
 * These links are used in the navigation bar for quick access to key pages.
 *
 * @constant {LinkType[]} links
 */
export const links: LinkType[] = [
    { url: "/", text: "Home" },
    { url: "/games", text: "Explore" },
    { url: "/favorites", text: "Favorites" },
    { url: "/profile", text: "Profile" },
    { url: "/signup", text: "Sign Up" },
    { url: "/login", text: "Login" },
    { url: "/logout", text: "Logout" },
];

function NavBar() {
    const pathname = usePathname();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const hideMenu = () => {
        if(isOpenMenu){
            setIsOpenMenu((isOpen) => !isOpen);
        }
    };
    return (
    <nav className="border-b mb-4 border-blue-950/95 shadow-md shadow-blue-950 bg-[#12151f] rounded-md py-2 sticky flex items-center justify-between top-0 z-10 container mx-auto max-w-[1280px] xl:mx-auto">
        <div className="flex items-center gap-1 py-1 pl-2 transition-opacity duration-1000 hover:opacity-75">
            <Link href="/">
                <Image className="rounded-3xl" width={40} src={logo} alt="logo" />
            </Link>
            <Link href="/">
                <span className="text-2xl antialiased font-semibold">Store</span>
            </Link>
        </div>

        <ul className={`${!isOpenMenu ? "hidden" : "flex py-8"} flex-col justify-between items-center gap-4 absolute top-0 right-0 min-h-[420px] bg-sky-800 rounded-md w-full sm:w-[70%]
        md:flex md:flex-row md:justify-between md:m-3 md:pr-4 md:bg-inherit md:min-h-max`}>
        {   links.map((item, index) =>
                (<li key={index} className={`${pathname === item.url && "title-blue"} font-semibold w-1/2 md:w-auto py-1 text-center shadow-md shadow-gray-900 rounded-md text-xl md:shadow-none md:text-lg md:rounded-none`}>
                    <Link
                        onClick={hideMenu}
                        className="block md:inline hover:opacity-55 transition-opacity duration-150"
                        href={item.url}>
                        {item.text}
                    </Link>
                </li>))
        }
        </ul>
        <div className="absolute transition-opacity duration-500 md:hidden hover:opacity-55 top-1 right-1">
            <Hamburger toggled={isOpenMenu} toggle={setIsOpenMenu} />
        </div>

    </nav>
    );
}

export default NavBar;