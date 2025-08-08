'use client';

import Image from "next/image"
import logo from "@images/logo.png";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', { email, password });
    };

    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
            <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                    <div className="w-lg-500px p-10">
                        <form onSubmit={handleSubmit} className="gy-5 mb-3">
                            <div className="col-12 mb-4">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Insira o email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <label className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100 py-3">
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 bg-light-secondary">
                <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                    <Link href={"#"} className="mb-0 mb-lg-12">
                        <Image src={logo}
                               alt="logo"
                               className="h-60px h-lg-75px object-fit-contain "
                               width={400}
                        />
                    </Link>

                    <h2 className="d-none d-lg-block text-white fs-2x fw-bolder text-center mb-7 text-secondary">
                        Rápido, Eficiente e Produtivo
                    </h2>
                </div>
            </div>
        </div>
    )
}