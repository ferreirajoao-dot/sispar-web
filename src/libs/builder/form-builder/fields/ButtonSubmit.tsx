import React from "react"

interface ButtonSubmitProps {
    isSubmitting?: boolean,
    col: string,
    text: string,
    textLoading: string,
}

const ButtonSubmit = React.memo((props: ButtonSubmitProps) => {
    const {
        isSubmitting,
        col,
        text,
        textLoading,
    } = props


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
})

export default ButtonSubmit