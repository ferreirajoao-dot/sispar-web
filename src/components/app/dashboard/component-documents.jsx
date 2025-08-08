"use client";

import {useGetData} from "@/hooks/useGetData";
import React, { useState } from "react";
import {KTIcon} from "@/libs/KTIcon/KTIcon";
import api from "@/services/api";
import {useMutation} from "@tanstack/react-query";
import ComponentDocumentDetails from "@/components/app/dashboard/component-document-details";
import ComponentDocumentFilter from "@/components/app/dashboard/component-document-filter";
import ComponentDocumentApproved from "@/components/app/dashboard/component-document-approved";

import _ from "lodash";


const PENDING_UPLOAD = "PENDING-UPLOAD";
const WAITING_VALIDATION = "WAITING-VALIDATION";
const APPROVED = "APPROVED";
const RETURNED = "RETURNED";

const statusDocument = {
    [PENDING_UPLOAD]: {
        key: "PENDING-UPLOAD",
        color: "warning",
        label: "Pendente"
    },
    [WAITING_VALIDATION]: {
        key: "WAITING-VALIDATION",
        color: "primary",
        label: "Anexados"
    },
    [APPROVED]: {
        key: "APPROVED",
        color: "success",
        label: "Aprovado(s)"
    },
    [RETURNED]: {
        key: "RETURNED",
        color: "danger",
        label: "Recusado(s)"
    }
};

const allStatus = Object.keys(statusDocument).map(key => statusDocument[key].key);

const statusToFilter = Object.keys(statusDocument).map(key => ({
    label: statusDocument[key].label,
    value: statusDocument[key].key
}));

