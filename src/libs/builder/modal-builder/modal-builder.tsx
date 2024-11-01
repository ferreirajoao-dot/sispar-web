import React, { ReactNode, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

interface ModalBuilderProps {
    title?: string;
    closeButton?: boolean;
    children: ReactNode;
    size?: "sm" | "lg" | "xl";
    modal: boolean;
    setModal: (show: boolean) => void;
    bodyClassName?: string;
    header?: ReactNode;
    [key: string]: any;
}

const ModalBuilder: React.FC<ModalBuilderProps> = ({
                                                       title,
                                                       children,
                                                       closeButton,
                                                       size,
                                                       modal,
                                                       setModal,
                                                       loading,
                                                       setLoading,
                                                       bodyClassName,
                                                       header,
                                                       ...rest
                                                   }) => {
    return (
        <Modal size={size}
               show={modal}
               onHide={() => setModal(false)}
               centered
               {...rest}
        >
            {(closeButton && (!title || !header)) &&
                <div className={"position-absolute end-0 border-0 z-index-1 pe-2 pt-2"}>
                    <button type="button"
                            style={{backgroundSize: 14, width: "2rem", height: "2rem"}}
                            onClick={() => setModal(false)}
                            className="btn-close m-0" aria-label="Close">
                    </button>
                </div>

            }
            {title || header ? (
                <Modal.Header closeButton>
                    {title ? <Modal.Title>{title}</Modal.Title> : header}
                </Modal.Header>
            ) : (
                ""
            )}
            <Modal.Body className={bodyClassName || ""}>{children}</Modal.Body>
        </Modal>
    );
};

export default ModalBuilder;