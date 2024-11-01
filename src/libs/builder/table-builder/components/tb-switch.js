import {useEffect, useState} from "react";

export default function TBSwitch(props) {
    const {isChecked = false} = props ?? {}
    const [active, setActive] = useState(isChecked)

    useEffect(() => {
        setActive(isChecked)
    }, [isChecked]);
    return (
        <div className="form-check form-switch form-check-custom form-check-solid">
            <input className="form-check-input h-15px w-30px cursor-pointer"
                   type="checkbox"
                   value=""
                   onChange={({target: {checked}}) => {

                       setActive(!active)
                       if (props?.onChange) {
                           props?.onChange(checked)
                       }
                   }}
                   checked={active}
            />
            <label className="form-check-label" htmlFor="flexSwitchChecked">
            </label>
        </div>
    )

}