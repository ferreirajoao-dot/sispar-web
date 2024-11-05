"use client"

import {Controller, useForm} from "react-hook-form";
import React, {useCallback, useEffect, useMemo} from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useFormBuilder } from "./hooks/useFormBuilder";
import Fields from "./fields";
import {FormBuilderContext} from "./form-builder-provider";

const FormBuilder = (props) => {

    const {
        meta,
        isLoading,
        id,
        defaultValues,
        clearCacheUnmount = true,
    } = props;

    const {
        control,
        handleSubmit,
        formState: {
            errors ,
            isSubmitting,
        },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: meta.schema ? yupResolver(meta.schema) : null,
        defaultValues: defaultValues,
    });

    const onSubmit = async(args) => {
        if (props.onSubmit) {
            try {
                meta.fields.forEach((item) => {
                    if (item.ignore === true) {
                        if (item.accessor) {
                            delete args[item.accessor]
                        }
                    }
                })
                await props.onSubmit(args);
                reset();
            } catch (e) {

            }
        } else {
        }
    }

    const renderField = (item, controller) => {
        const { field } = controller;
        const errors = controller.fieldState.error;

        const fieldProps = {
            config: item,
            field,
            errors,
        }
        switch (item.type) {
            case "text":
            case "email":
                return <Fields.Input {...fieldProps}/>;
            case "textarea":
                return <Fields.Textarea {...fieldProps}/>;
            case "number-format":
                return <Fields.MaskedInput {...fieldProps}/>;
            case "select":
                return <Fields.Select {...fieldProps}/>;
            case "checkbox":
                return <Fields.Checkbox {...fieldProps}/>;
            case "submit":
                return <Fields.ButtonSubmit {...fieldProps}
                                            isSubmitting={isSubmitting}
                />;

            //BR FIELDS
            case "cnpj":
            case "cpf":
                return <Fields.MaskedInput {...fieldProps}
                                           config={{
                                               ...item,
                                               props: {
                                                   ...item?.props,
                                                   format: item.type === "cnpj" ? "##.###.###/####-##" : "###.###.###-##",
                                               }
                                           }}
                />;
            case "custom":
                return item.render(field);
            default:
                return null;
        }
    };

    const RenderControllerFields = useMemo(() => {

        console.log("RenderController")
        return (
            <>
                {meta.fields?.map((item, index) => {
                    const accessor = item.accessor || "";

                    return (
                        <Controller name={accessor}
                                    key={index}
                                    control={control}
                                    render={(controller) => (
                                        <div className={`${item.col || meta?.col || "col-md-6"}`}>
                                            {item.label &&
                                                <label className={"form-label"} htmlFor={controller.field.name}>
                                                    {item.label}
                                                </label>
                                            }

                                            {renderField(item, controller)}
                                        </div>
                                    )}
                        />
                    )
                })}
            </>
        )
    }, [meta]);
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}
              id={id}
              className={`row ${meta.gutter || "gy-3"}`}
        >
            {RenderControllerFields}
        </form>

    )
}
export default React.memo(FormBuilder)

