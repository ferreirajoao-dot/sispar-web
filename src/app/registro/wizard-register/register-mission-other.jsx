import FormBuilder from "@/libs/builder/form-builder";

function RegisterMissionOther() {

    const config = {
        col: "col-md-12",
        fields: [
            {
                label: "Missão",
                type: "textarea",
                accessor: "field1",
                placeholder: "Fale um pouco mais sobre sua missão",
                helperInput: "Diga com suas palavras para que sua entidade existe.",

            },
            {
                accessor: "field2",
                type: "textarea",
                label: "Objetivos",
                placeholder: "Fale um pouco mais sobre seus objetivos",
                helperInput: "Diga com suas palavras o que sua entidade quer fazer.",
            },
            {
                render: () => {
                    return (
                        <div className={"border-bottom mt-2"}>
                            <p >Em relação a <strong>Recursos Humanos</strong>, responda:</p>
                        </div>
                    )
                }
            },
            {
                accessor: "field3",
                type: "number",
                label: "Funcionários:",
                col: "col-md-4",
                addClassName: "mw-125px text-center",
            },
            {
                accessor: "field4",
                type: "number",
                label: "Voluntários:",
                col: "col-md-4",
                addClassName: "mw-125px text-center",
            },
            {
                accessor: "field5",
                type: "number",
                label: "Outros:",
                col: "col-md-4",
                addClassName: "mw-125px text-center",
            },
            {
                render: () => {
                    return (
                        <div className={"border-bottom mt-2"}>
                            <p >Quantas pessoas foram <strong>beneficiadas</strong> no último ano?</p>
                        </div>
                    )
                }
            },
            {
                accessor: "field6",
                type: "number",
                label: "Diretamente:",
                col: "col-md-4",
                addClassName: "mw-125px text-center"
            },
            {
                accessor: "field7",
                type: "number",
                label: "Indiretamente:",
                col: "col-md-4",
                addClassName: "mw-125px text-center"
            },
            {
                type: "submit",
                text: "Próximo",
            },
        ]
    }
    return (
        <div className={"card"}>
            <div className="card-body">
                <FormBuilder config={config} onSubmit={(data) => {
                    console.log(data)
                }}/>
            </div>
        </div>
    )
}

export default RegisterMissionOther