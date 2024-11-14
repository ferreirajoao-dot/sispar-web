import React from "react";

const Input = React.memo((props: any) => {
    const {
        field,
        errors,
        config
    } = props;

    const {
        placeholder,
        type,
        disabled,
        maxLength,
        addClassName,
        isAllowNegative
    } = config;


    return <input {...field}
                  className={`form-control ${errors ? "is-invalid" : ""} ${addClassName || ""}`}
                  placeholder={placeholder || ""}
                  id={field.name}
                  value={field?.value || ""}
                  type={type}
                  disabled={disabled}
                  maxLength={maxLength}
                  min={isAllowNegative ? null : 0}
    />
});

export default Input;
