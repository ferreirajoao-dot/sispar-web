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
                    <div className={isHiddenHeader ? "d-none" : "d-block"}>
                        <Header/>
                    </div>
                    <main className={"app-wrapper flex-column flex-row-fluid position-relative"}>
                        {children}
                    </main>
                </div>
                <div className={isHiddenFooter ? "d-none" : "d-block"}>
                    <Footer/>
                </div>
            </div>
        </Providers>
    )
}
