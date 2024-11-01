"use client"

import React from 'react';
import {Masks} from "../../utils/masks";

const PhoneInput = ({ onValueChange, controller  }) => {

    function applyMask (number) {
        const formatted = Masks.dynamicMaskPhone(number)

        if (onValueChange) {
            onValueChange({
                value: Masks.onlyDigits(number),
                formattedValue: formatted,
            })
        }
    }

    return (
        <input {...controller.field}
               onChange={(e) => applyMask(e.target.value)}
               className={`form-control ${controller?.formState?.errors[controller.field.name] ? " is-invalid" : " "}`}
               value={Masks.dynamicMaskPhone(controller.field.value)}
               name={controller.field.name || "phone_numbers"}
               id={controller.field.name || "phone_numbers"}
               type={"tel"}
               maxLength={15}
               placeholder={"Digite seu telefone"}
        />
    );
};


export default PhoneInput;