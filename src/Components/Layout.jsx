import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";

export default function Layout() {
    
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return <Outlet />;
}