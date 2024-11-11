"use client"

import {keepPreviousData as keep, useQuery, useQueryClient} from "@tanstack/react-query";
import api  from "@/services/api";
import {usePathname, useRouter} from "next/navigation";

interface GetDataOptionsProps {
    url: string;
    queryKey: Array<string>;
    keepPreviousData?: boolean;
    onSuccess?: (response: any) => any | void;
    initialFn?: (serverData: any) => any | void; //A FUNCAO VAI RODAR APENAS UMA VEZ NA PRIMEIRA MONTAGEM DO COMPONENTE, O OBJETIVO PRINCIPAL É PARA FILTRAR OS DADOS QUE VIER DO SERVERDATA
    enabled?: boolean | null;
    params?: object | any ;
    serverData?: any;
    isQueryString?: boolean;
    keepOriginalResponse?: boolean;
}

interface MyQueryOptionsProps {
    queryKey: Array<string | number | boolean | object>;
    queryFn: () => Promise<any>;
    placeholderData?: any;
    enabled?: boolean;
    initialData?: any;
}

export const useGetData = (options: GetDataOptionsProps) => {
    let {
        url,
        queryKey,
        keepPreviousData,
        onSuccess,
        initialFn,
        enabled = null,
        params,
        isQueryString ,
        serverData,
        keepOriginalResponse = false,
    } = options;
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();


    const getDataFn = async () => {


        try {
            if (isQueryString) {
                // const searchParams = objectToQueryString(params);
                // router.push(`${pathname}${searchParams}`);
            }

            let response = await api.get(url, params);
            let customResponse: any;

            if (onSuccess) {
                let aux: any = await onSuccess(response || null );
                if (aux) {
                    if (keepOriginalResponse) {
                        customResponse = {
                            original_response: response,
                            custom_data: aux
                        }
                    } else {
                        customResponse = aux
                    }
                }
            }


            if (customResponse) {
                return customResponse;

            } else {
                return response;
            }

        } catch (e) {
            throw e;
        }
    };

    const processInitialDataFn = () => {
        if (initialFn && serverData) {
            const returnedValue = initialFn(serverData);
            if (returnedValue) {
                return keepOriginalResponse
                    ? { original_response: serverData, custom_data: returnedValue }
                    : returnedValue;
            }
        }
        return serverData;
    };

    const queryOptions: MyQueryOptionsProps = {
        queryKey: queryKey,
        queryFn: getDataFn,
        placeholderData: keepPreviousData ? keep : undefined,
        enabled: enabled === null ? true : enabled,
        ...(serverData ? { initialData: initialFn ? () => processInitialDataFn() : serverData } : {}),
    };

    const queryResult = useQuery(queryOptions);


    const { data, isLoading, refetch, isFetching, isError, error } = queryResult ?? [];
    return { data, isLoading, refetch, isFetching, isError, error };
};
