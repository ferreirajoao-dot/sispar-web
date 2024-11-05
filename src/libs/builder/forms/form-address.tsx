"use client";

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import NumberFormat from "react-number-format";
import api from "@/services/api";
import {capitalize} from "@/utils/functions";

export const fieldsFormAddress = {
    street_name: "street_name",
    street_number: "street_number",
    cep: "cep",
    district: "district",
    city: "city",
    country: "country",
    state: "state",
    complement: "complement",
    city_id: "city_id",
};

interface FormAddressProps {
    onSubmit: (data: any) => void;
    customNameFields?: Partial<typeof fieldsFormAddress>;
    defaultValue?:  Partial<typeof fieldsFormAddress>;
    hideSubmitButton?: boolean;
}

interface FormAddressData {
    [key: string]: string;
}

const FormAddress = forwardRef((props: FormAddressProps, ref) => {
    // Customizar os nomes dos campos com base na prop `customNameFields` ou usar os padrões
    const fieldNames = {
        ...fieldsFormAddress,
        ...props.customNameFields
    };

    // Schema de validação usando Yup com os nomes customizados
    const addressSchema = Yup.object().shape({
        [fieldNames.cep]: Yup.string().required('CEP é obrigatório').length(8, 'CEP deve ter 8 dígitos'),
        [fieldNames.street_name]: Yup.string().required('Rua é obrigatória'),
        [fieldNames.street_number]: Yup.string().required('Número é obrigatório'),
        [fieldNames.district]: Yup.string().required('Bairro é obrigatório'),
        [fieldNames.city]: Yup.string().required('Cidade é obrigatória'),
        [fieldNames.state]: Yup.string().required('Estado é obrigatório'),
        [fieldNames.complement]: Yup.string().optional(),
    });

    const {
        control,
        handleSubmit,
        watch,
        clearErrors,
        formState: {
            errors ,
            isSubmitting,
        },
        reset ,
    } = useForm<FormAddressData | any>({
        resolver: yupResolver(addressSchema),
        defaultValues: props.defaultValue
    });

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);



    const onSubmit: SubmitHandler<FormAddressData> = (data) => {
        props.onSubmit(data);
    };

    const onError = (e: any) => {
        console.log(e)
    }

    const checkCEP = async (cep: string | any) => {
        setIsFetching(true)
        if (errors) {
            clearErrors()
        }
        try {
            let res = await api.get(`search/cep/${cep}`, {}, {isClub:true})
            const { object } = res
            let aux = {
                [fieldNames.street_name]: capitalize(object?.street),
                [fieldNames.district]: capitalize(object?.district),
                [fieldNames.city]: capitalize(object?.city_name),
                [fieldNames.country]: object?.country,
                [fieldNames.state]: object?.state_uf,
                [fieldNames.cep]: cep,
                [fieldNames.city_id]: object?.city_id,
            }


            reset(aux)
        } catch (e) {
        } finally {
            setIsFetching(false)
        }

    }

    const Label = (props: {text:string, name: string}) => {
        const { text, name } = props
            return (
            <label htmlFor={name} className={"form-label"}>
                {text}
            </label>
        )
    }

    const ErrorMessage = (props: { name: string}) => {
        const { name } = props

        return (
            <small className={`${errors[name]?.message ? 'invalid-feedback d-block' : ''} mt-2`}>
                {/*// @ts-ignore*/}
               {errors[name]?.message}
            </small>
        )
    }

    const Loading = () => {
        if (isFetching) return (
            <div className={"position-absolute end-0 top-0 bottom-0 d-flex flex-center me-4"}>
                <div className="spinner-border spinner-border-sm text-gray-700" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    useImperativeHandle(ref, () => ({
        resetForm: () => reset(),
        onSubmit() {

            if (submitButtonRef.current) {
                submitButtonRef.current.click()
            }
        }
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={"row gy-4"} noValidate>
            <Controller
                name={fieldNames.cep}
                control={control}
                defaultValue=""
                render={({field}) => {
                    const name = field.name;
                    const isInvalid = errors[name];

                    return (
                        <div className={"col-12"}>
                            <Label text={"CEP"}
                                   name={name}
                            />
                            <NumberFormat id={name}
                                          name={name}
                                          value={field.value}
                                          disabled={isFetching}
                                          onValueChange={async (e: { value: string | any[]; }) => {
                                              field.onChange(e.value)
                                              if (e.value.length === 8) {
                                                  await checkCEP(e.value)
                                              }
                                          }}
                                          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
                                          placeholder={`XX XXX-XXX`}
                                          getInputRef={field.ref}
                                          format={'##.###-###'}
                            />
                            <ErrorMessage name={name}/>
                        </div>
                    )
                }}
            />

            {/* Inputs adicionais que só aparecem quando o CEP é válido */}
            {watch(fieldNames.cep)?.length === 8 && (
                <>
                    <Controller
                        name={fieldNames.street_name}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 col-md-8"}>
                                    <Label text={"Rua"}
                                           name={name}
                                    />

                                    <div className={"position-relative"}>
                                        <input {...field}
                                               id={name}
                                               name={name}
                                               disabled={isFetching}
                                               placeholder="Rua"
                                               className={`form-control ${isInvalid ? "is-invalid" : ""}`}
                                        />
                                        <Loading/>
                                    </div>

                                    <ErrorMessage name={name}/>

                                </div>
                            )
                        }}
                    />
                    <Controller
                        name={fieldNames.street_number}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 col-md-4 "}>
                                    <Label text={"Número"}
                                           name={name}
                                    />
                                    <input {...field}
                                           id={name}
                                           type="number"
                                           name={name}
                                           placeholder="Número"
                                           className={`form-control ${isInvalid ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage name={name}/>

                                </div>
                            )
                        }}

                    />
                    <Controller
                        name={fieldNames.district}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 col-md-12"}>
                                    <Label text={"Bairro"}
                                           name={name}
                                    />

                                    <div className="position-relative">
                                        <input {...field}
                                               id={name}
                                               disabled={isFetching}
                                               name={name}
                                               placeholder="Bairro"
                                               className={`form-control ${isInvalid ? "is-invalid" : ""}`}

                                        />
                                        <Loading/>
                                    </div>

                                    <ErrorMessage name={name}/>

                                </div>

                            )
                        }}
                    />
                    <Controller
                        name={fieldNames.city}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 col-md-6"}>
                                    <Label text={"Cidade"}
                                           name={name}
                                    />
                                    <div className="position-relative">
                                        <input {...field}
                                               id={name}
                                               disabled={isFetching}
                                               name={name}
                                               placeholder="Cidade"
                                               className={`form-control ${isInvalid ? "is-invalid" : ""}`}

                                        />
                                        <Loading/>
                                    </div>

                                    <ErrorMessage name={name}/>

                                </div>
                            )
                        }}
                    />
                    <Controller
                        name={fieldNames.state}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 col-md-6"}>
                                    <Label text={"Estado"}
                                           name={name}
                                    />
                                    <div className={"position-relative"}>
                                        <input {...field}
                                               id={name}
                                               disabled={isFetching}
                                               name={name}
                                               placeholder="Estado"
                                               className={`form-control ${isInvalid ? "is-invalid" : ""}`}

                                        />
                                        <Loading/>
                                    </div>

                                    <ErrorMessage name={name}/>
                                </div>
                            )
                        }}
                    />
                    <Controller
                        name={fieldNames.complement}
                        control={control}
                        defaultValue=""
                        render={({field}) => {
                            const name = field.name;
                            const isInvalid = errors[name];

                            return (
                                <div className={"col-12 "}>
                                    <Label text={"Complemento"}
                                           name={name}
                                    />
                                    <input {...field}
                                           id={name}
                                           name={name}
                                           placeholder="Complemento"
                                           className={`form-control ${isInvalid ? "is-invalid" : ""}`}

                                    />
                                    <ErrorMessage name={name}/>

                                </div>
                            )
                        }}
                    />
                </>
            )}
            <div className={`col-12 text-center ${props.hideSubmitButton ? "d-none" : ""}`}>
                <button type="submit"
                        id={"submit_address"}
                        ref={submitButtonRef}
                        className="btn btn-primary col-12 col-lg-4">
                    Salvar Endereço
                </button>
            </div>
        </form>
    );
});

export default FormAddress;
