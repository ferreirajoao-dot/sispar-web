import React from "react";

const Checkbox = React.memo((props: any) => {
    const {
        field,
        errors,
        config
    } = props;

    const {
        options,
    } = config;

    console.log(`Render ${config.type.toUpperCase() || "text"} ->`, field.name);

    if (options?.length > 0) return (
        <div className={"row row-cols-auto mb-2 g-2"} >
            {options.map((option: { label: string  ; value: string | number}, index: React.Key | null | undefined) => {

                let isActive = field.value === option.value;
                return (
                    <div className="col" key={index}>
                        <label
                            className={`btn btn-outline btn-outline-dashed btn-sm btn-active-light-primary w-100 ${isActive ? "active" : ""
                            } ${errors ? "border-danger " : ""}`}
                        >
                            <input
                                type="radio"
                                className="btn-check"
                                // name={option.label}
                                ref={field.ref}
                                value={option.value}
                                onChange={() => field.onChange(option.value)}
                                checked={isActive}
                            />
                            <span className="fs-5">{option.label}</span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
});


export default Checkbox