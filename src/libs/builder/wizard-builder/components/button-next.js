"use client"

export function ButtonNext(props) {
    return (
        <button className={`btn btn-${props.type || "secondary"} col-12 col-md-4 col-lg-3`} {...props}>
            {props.title || "Próximo"}
        </button>
    )
}