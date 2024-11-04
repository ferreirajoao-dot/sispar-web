import React from "react";

const Textarea = React.memo((props: any) => {
    const {
        field,
        errors,
        resize,
        placeholder
    } = props;

    console.log("Render TEXTAREA -> ", field.name);

    return (
        <textarea
            {...field}
            className={`form-control ${errors ? "is-invalid" : ""} ${resize ? "" : "resize-none"}`}
            placeholder={placeholder || ""}
            rows={5}
            id={field.name}
            value={field?.value || ""}
        ></textarea>
    );
});

export default Textarea;
