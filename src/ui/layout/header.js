"use client";

import Image from "next/image"
import Link from "next/link"
import {useEffect} from "react";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    const handleScroll = () => {
        const scroll = window.scrollY;

        if (scroll < 245) {
            onChangeSticky("remove")
        } else if ((scroll > 260 && scroll < 500) || pathname !== "/"){
            onChangeSticky("add")
        }

    };


    const onChangeSticky = (action) => {
        const headerSticky = document.querySelector('.header-sticky');
        headerSticky.classList[action]('sticky');
    }

    const onChangeHtmlHeaderSticky = (value) => {
        const element = document.querySelector('[data-kt-app-header-sticky]');
        if (element) {
            element.setAttribute('data-kt-app-header-sticky', value);
        }
    }
    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {

        if (pathname === "/") {
            onChangeHtmlHeaderSticky("off");
            onChangeSticky('remove');
        } else {
            onChangeHtmlHeaderSticky("on");
        }

    }, [pathname]);
    return (
        <header className={`header-transparent  header-sticky ${pathname !== "/" ? "theme_bg" : "sasup-header-style-5"}`}>
            <div className="header-main">
                <div className="container">
                    <div className="row align-items-center justify-content-between py-4">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-6">
                            <div className="sasup-logo mr-35 d-inline-block">
                                <Link href="/" className="logo-1">
                                    <h4 className={"mb-0 text-white"}>SISPAR</h4>
                                    {/*<Image src="" alt="image not found"/>*/}
                                </Link>
                                <Link href="/" className="logo-2">
                                    <h4 className={"mb-0"}>SISPAR</h4>
                                    {/*<Image src="" alt="image not found"/>*/}
                                </Link>
                            </div>
                        </div>
                        {/*<div className="col-xxl-6 col-xl-6 col-lg-6 d-none d-lg-block text-center">*/}
                        {/*    <div className="sasup-header d-none d-lg-inline-block">*/}
                        {/*        <nav id="mobile-menu">*/}
                        {/*            <ul>*/}
                        {/*                <li>*/}
                        {/*                    <a href="index.html">Home</a>*/}
                        {/*                    <ul className="sub-menu">*/}
                        {/*                        <li>*/}
                        {/*                            <Link href={"#"}>*/}
                        {/*                                Teste*/}
                        {/*                            </Link>*/}
                        {/*                        </li>*/}
                        {/*                        <li>*/}
                        {/*                            <Link href={"#"}>*/}
                        {/*                                Teste 2*/}
                        {/*                            </Link>*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link href="#">Page</Link>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link href="#">Pricing</Link>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link href="#">Blog</Link>*/}

                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link href="#">Contact</Link>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </nav>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-6">
                            <div className="sasup-header-action-5 text-end">
                                <Link href="#" className={pathname === "/" ? "sasup-login-btn-5" : "sasup-transparent-btn"}>
                                    <i className="fal fa-user"/> Login
                                </Link>
                                <Link href={"/registro"} className="sasup-header-white-btn-5 header-btn"
                                >
                                    Registrar
                                </Link>
                                <div
                                    className="mobile-bar-control mobile-bar-control-white d-inline-block d-lg-none">
                                    <div className="line"/>
                                    <div className="line"/>
                                    <div className="line"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header
