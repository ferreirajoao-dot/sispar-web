import photoPlaceHolder from '@images/photoPlaceholder.png';
import Image from "next/image";
import {KTIcon} from "@/libs/KTIcon/KTIcon";

export default function ComponentResumeEntity(props) {
    const data = {
        image: photoPlaceHolder,
        note: "TechForAll - Tecnologia para Todos",
    }

    return (
        <div className={"row"}>
            <div className="col-6">
                <div className="d-flex gap-3">
                    <div className="symbol symbol-100px shadow-sm">
                        <Image src={data.image} alt={""}/>
                    </div>
                    <div>
                        <p className={"h5"}>
                            {data.note}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="d-flex justify-content-end gap-2">
                    <div className={"border rounded-3 text-end px-5 py-3 position-relative bg-body shadow-sm"}>
                        <KTIcon name={"time"}
                                style={{fontSize:"3.25rem", zIndex:0, left:5}}
                                className={"position-absolute bottom-0 text-warning-emphasis mb-1"}
                        />
                        <span className={""}>Documentos pendentes</span>
                        <h2 className={"mb-0 text-warning-emphasis"}>
                            12
                        </h2>
                    </div>

                    <div className={"border rounded-3 text-end position-relative px-5 py-3 bg-body shadow-sm"}>
                        <KTIcon name={"check-circle"}
                                style={{fontSize:"3.25rem", zIndex:0, left:5}}
                                className={"position-absolute bottom-0 text-success-emphasis mb-1"}
                        />
                        <span>Documentos Enviados</span>
                        <h2 className={"mb-0 text-success-emphasis"}>
                            0
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}