"use client"

import { useForm } from "react-hook-form";
import React, { Fragment, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import FbConditionalWrapper from "./components/fb-conditional-wrapper";
import FbFields from ".//components/fb-fields";
import { useFormBuilder } from "./form-builder-provider";
import _ from "lodash";

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

    const Fields = useMemo(() => {
        return  (
            <>
                {meta.fields?.map((itemField, index) => {
                    let {
                        labelText,
                        item: item,
                    } = populateMapProps(itemField)

                    if (_.has(item, "showField")) {
                        if (!item.showField) {
                            return null
                        }
                    }

                    if (itemField) {
                        if (item.type === "submit") {
                            return (
                                <div key={index}
                                     className={(item.col ? item.col : "col") + " " + `d-flex justify-content-${item?.justify || "end"}`}>
                                    <button disabled={isSubmitting} className={"btn btn-primary"} type={"submit"}>
                                        {(isSubmitting) ?
                                            <div className={"d-flex flex-center gap-4"}>
                                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                                <span>{item?.labelLoading || "Salvando..."}</span>
                                            </div> :
                                            <>
                                                {/*A PROP SE CHAMA LABEL ou TEXT*/}
                                                {labelText}
                                            </>
                                        }
                                    </button>
                                </div>
                            )
                        }

                        if (item.type !== "hidden") return (
                            <div key={index}
                                 className={`${item?.col ? item.col : (meta?.col ? meta.col : "col-md-6")}` + ` ${item?.layout === "horizontal" ? "d-flex gap-3" : ""}`}>
                                <FbConditionalWrapper isParents={item?.parents?.fields?.length > 0}>

                                    <FbFields {...populateMapProps(itemField)}/>


                                    {item?.parents?.fields?.length > 0 &&
                                        <section className={"row gy-3"}>
                                            {item.parents?.fields?.map((parent, parentIndex) => {
                                                return <React.Fragment key={parentIndex}>
                                                    <div
                                                        className={parent?.col ? parent.col : (meta?.col ? meta.col : "col-12")}>
                                                        <FbFields {...populateMapProps(parent)} item={parent}/>
                                                    </div>

                                                </React.Fragment>

                                            })}
                                        </section>

                                    }
                                </FbConditionalWrapper>
                            </div>
                        )
                    }
                })}
            </>

        )
    }, [meta]);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}
              id={idForm || formKey || ""}
              className={`row ${meta.gutter || "gy-3"}`}
        >
            {Fields}
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
    formKey: PropTypes.string,
    idForm: PropTypes.string,
}

