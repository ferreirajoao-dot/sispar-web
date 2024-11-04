import React from "react";

const Input = React.memo((props: any) => {
    const {
        field,
        errors,
        config
    } = props;

    const {
        placeholder,
    } = config;

    console.log(`Render ${config.type.toUpperCase() || "text"} ->`, field.name);

    return <input {...field}
                  className={`form-control ${errors ? "is-invalid" : ""}`}
                  placeholder={placeholder || ""}
                  id={field.name}
                  value={field?.value || ""}
                  type={config.type}
                  disabled={config?.disabled}
                  maxLength={config.maxLength}
    />
});

export default Input;
