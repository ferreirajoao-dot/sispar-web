import FormBuilder, {useFormBuilder} from "@/libs/builder/form-builder";
import FormAddress from "@/libs/builder/forms/form-address";
import {useRef} from "react";

const RegisterDataEntity = () => {
    const formAddressRef = useRef(null);
    const form = useFormBuilder("play");

    console.log(form)

    const meta = {
        col: "col-12",
        fields: [
            {
                type: "text",
                accessor: "name_entity",
                label: "Nome da Entidade",
                placeholder: "Digite aqui...",
                col: "col-md-8"
            },
            {
                type: "cnpj",
                accessor:"cnpj",
                label: "CNPJ",
                placeholder: "Digite aqui...",
                col: "col-md-4"
            },
            {
                type: "text",
                accessor:"fund",
                label: "Data de Fundação",
                placeholder: "Digite aqui...",
                col: "col-md-4"
            },
            {
                type: "text",
                accessor: "sigla",
                label: "Sigla",
                placeholder: "Digite aqui...",
                col: "col-md-4"
            },


        ],
    }

    const onSubmit = () => {
        formAddressRef.current.onSubmit();
    }

    return (
        <div >
            <div className={"card"}>
                <div className={"card-body"}>
                    <section>
                        <h5>Identificação da Entidade</h5>
                        <FormBuilder meta={meta} id={"play"}/>
                    </section>

                    <section className={"mt-7"}>
                        <h5>Endereço</h5>
                        <FormAddress onSubmit={(data) => console.log("oie", data)}
                                     hideSubmitButton={true}
                                     ref={formAddressRef}
                        />
                    </section>
                    <div className="d-flex justify-content-end mt-7">
                        <button className={"btn btn-primary"} onClick={() => onSubmit()}>
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterDataEntity
