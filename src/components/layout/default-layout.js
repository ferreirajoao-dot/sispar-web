"use client"

import React from "react";
import Header from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import Providers from "@/components/layout/providers-component";


export default function Layout({children}) {

      return (
        <Providers>

            <div className={'d-flex flex-column flex-root app-root'}>
                <div className="app-page  flex-column flex-column-fluid ">
                    <Header/>
                    <main className={"app-wrapper flex-column flex-row-fluid position-relative"}>
                        {children}
                    </main>
                </div>
                <Footer/>
            </div>

        </Providers>
      )
}
