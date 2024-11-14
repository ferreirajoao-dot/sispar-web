import FormBuilder, {useFormBuilder} from "@/libs/builder/form-builder";
import FormAddress from "@/libs/builder/forms/form-address";
import { useMemo, useRef } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name_entity: Yup.string().required('name_entity é obrigatório'),
});

const RegisterDataEntity = (props) => {
    const { onValidateForm } = useFormBuilder("dataEntity");
    const { actions } = props.controller

    const formAddressRef = useRef(null);


    const meta = useMemo( () => ({
        col: "col-12",
        schema: schema,
        fields: [
            {
                type: "text",
                accessor: "name",
                label: `Nome da Entidade`,
                placeholder: "Digite aqui...",
                col: "col-md-8"
            },
            {
                type: "cpf",
                accessor:"cpf",
                label: "CPF",
                placeholder: "Digite aqui...",
                col: "col-md-4"
            },
            // {
            //     type: "text",
            //     accessor:"fund",
            //     label: "Data de Fundação",
            //     placeholder: "Digite aqui...",
            //     col: "col-md-4"
            // },
            // {
            //     type: "text",
            //     accessor: "sigla",
            //     label: "Sigla",
            //     placeholder: "Digite aqui...",
            //     col: "col-md-4"
            // },
            {
                type: "email",
                accessor:"contact_mail",
                label: "Email",
                placeholder: "Digite aqui...",
                col: "col-md-4"
            },
        ],
    }),[]);


    const validateForms = async () => {
        const dataFormAddress = await formAddressRef.current.onValidateForm(true);
        const dataFormEntity = await onValidateForm(true);

        if (dataFormAddress && dataFormEntity) {
            // actions?.saveData({...dataFormEntity, ...dataFormEntity});
            // actions?.next();
        }

    }

    return (
        <div >
            <div className={"card"}>
                <div className={"card-body"}>
                    <section>
                        <h5>Identificação da Entidade</h5>
                        <FormBuilder config={meta}
                                     id={"dataEntity"}
                        />
                    </section>

                    <section className={"mt-7"}>
                        <h5>Endereço</h5>
                        <FormAddress hideSubmitButton={true}
                                     ref={formAddressRef}
                        />
                    </section>
                    <div className="d-flex justify-content-end mt-7">
                        <button className={"btn btn-primary"} onClick={validateForms}>
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterDataEntity
