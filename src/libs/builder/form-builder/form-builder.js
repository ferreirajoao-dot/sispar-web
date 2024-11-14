"use client"

import {Controller, useForm} from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Fields from "./fields";
import {FormBuilderContext} from "./form-builder-provider";

const FormBuilder = (props) => {

    const {
        config,
        isLoading,
        id,
        defaultValues,
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
        getValues,
    } = useForm({
        resolver: config?.schema ? yupResolver(config.schema) : null,
        defaultValues: defaultValues,
    });

    const { _registerForm } = React.useContext(FormBuilderContext);

    const onSubmit = React.useCallback(async (args) => {
        if (props?.onSubmit) {
            try {
                config.fields.forEach((item) => {
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
        }
    }, [])


    const RenderField = React.useCallback((item, controller) => {
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
    },[]);



    const RenderController = React.useMemo(() => {
        console.log("RenderController")

        return config?.fields?.map((item, index) => {
            const accessor = item.accessor || "";

            return (
                <div className={`${item.col || config?.col || "col-md-6"}`} key={index}>
                    <Controller name={accessor}
                                control={control}
                                render={(controller) => {
                                    // console.log("CONTROLLER", accessor)

                                    const isErrorField = controller.fieldState.error;

                                    return (
                                        <>
                                            {item.label &&
                                                <label className={"form-label"} htmlFor={controller.field.name}>
                                                    {item.label}
                                                </label>
                                            }

                                            {RenderField(item, controller)}

                                            {isErrorField ? <p className={"text-danger"}>{isErrorField.message}</p> : null}
                                        </>
                                    )
                                }}
                    />
                </div>

            )
        })
    },[config])

    React.useEffect(() => {
        if (id) {
            let payload = {
                watch,
                reset,
                errors,
                onValidateForm: async () => {
                    try {
                        let isValidForm = true;
                        const onError = () => {
                            isValidForm = false;
                        }
                        await handleSubmit(onSubmit, onError)();

                        if (isValidForm) {
                            return getValues()
                        } else {
                            throw "Invalid Form"
                        }
                    } catch (e) {
                        throw e
                    }
                },
                setValue
            }
            _registerForm(id, payload)
        }
    }, [errors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              id={id}
              className={`row ${config.gutter || "gy-3"}`}
        >
            {RenderController}
        </form>
    )
}

export default React.memo(FormBuilder)

