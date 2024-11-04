import React from "react";

const Select = (props: any) => React.useMemo(() => {
    const { options, field } = props;

    return <select className={"form-select"} {...field}>
        {props.config.options.map((option: { value: string | number | readonly string[] | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
}, [props])

export default Select;