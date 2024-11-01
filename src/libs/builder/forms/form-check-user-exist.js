import FormBuilder from "@/ui/components/builder/form-builder/form-builder";
import React from "react";
import {api} from "@/hooks/axios";
import {useMutation} from "@tanstack/react-query";
import {useRouter, useSearchParams} from "next/navigation";

export default function FormCheckUserExist(props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onSubmit = async (variables) => {
        const { cpf, clear } = variables

        if (clear || (data?.cpf === cpf)) {
            return {
                ...data,
                clear,
            }
        }


        try {
            if (data?.cpf !== cpf) {
                let res = await api.get(`check-cpf-full/${cpf}`, null, {isClub: true});

                if (res.object.exist) {
                    if(res.object.alias === process.env.NEXT_PUBLIC_APPLICATION_ALIAS) {
                        return {
                            hasAccount: true,
                            alias: res.object.alias,
                            application_name: res.object.application_name,
                            message: `Você já está cadastrado(a) no `,
                            cpf: cpf,
                        }
                    } else if (res.object.alias !== process.env.NEXT_PUBLIC_APPLICATION_ALIAS) {
                        return {
                            hasAccount: true,
                            alias: res.object.alias,
                            application_name: res.object.application_name,
                            message: `Você já tem uma conta conosco, a sua senha é a mesma do `,
                            cpf: cpf,
                        }
                    }
                } else {
                    if (props.setContinueRegister) {
                        props.setContinueRegister(true);
                    }
                }
            }
        } catch (e) {

        }
    }

    const redirectToLogin = () => {
        let qs = `cpf=${data?.cpf}`
        if (searchParams.has("callbackUrl")) {
            qs = qs + `&callbackUrl=${encodeURIComponent(searchParams.get("callbackUrl"))}`
        }

        router.push(`/login?${qs}`)
    }

    const { data , isPending, mutate } = useMutation({
        mutationKey:"check-user-exists",
        mutationFn: onSubmit
    })


    const meta = {
        col: " col-12 ",
        fields: [
            {
                type: "cpf",
                accessor: "cpf",
                label: "Digite seu CPF",
                disabled: isPending,
                autoFocus:true,
                placeholder: "CPF",
                onChange: (e) => {
                    if (e.value?.length === 11) {
                        mutate({cpf: e.value, clear:false})
                    } else {
                        if (data) {
                            mutate({clear:true});
                        }
                    }
                }

            },
        ]
    }



    return (
        <>
            <FormBuilder meta={meta}
                         onSubmit={mutate}
                         idForm={"check-user-exist"}
                         formKey={"check-user-exist"}
                         clearCacheUnmount={false}
            />

            {data?.hasAccount &&
                <div className={"mt-6"}>
                    <h4 className={"mb-10 text-center fw-normal"}>
                        {data?.message}
                        <span className={"text-secondary fw-bold"}>{data.application_name}!</span>
                    </h4>
                    <div className={"d-flex justify-content-end mt-4"}>
                        <button onClick={redirectToLogin} className={"btn btn-light-primary min-w-175px"}>
                            Fazer login
                        </button>
                    </div>
                </div>
            }
        </>
    )
}