"use client";

import { useGetData } from "@/hooks/useGetData";
import React, { useState } from "react";
import ComponentSelectFile from "@/ui/components/component-select-file";
import { KTIcon } from "@/libs/KTIcon/KTIcon";

const status = {
    "PENDING-UPLOAD": "warning",
}
export default function ComponentDocuments(props) {
    const [activeDocument, setActiveDocument] = useState({});
    const [colorBadge, setColorBadge] = useState("")

    const onChangeActiveDocument = (data, index) => {
        const aux = data.object.entity_documents[index];
        onChangeBadgeColor(aux.status);
        setActiveDocument(aux)
    }

    const isActiveMenu = (id) => {
        if (activeDocument && (id === activeDocument?.document_type_id)) {
            return "text-secondary bg-light p-3 rounded-2 fw-bold"
        }
        return "text-gray-600 px-3"
    }

    const onChangeBadgeColor = (key) => {
        let color = status[key];
        setColorBadge(color);
    }

    const BadgeStatus = (props) => {
        const { status } = props

        switch (status) {
            case "PENDING-UPLOAD":
                 break;
            default:
                return null;
        }

        return (
            <div className={`btn btn-light-${colorBadge} d-flex flex-center`}>
                <KTIcon name={"time"} type={"outline"} className={"fs-5"}/>
                <span>Pendente</span>
            </div>
        )

    }

    const { data: identifier } = useGetData({
        queryKey: ["/restrict/entity-flow/paginate"],
        url: "/restrict/entity-flow/paginate",
        onSuccess: (response) => {
            if (response.object) {
                return response.object?.data[0].identifier;
            }
        },
        serverData: props.serverData.entityFlowProcessIdentifier,
    });

    const { data } = useGetData({
        queryKey: ["/restrict/entity-flow", identifier],
        url: `/restrict/entity-flow/${identifier}`,
        onSuccess: (response) => {
            onChangeActiveDocument(response, 0)
        },
        initialFn: (response) => {
            onChangeActiveDocument(response, 0)
        },
        serverData: props.serverData.entityFlowProcess,
        enabled: !!identifier,
    })

    return (
        <div className={"my-15"}>

            <div className="separator separator-dotted separator-content border-dark mt-15 mb-10">
                <span className="h4">Documentos</span>
            </div>
            <h5 className={"text-muted fw-normal mb-10"}>
                É necessário o envio dos seguintes documentos para realizar seu cadastro:
            </h5>

            <div className="d-flex gap-4">
                <div className="w-md-300px flex-shrink-0 position-relative">
                    <div className={"position-sticky"} style={{top: 100}}>
                        <div className="card overflow-auto hover-scroll" style={{maxHeight:"85vh"}}>
                            <div className={"card-body ps-3 pe-0 py-3"}>
                                <ul className="d-flex flex-column gap-3 list-style-none border-bottom-all">
                                    {data?.object?.entity_documents?.map((item, index) => {

                                        return (
                                            <li className={``} onClick={() => onChangeActiveDocument(data, index)} key={index}>
                                                <div className={`${isActiveMenu(item.document_type_id)} text-hover-secondary text-justify cursor-pointer`}>
                                                    {index + 1}. {item.document_type.title}
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex-grow-1"}>
                    <div className={`card card-dashed border-${colorBadge}`}>
                        <div className={`card-header bg-${colorBadge}-subtle border-${colorBadge}`}>
                            <div className={`card-title text-${colorBadge}-emphasis`}>
                                {activeDocument?.document_type?.title}
                            </div>
                            <div className="card-toolbar">
                                <BadgeStatus status={activeDocument?.status}/>
                            </div>
                        </div>
                        <div className={"card-body"}>
                            <p className={"text-justify mb-0"}>
                                {activeDocument?.document_type?.description}
                            </p>
                        </div>
                    </div>

                    <div className={"mt-10"}>
                        <ComponentSelectFile onAttachments={(e) => console.log(e)}
                                             maxFiles={1}
                        />
                    </div>
                    <div className={"d-flex justify-content-end"}>
                        <button className={"btn btn-sm btn-light-secondary mt-5"}>
                            Salvar arquivo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}