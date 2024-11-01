"use client"
import React, {useMemo, useState} from "react"
import {Dropdown} from "react-bootstrap";
import {KTIcon} from "@/ui/components/ts/KTIcon";

const TbAnimatedDropdown = (props) => {
    const [show, setShow] = useState(false);

    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    let memoizedActions = useMemo(() => {
        return props.columns.find(column => column.type === "actions");
    }, []) ;

    const {actions} = memoizedActions ?? {}
    const {selected} = props ?? {}


    const CustomMenu = React.forwardRef(({ children, onClick, style }, ref) => (
        <div ref={ref}
             onClick={(e) => {
                 e.preventDefault();
                 onClick(e);
             }}
             style={style}
        >
            {children}
        </div>
    ));

    return (
        <Dropdown show={show} placement={"bottom"} onToggle={handleToggle}>
            <Dropdown.Toggle className="btn btn-icon btn-color-gray-500 btn-active-color-primary justify-content-end"
                             as={"button"}
                             id="dropdown-basic">
                <KTIcon iconType={"solid"}
                        iconName={"dots-vertical"}
                        size={"2x"}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu as={"ul"}>
                {actions?.map((action, index) => (
                    <Dropdown.Item as={"button"} key={index} onClick={() => action.onClick(selected)}>
                        {action.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TbAnimatedDropdown;
