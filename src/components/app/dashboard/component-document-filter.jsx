import React from "react";
import {KTIcon} from "@/libs/KTIcon/KTIcon";

export default function ComponentDocumentFilter(props) {
    const { activeStatus, onClick, status, count, disabled } = props
    const { color, key, label, icon } = status;


    function activeColor() {
        if (key === activeStatus) return `bg-${color}-subtle text-${color}-emphasis border-${color}`;

        return `bg-gray-100 ${disabled ? "" : "bg-hover-gray-200"} border-hover-gray-500`;
    }

    return (
        <div className="col" >
            <button className={activeColor() + " btn-reset border rounded-3 py-3 px-2 position-relative d-flex flex-center gap-2"}
                    disabled={disabled}
                    suppressHydrationWarning
                    onClick={() => onClick(key)}
            >
                {icon && <KTIcon name={icon} className={`text-${color}-emphasis`}/>}
                {label}
                <span className={`position-absolute top-0 start-100 translate-middle badge badge-circle badge-${color}`}>
                    {count}
                </span>
            </button>
        </div>


    )
}