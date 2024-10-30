"use client"

import React from "react";
import Header from "@/ui/layout/header";
import {Footer} from "@/ui/layout/footer";
import Providers from "@/ui/layout/providers-component";


export default function Layout({children}) {

    return (
        <Providers>
            <Header/>
            <main className={"app-wrapper flex-column flex-row-fluid position-relative"}>
                {children}
            </main>
            <Footer/>
        </Providers>
    )
}
