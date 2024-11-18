"use client"

import React from "react";
import Header from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import Providers from "@/components/layout/providers-component";
import {usePathname} from "next/navigation";


export default function Layout({children}) {
    const pathname = usePathname();
    const isHiddenHeader = ["/login"].some((item) => item === pathname);
    const isHiddenFooter = ["/login"].some((item) => item === pathname);

    return (
        <Providers>
            <div className={'d-flex flex-column flex-root app-root'}>
                <div className="app-page  flex-column flex-column-fluid ">
                    {isHiddenHeader ? null : <Header/>}
                    <main className={"app-wrapper flex-column flex-row-fluid position-relative"}>
                        {children}
                    </main>
                </div>
                {isHiddenFooter ? null :  <Footer/>}
            </div>
        </Providers>
    )
}
