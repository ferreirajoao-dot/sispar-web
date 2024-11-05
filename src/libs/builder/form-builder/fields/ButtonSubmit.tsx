import React from "react"

interface ConfigProps {
    col?: string;
    textLoading?: string;
    text: string;
}

interface ButtonSubmitProps {
    isSubmitting?: boolean;
    config: ConfigProps;
}

const ButtonSubmit = (props: ButtonSubmitProps) => {
    const {
        isSubmitting,
        config
    } = props

    const {
        col,
        text,
        textLoading,
    } = config;


    return (
        <div className={(col ? col : "col") + " " + `d-flex justify-content-end`}>
            <button disabled={isSubmitting} className={"btn btn-primary"} type={"submit"}>
                {(isSubmitting) ?
                    <div className={"d-flex flex-center gap-4"}>
                        <div className="spinner-border spinner-border-sm" role="status"></div>
                        <span>{textLoading || "Salvando..."}</span>
                    </div> :
                    text
                }
            </button>
        </div>
    )
}

export default ButtonSubmit