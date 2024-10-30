"use client";

import React, {createContext, useEffect, useRef, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Layout from "@/ui/layout/layout";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/navigation";
import api, { access } from "@/functions/api";

export const ContextApplication = createContext();
export const ContextUser = createContext();

export default function Providers({children, session, application, token}) {
    const router = useRouter()
    const [queryClient] = React.useState(() => new QueryClient(
        {defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnmount: false,
                    refetchOnReconnect: false,
                    retry: false,
                    staleTime: 5 * 1000,
                },
            }}
    ))
    const [user, setUser] = useState({});
    const [applicationData, setApplicationData] = useState({});
    const [loginProgressState, setLoginProgressState] = useState(false);
    const isRedirect = useRef(null);

    //se tiver token ja coloco no arquivo pra api do front usar.
    // if(token) access.api_token = token.api_key;


    async function getData() {
        const appData = await fetch('/api/application');
        const userData = await fetch('/api/user');
        let response = {};
        response.appData = await appData.json()

        if (userData) {
            response.userData = await userData.json()
        }
        return response
    }


    const getInitialConfig = async () => {
        let res = await getData();

        let applicationRes = res.appData;
        let userRes = res.userData;

        if(userRes?.data) {
            setUser(userRes?.data);
        }
        if(applicationRes?.data) {
            setApplicationData(applicationRes?.data);
        }
    }

    const refetchUser = async () => {
        try {
            const response = await api.get("/api/user", {}, {isNext:true});
            if(response?.data) {
                setUser(response?.data);
            }
        } catch (e) {

        }
    }

    const updateUser = (newUserData) => {
        try {
            setUser({...newUserData});
        } catch (error) {
            console.error("Falha ao atualizar o usuário", error);
        }
    };

    const login = ({data, redirectTo}) => {

        if (redirectTo) {
            isRedirect.current = redirectTo
        } else {
            isRedirect.current = "/"
        }
        setLoginProgressState(true);
        updateUser(data);
        access.api_token = data?.api_key;
    }

    const logout = async () => {
        const userData = await fetch('/api/logout');
        //FORCA RELOADAR TUDO
        location.reload();
    }

    // useEffect(() => {
    //     //So pra controlar o estado pra so ir pra pagina privada quando o USER tiver na session.
    //     if(loginProgressState && user) {
    //         router.replace(isRedirect.current);
    //         setLoginProgressState(false);
    //     }
    // },[loginProgressState])

    useEffect(() => {
        // getInitialConfig();
    },[]);


    // if(!applicationData) return  <div>Carregando...</div>;

    return (

            <ContextApplication.Provider value={applicationData}>
                <ContextUser.Provider value={{updateUser, refetchUser, user, logout, login}}>
                    <QueryClientProvider client={queryClient}>
                        {children}

                        <ReactQueryDevtools initialIsOpen={false} />
                        <ToastContainer />
                    </QueryClientProvider>
                </ContextUser.Provider>
            </ContextApplication.Provider>

    )
}
