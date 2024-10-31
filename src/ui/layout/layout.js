"use client"

import React, {useEffect} from "react";
import Header from "@/ui/layout/header";
import {Footer} from "@/ui/layout/footer";
import Providers from "@/ui/layout/providers-component";


export default function Layout({children}) {

      return (
        <Providers>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Providers>
    )
}
