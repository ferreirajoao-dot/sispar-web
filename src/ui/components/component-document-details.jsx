import ComponentSelectFile from "@/ui/components/component-select-file";
import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import api from "@/services/api";
import {useMutation} from "@tanstack/react-query";

export default function ComponentDocumentDetails(props) {
    const { data, color, refetch, activeStatus, isValidationStarted } = props;
    const identifier = data?.identifier;

    const [files, setFiles] = useState({});

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };
    const onSubmitFile =  async () => {
        const aux = files;

        if (aux[identifier]) {
            const { base64_file, base64_extension } = aux[identifier].lastAdded;
            const payload = {
                base64_file,
                base64_extension,
            };
            try {
                await api.put(`/restrict/entity-document/${identifier}`, payload);
                await refetch();
                delete aux[identifier];
                setFiles({...aux})
            } catch (e) {

            }
        }
    }

    const onAttachments = (attachment) => {
        const aux = files;
        if (attachment.action === "ADDED") {
            aux[identifier] = attachment;
        } else {
            delete aux[identifier];
        }

        setFiles({...aux})
    }

    const {mutate, isPending} = useMutation({
        mutationKey: "submit_file",
        mutationFn: onSubmitFile
    })

    return (
        <AnimatePresence mode="wait" initial={false}>
            {data && (
                <motion.div
                    key={data?.identifier} // chave única baseada no step atual
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    layout
                >
                    <div className={`card border-${color} card-bordered mb-10`}>
                        <div className={`card-header bg-${color}-subtle border-${color}`}>
                            <div className={`card-title text-${color}-emphasis`}>
                                {data?.document_type?.title}
                            </div>
                        </div>
                        <div className={"card-body"}>
                            <p className={"text-justify mb-0"}>{data?.document_type?.description}</p>
                        </div>
                        {activeStatus === "RETURNED" &&

                            <div className="card-footer">
                                <p className={"mb-0 text-end"}>
                                    <strong className={"text-danger"}>Motivo:</strong> {data?.status_note}
                                </p>
                            </div>
                        }
                    </div>

                    <div>
                        <ComponentSelectFile
                            onAttachments={(attachment) => onAttachments(attachment)}
                            maxFiles={1}
                            defaultValue={
                                files[identifier]?.lastAdded.image ? {
                                    title: files[identifier].lastAdded.note || "",
                                    file: files[identifier].lastAdded.image || "",
                                }
                                :
                                data.full_file_path ? {
                                    title: data.document_type.title,
                                    file: data.full_file_path
                                } : null
                            }
                            disableRemoveFiles={(isValidationStarted) || activeStatus === "APPROVED"}
                        />
                    </div>
                    {files[identifier] && (
                        <div className={"d-flex justify-content-end"}>
                            <button
                                className={"btn btn-sm btn-light-secondary mt-5"}
                                onClick={() => mutate()}
                                disabled={isPending}
                            >
                                {isPending ? "Salvando..." : "Salvar arquivo"}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
