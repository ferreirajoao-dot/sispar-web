"use client"

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import NumberFormat from "react-number-format";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button} from "react-bootstrap";
import {api} from "@/hooks/axios";
import ErrorMessageComponent from "@/ui/components/components-error-message";
import FbLayout from "@/ui/components/builder/form-builder/components/fb-layout";
import PropTypes from "prop-types";
import FbSpinnerLoading from "@/ui/components/builder/form-builder/components/fb-spinner-loading";
import {fieldsFormAddress} from "@/json/utility-objects";

const generateSchema = (fields) => {
    return {
        [fields.cep]: yup.string().required('Informe seu CEP').min(8, 'Insira um CEP válido'),
        [fields.street_number]: yup.number().required('Informe o número do endereço').integer('Insira um número inteiro').typeError('Informe o número do endereço').min(1, 'O número deve ser diferente de zero'),
        [fields.city]: yup.string().required('Informe a cidade do endereço'),
        [fields.state]: yup.string().required('Informe seu estado'),
        [fields.street_name]: yup.string().required('Informe o nome da rua do endereço'),
        [fields.district]: yup.string().required('Informe nome do bairro do endereço'),
    }
}

export const FormsAddress = forwardRef((props, ref) => {
    const {
        action,
        isEdit,
        rootHookForm,
        accessor,
        customNameFields,
        defaultValues,
        isLoading,
        hideSubmitButton
    } = props;


    const [loading, setLoading] = useState(false);
    const [disableFormTag] = useState(!!rootHookForm);
    const key = accessor ? `${accessor}.` : "";
    const disableInitialSearch = useRef(action === "update")

    // const addressSchema = yup.object().shape(yupSchema.crafty().address);
    const [fetchingDataLoading, setFetchingDataLoading] = useState(isLoading)

    const [fields] = useState({
        ...fieldsFormAddress,
        ...customNameFields
    })
    const addressSchema = yup.object().shape(generateSchema(fields));


    const {
        register,
        getValues,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        clearErrors,
        formState: {errors,}
    } = rootHookForm ?? useForm({resolver: yupResolver(addressSchema)});


    const onError = (e) => {
        console.log(e)
    }

    const checkCEP = async (cep) => {
        setLoading(true)
        if (errors) {
            clearErrors()
        }
        try {
            let res = await api.get(`search/postal-code?cep=${cep}`)

            let aux = {
                [fields.street_name]: res?.street_name,
                [fields.district]: res?.district,
                [fields.city]: res?.city,
                [fields.country]: res?.country,
                [fields.state]: res?.state,
                [fields.cep]: cep,
            }

            let updateAddress = {
                ...getValues(),
                ...(accessor ? ({[accessor]: {...aux}}) : {...aux})
            }
            reset(updateAddress)
        } catch (e) {
        } finally {
            setLoading(false)
        }

    }

    const onSubmit = async (data) => {
        setLoading(true)
        let text = ''
        if (action === 'CHANGE_ADDRESS') {
            text = 'Alterando...'
        } else if (action === 'NEW_REGISTER') {
            text = 'Registrando...'
        } else {
            text = 'Enviando...'
        }

        try {

            if (props.onSubmit) {
                await props.onSubmit(data)
            } else {
                // if (action === 'CHANGE_ADDRESS' || action === 'NEW_REGISTER') {
                //     data.is_primary = true
                // }
                //
                // if (action === 'NEW_REGISTER') {
                //
                //     await api.post(`register/worker/${user.user_id}/address`, data)
                // }
            }


        } catch (e) {
        } finally {
            setLoading(false)
        }
    }

    const checkErrorField = (key) => {
        if (accessor) {
            return {
                className:`form-control ${errors?.[accessor]?.[key] ? 'is-invalid' : ''}`
            }
        } else {
            return {
                className:`form-control ${errors[key] ? 'is-invalid' : ''}`
            }
        }

    }

    useImperativeHandle(ref, () => ({
        submit() {
            const button = document.querySelector('#submit_address');

            if (button) {
                button.click()
            }
        },
    }));

    useEffect(() => {
        if (action === "update") {
            setFetchingDataLoading(false)
        }
    }, [isLoading]);
    return (
        <FbLayout as={disableFormTag} onSubmit={handleSubmit(onSubmit, onError)} id={`address_${action.toLowerCase()}`} className={'row'}>
            <div className='col-12  py-2'>
                <label className="form-label" htmlFor={`cep_${action.toLowerCase()}`}>CEP</label>

                <div className={'position-relative'}>
                    {loading && <div className="spinner-border spinner-border-sm text-dark" style={{position:"absolute", right:16, top:16}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}

                    <Controller name={`${key}${fields.cep}`}
                                control={control}
                                render={({field: {onChange, value,ref}}) => (
                                    <div className={"position-relative"}>
                                        <NumberFormat id={`cep_${action.toLowerCase()}`}
                                                      name={`cep`}
                                                      value={value}
                                                      disabled={fetchingDataLoading}
                                                      onValueChange={async (e) => {
                                                          onChange(e.value)
                                                          if (e.value.length === 8) {
                                                              if (disableInitialSearch.current !== true) {

                                                                  await checkCEP(e.value)
                                                              }

                                                              if (action === "update" && disableInitialSearch.current) {
                                                                  disableInitialSearch.current = false
                                                              }
                                                          }
                                                      }}
                                                      placeholder={`XX XXX-XXX`}
                                                      getInputRef={() => ref()}
                                                      format={'##.###-###'}
                                                      {...checkErrorField(`${fields.cep}`)}
                                        />

                                        <FbSpinnerLoading loading={fetchingDataLoading}/>
                                    </div>

                                )}
                    />
                </div>

                {checkErrorField(`${fields.cep}`) ?
                    <div className='mt-2'>
                        <ErrorMessageComponent accessor={accessor} name={`${fields.cep}`} errors={errors}/>
                    </div> :
                    <div className={'w-100 pt-1 text-end'}>
                        <span className={'text-primary'}>Informe o seu CEP para completar os dados</span>
                    </div>
                }
            </div>
            <div className={`col-12 ${isEdit ? 'd-flex' : (((watch()[accessor]?.[fields.cep]?.length === 8) || (watch()?.[fields.cep]?.length === 8) || action === "update") ? 'd-flex' : 'd-none') }`}>
                <div className={`row gy-2`}>
                    <div className={`col-12 col-md-8 `}>
                        <div className='col'>
                            <label className="form-label" htmlFor={`street_name_${action.toLowerCase()}`}>Rua</label>
                            <div className="position-relative">
                                <input type="text"
                                       disabled={loading || fetchingDataLoading}
                                       id={`street_name_${action.toLowerCase()}`}
                                       name={'Rua'}
                                       placeholder={'Rua'}
                                       {...register(`${key}${fields.street_name}`)}
                                       {...checkErrorField(`${fields.street_name}`)}
                                />
                                <FbSpinnerLoading loading={fetchingDataLoading}/>
                            </div>

                            <div className='mt-2'>
                                <ErrorMessageComponent accessor={accessor}
                                                       name={`${fields.street_name}`}
                                                       errors={errors}
                                />
                            </div>

                        </div>
                    </div>

                    <div className={`col-12 col-md-4 `}>
                        <label className="form-label" htmlFor={`street_number_${action.toLowerCase()}`}>Número</label>
                        <div className="position-relative">
                            <input type="number"
                                   min={0}
                                   disabled={loading || fetchingDataLoading}
                                   id={`street_number_${action.toLowerCase()}`}
                                   name={'Número do local'}
                                   placeholder={'Número'}
                                   {...register(`${key}${fields.street_number}`)}
                                   {...checkErrorField(`${fields.street_number}`)}
                            />
                            <FbSpinnerLoading loading={fetchingDataLoading}/>
                        </div>

                        {checkErrorField(`${fields.street_number}`) &&
                            <div className='mt-2'>
                                <ErrorMessageComponent accessor={accessor}
                                                       name={`${fields.street_number}`}
                                                       errors={errors}
                                />
                            </div>
                        }
                    </div>

                    <div className={`col-12 col-md-12 `}>
                        <label className="form-label" htmlFor={`district_${action.toLowerCase()}`}>Bairro</label>
                        <div className="position-relative">
                            <input type="text"
                                   disabled={loading || fetchingDataLoading}
                                   id={`district_${action.toLowerCase()}`}
                                   name={'Bairro'}
                                   placeholder={'Bairro'}
                                   {...register(`${key}${fields.district}`)}
                                   {...checkErrorField(`${fields.district}`)}

                            />
                            <FbSpinnerLoading loading={fetchingDataLoading}/>
                        </div>

                        {checkErrorField(`${fields.district}`) &&
                            <div className='mt-2'>
                                <ErrorMessageComponent accessor={accessor}
                                                       name={`${fields.district}`}
                                                       errors={errors}
                                />
                            </div>
                        }
                    </div>

                    <div className={`col-12 col-md-6 `}>
                        <div>
                            <label className="form-label" htmlFor={`city_${action.toLowerCase()}`}>Cidade</label>
                            <div className="position-relative">
                                <input type="text"
                                       disabled={(watch()[`${key}${fields.cep}`]?.length < 8) || loading || fetchingDataLoading}
                                       id={`city_${action.toLowerCase()}`}
                                       name={'Cidade'}
                                       placeholder={'Cidade'}
                                       {...register(`${key}${fields.city}`)}
                                       {...checkErrorField(`${fields.city}`)}

                                />
                                <FbSpinnerLoading loading={fetchingDataLoading}/>
                            </div>

                            {checkErrorField(`${fields.city}`) &&
                                <div className='mt-2'>
                                    <ErrorMessageComponent accessor={accessor}
                                                           name={`${fields.city}`}
                                                           errors={errors}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div className={`col-12 col-md-6 `}>
                        <label className="form-label" htmlFor={`state_${action.toLowerCase()}`}>Estado</label>
                        <div className="position-relative">
                            <input type="text"
                                   id={`state_${action.toLowerCase()}`}
                                   disabled={loading || fetchingDataLoading}
                                   name={'Estado'}
                                   placeholder={'Sigla do Estado'}
                                   {...register(`${key}${fields.state}`)}
                                   {...checkErrorField(`${fields.state}`)}

                            />

                            <FbSpinnerLoading loading={fetchingDataLoading}/>
                        </div>


                        <div className='mt-2'>
                            <ErrorMessageComponent accessor={accessor}
                                                   name={`${fields.state}`}
                                                   errors={errors}
                            />
                        </div>
                    </div>
                    <div className={`col-12 `}>
                        <label className="form-label" htmlFor={`complement_${action.toLowerCase()}`}>Complemento</label>
                        <div className="position-relative">
                            <input type="text"
                                   id={`complement_${action.toLowerCase()}`}
                                   name={'Complemento'}
                                   disabled={fetchingDataLoading}
                                   placeholder={'Complemento'}
                                   {...register(`${key}${fields.complement}`)}
                                   {...checkErrorField(`${fields.complement}`)}

                            />
                            <FbSpinnerLoading loading={fetchingDataLoading}/>
                        </div>

                        {checkErrorField(`${fields.complement}`) &&
                            <div className='mt-2'>
                                <ErrorMessageComponent accessor={accessor} name={`${fields.complement}`}
                                                       errors={errors}/>
                            </div>
                        }
                    </div>
                </div>
            </div>


            {!disableFormTag &&
                <div className={'d-flex justify-content-end mt-3' + " " + (hideSubmitButton ? " d-none" : "")}>
                <div className={'col-12 col-lg-4'}>
                        <Button variant={'primary'}
                                disabled={loading}
                                id={"submit_address"}
                                className={'w-100'}
                                type={'submit'}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            }

        </FbLayout>
    )
})

FormsAddress.propTypes = {
    action: PropTypes.string,
    customNameFields: PropTypes.shape({
        street_name: PropTypes.string,
        street_number: PropTypes.string,
        cep: PropTypes.string,
        district: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
        state: PropTypes.string,
        complement: PropTypes.string
    }),
    defaultValues: PropTypes.object,
    isLoading: PropTypes.bool,
};


export default FormsAddress