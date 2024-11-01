
"use client"

import FbSelectFile from "./fb-select-file";
import NumberFormat from "react-number-format";
import { Controller } from "react-hook-form";
import React, { useMemo } from "react";

import PhoneInput from "../../components/components-phone-number-input";

import SelectBuilder from "../../select-builder/select-builder";

const FbFields = (props) => {
    const {
        accessor= "",
        labelText,
        labelSubText,
        labelClassName,
        inputHelperText,
        defaultValues,
        control,
        isLoading,
        errors,
        item,
        setValue,
    } = props


    const Label = useMemo(() => {
        if (labelText) {
            return (
                <div>
                    <label htmlFor={`${accessor}`} className={`${labelSubText ? 'mb-0' : ''} ${labelClassName || 'form-label'}`}>
                        {labelText}
                    </label>
                    {labelSubText && (
                        <p className={'mb-2'}>
                            <small className={'text-muted'}>{labelSubText}</small>
                        </p>
                    )}
                </div>
            );
        }
        return null;
    }, [accessor, labelText, labelSubText, labelClassName]);



    return (
        <React.Fragment>

            {((item.type === "checkbox" && item.options?.length > 0) || item.type !== "checkbox") && Label}
            <Controller
                control={control}
                name={accessor}
                render={(controller) => {
                    const { field } = controller;
                    const errors = controller.fieldState.error;

                    const renderField = () => {
                        if (item?.type === "custom") {
                            return item.element ? item.element(controller, defaultValues) : "Adiciona o element!!!";
                        }

                        if (isLoading && item?.loadingException !== true) {
                            return (
                                <div className={"position-relative"}>
                                    <input disabled={true} className={`form-control`} />
                                    <div className={"bottom-0 d-flex end-0 flex-center me-3 position-absolute top-0"}>
                                        <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                                    </div>
                                </div>
                            );
                        }

                        switch (item.type) {
                            case "select-image":
                                let defaultAvatar;
                                if (item?.accessorEdit && props?.defaultValues) {
                                    let path = props?.defaultValues[item?.accessorEdit];
                                    if (item?.s3) {
                                        let fullUrl;
                                        switch (item.s3) {
                                            case "crafty":
                                                // fullUrl = S3Crafty(path);
                                                break;
                                            case "logo-crafty":
                                                // fullUrl = S3LogoCrafty(path);
                                                break;
                                            default:
                                                fullUrl = null;
                                        }
                                        defaultAvatar = fullUrl;
                                    }
                                }
                                return (
                                    <div className={"col"}>
                                        <FbSelectFile
                                            attachments={(e) => setValue(accessor, e)}
                                            maxAttachments={1}
                                            multipleFiles={false}
                                            actionSheet={false}
                                            onlyImage={true}
                                            showOnlyText={false}
                                            onlyBase64={item?.onlyBase64}
                                            mode={"avatar"}
                                            sizeAvatar={item?.sizeAvatar}
                                            avatar={defaultAvatar}
                                        />
                                    </div>
                                );
                            case "text":
                            case "email":
                                return (
                                    <input
                                        {...field}
                                        className={`form-control ${errors ? "is-invalid" : ""}`}
                                        placeholder={item.placeholder ?? ""}
                                        id={`${accessor}`}
                                        type={item.type === "text" ? "text" : "email"}
                                        value={field?.value || ""}
                                        disabled={item?.disabled}
                                        maxLength={item.maxLength}
                                    />
                                );
                            case "textarea":
                                return (
                                    <textarea
                                        {...field}
                                        className={`form-control ${errors ? "is-invalid" : ""} ${item?.resize ? "" : "resize-none"}`}
                                        placeholder={item.placeholder}
                                        rows={5}
                                        id={accessor}
                                        aria-label={labelText}
                                        value={field?.value || ""}
                                    ></textarea>
                                );
                            case "select":
                                return (
                                    <SelectBuilder
                                        fieldController={controller}
                                        isClearable={true}
                                        accessor={accessor}
                                        accessorEdit={item?.accessorEdit}
                                        defaultValuesForm={defaultValues}
                                        placeholder={item.placeholder || "Selecione uma opção..."}
                                        onClickOption={item?.onClickOption}
                                        disableSearchQuery={item?.disableSearchQuery}
                                        {...item.props}
                                    />
                                );
                            case "checkbox":
                                if (item.options?.length > 0) return (
                                    <div className={"row row-cols-auto mb-2 g-2"} >
                                        {item.options.map((option, index) => {

                                            let isActive = controller.field.value === option.value;
                                            return (
                                                <div className="col" key={index}>
                                                    <label
                                                        className={`btn btn-outline btn-outline-dashed btn-sm btn-active-light-primary w-100 ${isActive ? "active" : ""
                                                        } ${errors ? "border-danger " : ""}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="btn-check"
                                                            name={option.label}
                                                            ref={controller.field.ref}
                                                            value={option.value}
                                                            onChange={(e) => controller.field.onChange(option.value)}
                                                            checked={isActive}
                                                        />
                                                        <span className="fs-5">{option.label}</span>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );

                                return (
                                    <div className={"form-check " + `${item.className || ""}`}>
                                        <input className="form-check-input"
                                               type="checkbox"
                                               id={`checkbox_${accessor}`}
                                               {...controller.field}
                                                checked={controller.field.value}
                                               onChange={(event) => {
                                                   controller.field.onChange(event.target.checked);
                                                   if (item.onChange) {
                                                      item.onChange(event.target.checked)
                                                   }
                                               }}
                                        />
                                        <label className="form-check-label" htmlFor={`checkbox_${accessor}`}>
                                            {labelText}
                                        </label>
                                    </div>
                                );
                            case "phones":
                                //Aceita tanto número FIXO como CELULAR
                                return (
                                    <PhoneInput
                                        defaultValue={controller.formState.defaultValues?.phone_numbers}
                                        onValueChange={(e) => {
                                            field.onChange(e.value)
                                        }}
                                        controller={controller}
                                    />
                                );
                            case "switch":
                                return (
                                    <div className="form-check form-switch gap-3 form-check-custom form-check-solid">
                                        <input
                                            className="form-check-input h-15px w-30px cursor-pointer"
                                            type="checkbox"
                                            id={`${accessor}_checkbox`}
                                            {...field}
                                            checked={!!field.value}
                                        />
                                        <label className="cursor-pointer" htmlFor={`${accessor}_checkbox`}>
                                        {item?.text}
                                        </label>
                                    </div>
                                );
                            case "number-format":
                                return (
                                    <>
                                        <NumberFormat
                                            value={field?.value || ""}
                                            getInputRef={field.ref}
                                            onValueChange={(values) => field.onChange(values.value)}
                                            id={`${accessor}`}
                                            className={`form-control ${errors ? "is-invalid" : ""}`}
                                            {...item.props}
                                        />
                                    </>
                                );
                            case "date":
                            case "time":
                                return (
                                    <NumberFormat
                                        className={`form-control bg-transparent ${errors ? "is-invalid" : ""}`}
                                        id={`${accessor}`}
                                        value={field?.value || ""}
                                        getInputRef={field.ref}
                                        format={item.type === "time" ? "##:##" : "##/##/####"}
                                        onValueChange={(values) => field.onChange(values.formattedValue)}
                                        placeholder={item.placeholder}
                                        {...item.props}
                                    />
                                );
                            case "price":
                                return (
                                    <NumberFormat
                                        id={accessor}
                                        value={field?.value || ""}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        prefix="R$ "
                                        allowNegative={false}
                                        isNumericString={true}
                                        getInputRef={field.ref}
                                        onValueChange={(values) => field.onChange(values.value)}
                                        placeholder={item?.placeholder || ""}
                                        className={`form-control bg-transparent ${errors ? "is-invalid" : ""}`}
                                    />
                                );
                            case "cpf":
                                return (
                                    <NumberFormat
                                        id={accessor}
                                        value={field?.value || ""}
                                        format="###.###.###-##"
                                        mask="_"
                                        getInputRef={field.ref}
                                        onValueChange={(values) => {
                                            field.onChange(values.value);
                                            if (item?.onChange) {
                                                item.onChange(values)
                                            }
                                        }}
                                        autoFocus={item.autoFocus}
                                        disabled={item.disabled}
                                        placeholder={item.placeholder}
                                        className={`form-control ${errors ? "is-invalid" : ""}`}
                                    />
                                );
                            case "range":
                                return (
                                    <div>
                                        <div className={"mw-200px"}>
                                            <input
                                                type="range"
                                                className={"form-range"}
                                                min={item?.min || 1}
                                                max={item?.max || 10}
                                                {...field}
                                            />
                                        </div>
                                    </div>
                                );
                            case "number":
                                return (
                                    <input
                                        {...field}
                                        className={`form-control ${errors ? "is-invalid" : ""}`}
                                        placeholder={item.placeholder ?? ""}
                                        id={`${accessor}`}
                                        type={"number"}
                                        value={field?.value || ""}
                                        disabled={item?.disabled}
                                        min={item.min}
                                    />
                                );
                            default:
                                return null;
                        }
                    };

                    return (
                        <div>
                            {renderField()}
                            {errors?.message &&
                                <div className="invalid-feedback d-block"><span>{errors?.message}</span></div>
                            }
                            {inputHelperText && <div className={"mt-1"}>
                                <small className={"text-muted"}>{inputHelperText}</small>
                            </div>
                            }
                        </div>
                    );
                }}
            />
        </React.Fragment>
    );
}

export default FbFields
