import React from "react";
import NumberFormat from "react-number-format";

const MaskedInput = React.memo((props: any) => {
    const {
        field,
        errors,
        config
    } = props;

    const {
        placeholder,
    } = config;


    return (
        <NumberFormat value={field?.value || ""}
                      getInputRef={field.ref}
                      id={field.name}
                      onValueChange={(e) => field.onChange(e.value)}
                      className={`form-control ${errors ? "is-invalid" : ""}`}
                      placeholder={placeholder || ""}
                      {...config.props}
        />
    )
});

export default MaskedInput;