export default function ComponentDocuments(props) {
    const [status, setStatus] = useState(props.serverData.initialStatus || PENDING_UPLOAD);
    const [activeDocument, setActiveDocument] = useState({});

    const onChangeActiveDocument = (item) => {
        setActiveDocument({...item})
    }

    const filterResponseFn = (data) => {

        const sortedByStatus = {};
        const countStatus = {};
        const statusProcess =  {
            isDraft: data?.status === "DRAFT",
            isWaitingValidation: data?.status === "WAITING-VALIDATION",
            isValidating: data?.status === "VALIDATING",
            isReturned: data?.status === "RETURNED",
            isApproved: data?.status === "APPROVED",
        };

        allStatus.forEach((value) => {
            sortedByStatus[value] = data.entity_documents.filter((item) => item.status === value)
            sortedByStatus[value] = _.orderBy(sortedByStatus[value], ['document_type_id'], ['asc']);
            countStatus[value] = sortedByStatus[value].length
        });

        return {
            sortedByStatus,
            countStatus,
            statusProcess
        }
    }

    const handleSubmitValidation = async () => {
        try {

            if (countStatus[PENDING_UPLOAD] === 0) {
                await api.put(`/restrict/entity-flow/${identifier}`, {
                    status: "WAITING-VALIDATION",
                })
                await refetch()
            }

        } catch (e) {

        }
    }

    const isActiveMenu = (id) => {
        if (activeDocument && (id === activeDocument?.document_type_id)) {
            return "fw-bold "
        }
        return "text-gray-600 "
    }

    const statusDocumentToDisplay = () => {
        if (statusProcess?.isDraft) {
            return [PENDING_UPLOAD, WAITING_VALIDATION];
        } else if (statusProcess?.isReturned || statusProcess?.isWaitingValidation || statusProcess?.isValidating) {
            return [WAITING_VALIDATION, APPROVED, RETURNED];
        }
        return [];
    };

    function getStatusProcessText(status) {
        switch (status) {
            case "DRAFT":
                return "Aguardando anexo de documentos";
            case "WAITING-VALIDATION":
                return "O processo está aguardando validação";
            case "VALIDATING":
                return "O processo está em validação.";
            case "RETURNED":
                return "O processo foi restituído.";
            default:
                return "";
        }
    }

    const { data: identifier } = useGetData({
        queryKey: ["/restrict/entity-flow/paginate"],
        url: "/restrict/entity-flow/paginate",
        onSuccess: (response) => {
            if (response) {
                return response?.data[0].identifier;
            }
        },
        serverData: props.serverData.entityFlowProcessIdentifier,
    });

    const { data, refetch } = useGetData({
        queryKey: ["/restrict/entity-flow", identifier],
        url: `/restrict/entity-flow/${identifier}`,
        onSuccess: (response) => {
            const filtered = filterResponseFn(response.object);
            const { statusProcess, countStatus, sortedByStatus } = filtered;

            const isReturned = statusProcess?.isReturned;
            const returnedCount = countStatus[RETURNED];
            const waitingValidation = sortedByStatus[WAITING_VALIDATION];
            const returnedStatus = sortedByStatus[RETURNED];

            if (isReturned) {
                if (returnedCount > 0) {
                    setStatus(RETURNED);
                    onChangeActiveDocument(returnedStatus[0]);
                } else {
                    setStatus(WAITING_VALIDATION);
                    onChangeActiveDocument(waitingValidation[0]);
                }
            } else if (returnedStatus.length === 1) {
                setStatus(WAITING_VALIDATION);
                onChangeActiveDocument(waitingValidation[0]);
            } else {
                onChangeActiveDocument(sortedByStatus[status][0]);
            }

            return filtered
        },
        initialFn: (response) => {
            const filtered = filterResponseFn(response.object);
            onChangeActiveDocument(filtered.sortedByStatus[status][0])

            return filtered
        },
        serverData: props.serverData.entityFlowProcess,
        keepOriginalResponse: true,
        enabled: !!identifier,
    });

    const { mutate, isPending} = useMutation({
        mutationKey: "submit_process",
        mutationFn: handleSubmitValidation
    })
    
    const { custom_data } = data ?? {}
    const { sortedByStatus, countStatus, statusProcess } = custom_data ?? {}

    if (statusProcess?.isApproved || props.serverData.isApproved) {
        return (
            <div>
                <ComponentDocumentApproved/>
            </div>
        )
    }

    return (
        <div className={"my-15"}>

            <div className="separator separator-dotted separator-content border-dark mt-15 mb-5">
                <span className="h4">Documentos</span>
            </div>
            <p className={"text-muted fw-normal mb-10 text-center"}>
                É necessário o envio dos seguintes documentos para realizar seu cadastro:
            </p>

            <div className={"d-flex justify-content-end pb-5"}>
                <span>Status: <strong className={"fw-bold"}> {getStatusProcessText(data?.original_response?.object?.status)}</strong></span>
            </div>

            <div className={"d-flex justify-content-between  mb-5"}>
                <div className={"row row-cols-auto align-items-center"}>
                    {statusToFilter.map((item, index) => {

                        if (!statusDocumentToDisplay()?.includes(item.value)) {
                            return null;
                        }

                        if (!statusProcess?.isDraft && item.value === WAITING_VALIDATION && !statusProcess?.isReturned) {
                            statusDocument[item.value].label = "Aguardando validação"
                        }


                        return (
                            <React.Fragment key={index}>
                                <ComponentDocumentFilter status={statusDocument[item.value]}
                                                         count={countStatus[item.value]}
                                                         activeStatus={status}
                                                         disabled={countStatus[item.value] === 0}
                                                         onClick={(key) => {
                                                             setStatus(key)
                                                             if (sortedByStatus[key].length > 0) {
                                                                 onChangeActiveDocument(sortedByStatus[key][0])
                                                             } else {
                                                                 onChangeActiveDocument(null)
                                                             }
                                                         }}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>

                <div>
                    {((statusProcess?.isDraft || statusProcess?.isReturned) && status === WAITING_VALIDATION) &&
                        <button className={"btn btn-success btn-sm"}
                                onClick={mutate}
                                disabled={countStatus[PENDING_UPLOAD] !== 0 || isPending}>
                            {isPending ? "Iniciando..." : "Iniciar validação"}
                        </button>
                    }
                </div>
            </div>

            <div className="d-flex gap-4">
                <div className="w-md-300px flex-shrink-0 position-relative">
                    <div className={"position-sticky"} style={{top: 100}}>
                        <div className="card hover-scroll-overlay-y" style={{maxHeight: "85vh"}}>
                            <div className={"card-body ps-5 pe-3 py-3"}>
                                <ul className="d-flex flex-column gap-3 list-style-none border-bottom-all">
                                    {sortedByStatus?.[status]?.map((item, index) => {

                                        return (
                                            <li onClick={() => onChangeActiveDocument(item)} key={index}>
                                                <p className={`${isActiveMenu(item.document_type_id)} mb-0 fs-7 text-hover-secondary  cursor-pointer`}>
                                                    <KTIcon
                                                        name={item.document_type_id === activeDocument?.document_type_id ? "arrow-right" : ""}
                                                        className={"me-1"}/>
                                                    {item.document_type.title}
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex-grow-1"}>
                    <ComponentDocumentDetails data={activeDocument}
                                              color={statusDocument[status].color}
                                              refetch={refetch}
                                              activeStatus={status}
                                              isValidationStarted={statusProcess?.isWaitingValidation || statusProcess?.isValidating}
                    />
                </div>
            </div>
        </div>
    )
}