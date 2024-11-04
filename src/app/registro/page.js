import FormBuilder from "@/libs/builder/form-builder";

export const metadata = {
    title: "Registro",
    description: "",
}

export default function page() {

    const meta = {
        col: "col-12",
        fields: [
            {
                type: "text",
                accessor: "business_name",
                label: "Nome da empresa",
                placeholder: "Nome fantasia",
                col: "col-md-6"
            },
            {
                type: "text",
                accessor: "employer_name",
                label: "Razão Social",
                placeholder: "Nome fantasia",
                col: "col-md-6"
            },
            {
                type: "number-format",
                accessor:"cpf",
                label: "CPF",
                props: {
                    format: "###.###.###-##",
                    placeholder: "Digite aqui...",
                },
                col: "col-md-6"
            },

            {
                type: "checkbox",
                accessor: "company_size",
                checkboxStyle: "dashed",
                loadingException: true,
                label:"Porte da empresa",
                options: [{label:"teste", value: 1}],
            },
        ],
    }

    return (
        <div className={"mt-15"}>
            <div className={"container"}>
                <FormBuilder meta={meta}/>
            </div>
        </div>
    )
}