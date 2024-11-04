"use client"

import {Controller, useForm} from "react-hook-form";
import React, {  useEffect} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import { useFormBuilder } from "./hooks/useFormBuilder";
import Fields from "./fields";

const FormBuilder = (props) => {

    const {
        meta,
        isLoading,
        idForm,
        formKey,
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

    const formClient = useFormBuilder();


    const onSubmit = async(args) => {
        if (props.debug) {
            return 0
        }
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

    const onError = (err) => {
    }

    const populateMapProps = (item) => {
        let accessor = item.accessor;

        //label - pode ser uma string ou objeto {text?:string, label:string, className:string}
        let labelText =  item?.label?.text || item?.label
        let labelSubText =  item?.label?.subText
        let labelClassName =  item?.label?.className

        let inputHelperText = item?.helperText

        return {
            accessor,
            labelText,
            labelSubText,
            labelClassName,
            inputHelperText,
            control,
            isLoading,
            errors,
            setValue,
            defaultValues,
            reset,
            watch,
            item: item,
        }
    }

    const cacheForm = (formValues) => {
        let payload = {
            watch: formValues,
            reset: reset,
            errors: errors,
            submit: handleSubmit(onSubmit, onError),
            setValue
        }
        formClient.saveInCache(props?.formKey, payload)
    }

    useEffect(() => {

        const subscription = watch((formValues) => {
            if (props?.formKey) {
                cacheForm(formValues)
            }

        });
        return () => subscription.unsubscribe(); // Cleanup on unmount
    }, [watch, meta]);

    useEffect(() => {

        if (props?.formKey) {
            cacheForm(watch())
            if (clearCacheUnmount) {
                return () => formClient.clear(`${props?.formKey}`)
            }
        }
    }, []);

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
                return <Fields.ButtonSubmit {...fieldProps} {...isSubmitting}/>;
            case "custom":
                return item.render(field);
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}
              id={idForm || formKey || ""}
              className={`row ${meta.gutter || "gy-3"}`}
        >
            {meta.fields?.map((item, index) => {
                const accessor = item.accessor;
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
        </form>

    )
}
export default FormBuilder

FormBuilder.propTypes = {
    disableFormTag: PropTypes.bool,
    hookForm: PropTypes.object,
    isLoading: PropTypes.bool,
    defaultValues: PropTypes.object,
    clearCacheUnmount: PropTypes.bool,
    idForm: PropTypes.string,
}

