"use client";

import FormBuilder from "@/libs/builder/form-builder";
import WizardBuilder from "@/libs/builder/wizard-builder/wizard-builder";
import RegisterDataEntity from "@/app/registro/wizard-register/register-data-entity";
import {useRouter} from "next/navigation";


export default function Page() {

    const router = useRouter();
    const onSubmit = async (args) => {
        const payload = {
            ...args,
            payment_installment: 1,
            status: 'VALIDATION',
        }
        console.log(payload)
        try {
            const res = await api.post("club/order-request", payload, {isClub:true})

            router.push("/painel/cliente/minhas-demandas")

        } catch (e) {
            console.log("salve", e)
        }
        // controller.actions.next();
    }

    const meta = [
        {
            title: "Dados da entidade",
            description: "Dados sobre a ONG",
            element: (e) => <RegisterDataEntity controller={e}/>,
        },
        {
            title: "Estatuto",
        },
        {
            title: "Representante da Entidade",
        },
        {
            title: "Registros",
        },
        {
            title: "Missão e Outros",
        },
        {
            title: "Área de Atuação",
        },
    ]


    return (
        <div className={"container"}>
           <div className={"mt-15"}>
               <WizardBuilder meta={meta}/>
           </div>
        </div>
    );
}