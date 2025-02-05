"use client";

import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import logo from "public/images/logo.png";
import { AuthContext } from "@/context/authContext";
import { AuthContextType } from "@/types/types";

const publicRoutes = [
    { url: "/", text: "Home" },
    { url: "/games", text: "Explore" },
];
const notLogindRoutes = [
    { url: "/signup", text: "Sign Up" },
    { url: "/login", text: "Login" },
];
const logInRoutes = [
    { url: "/favorites", text: "Favorites" },
    { url: "/profile", text: "Profile" },
    { url: "/logout", text: "Logout" },
];
type navLink = { url: string; text: string };

function NavBar() {
    const pathname = usePathname();
    const route = useRouter();
    const auth  = useContext<AuthContextType | null>(AuthContext);
    const hideMenu = () => {
        if (isOpenMenu) setIsOpenMenu(false);
      };
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const renderNavLinks = (routes: navLink[]) =>
        routes.map(({ url, text }) => (
            <li key={url} className={`${pathname === url && "title-blue"} flex justify-center w-full`}>
                {url === "/logout" ? (
                    <button onClick={async () => {
                        hideMenu();
                        await auth?.handleLogout();
                        route.push('/')
                    }} className="flex justify-center font-semibold w-1/2 md:w-auto py-1 text-center shadow-md shadow-gray-900 rounded-md text-xl md:shadow-none md:text-lg md:rounded-none hover:opacity-55 transition-opacity duration-150 ">
                        {text}
                    </button>
                ) : (
                    <Link href={url} onClick={hideMenu} className="flex justify-center font-semibold w-1/2 md:w-auto py-1 text-center shadow-md shadow-gray-900 rounded-md text-xl md:shadow-none md:text-lg md:rounded-none hover:opacity-55 transition-opacity duration-150 ">
                        {text}
                    </Link>
                )}
            </li>
        ));

    return (
        <nav className="border-b mb-4 border-blue-950/95 shadow-md shadow-blue-950 bg-[#12151f] rounded-md py-2 sticky flex items-center justify-between top-0 z-10 container max-w-[1280px] mx-auto xl:mx-auto">
            <div className="flex items-center gap-1 py-1 pl-2 transition-opacity duration-1000 hover:opacity-75">
                <Link href="/">
                    <Image className="rounded-3xl" width={40} src={logo} alt="logo" />
                </Link>
                <Link href="/">
                    <span className="text-2xl antialiased font-semibold">Store</span>
                </Link>
            </div>
            <ul className={`${
                !isOpenMenu ? "hidden" : "flex py-8"
            } flex-col justify-between items-center gap-4 absolute top-0 right-0 min-h-[420px] bg-sky-800 rounded-md w-full sm:w-[70%]
            md:flex md:flex-row md:justify-between md:m-3 md:p-0 md:pr-4 md:bg-inherit md:min-h-max`}>
                {renderNavLinks(publicRoutes)}
                {auth?.isAuthenticated ? renderNavLinks(logInRoutes) : renderNavLinks(notLogindRoutes)}
            </ul>

            <div className="absolute transition-opacity duration-500 md:hidden hover:opacity-55 top-1 right-1">
                <Hamburger toggled={isOpenMenu} toggle={setIsOpenMenu} />
            </div>
        </nav>
    );
}

export default NavBar;
