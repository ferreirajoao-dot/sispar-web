import Image from "next/image"
import Link from "next/link"
import {useEffect} from "react";

const Header = () => {

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            const headerSticky = document.querySelector('.header-sticky');

            if (scroll < 245) {
                headerSticky.classList.remove('sticky');
            } else if (scroll > 260 && scroll < 500){
                headerSticky.classList.add('sticky');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header>
            <div className="header-transparent sasup-header-style-5 header-sticky">
                <div className="header-main">
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-6">
                                <div className="sasup-logo mr-35 d-inline-block">
                                    <a href="index.html" className="logo-1">
                                        <Image src="" alt="image not found"/>
                                    </a>
                                    <a href="index.html" className="logo-2">
                                        <Image src="" alt="image not found"/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 d-none d-lg-block text-center">
                                <div className="sasup-header d-none d-lg-inline-block">
                                    <nav id="mobile-menu">
                                        <ul>
                                            <li>
                                                <a href="index.html">Home</a>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href={"#"}>
                                                            Teste
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"#"}>
                                                            Teste 2
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="#">Page</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Pricing</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Blog</Link>

                                            </li>
                                            <li>
                                                <Link href="#">Contact</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-6">
                                <div className="sasup-header-action-5 text-end">
                                    <a href="sign-in.html" className="sasup-login-btn-5">
                                        <i className="fal fa-user"/> Log in
                                    </a>
                                    <a
                                        href="sign-up.html"
                                        className="sasup-header-white-btn-5 header-btn"
                                    >
                                        Join Sasup
                                    </a>
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
            </div>
        </header>

    )
}

export default Header
