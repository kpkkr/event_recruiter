import React from "react";
import { HeaderPage } from "../header/headerPage";
import { FooterPage } from "../footer/footerPage";

const MainLayout = ({children}) => {
    return (
        <>
        <HeaderPage />
            <main>{children }</main>
        <FooterPage />
        </>
    )
}

export default MainLayout;