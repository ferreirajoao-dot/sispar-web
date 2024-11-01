"use client"

import {Controller, useForm} from "react-hook-form";
import NumberFormat from "react-number-format";
import MySelect from "@/ui/components/builder/select-builder/select-builder";
import {genders} from "@/json/utility-objects";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import {useSession} from "@/hooks/contexts";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {getMessagingTokenService} from "@/helpers/functions";
import {toast} from "react-toastify";
import moment from "moment/moment";
import {api} from "@/hooks/axios";
import {useRouter, useSearchParams} from "next/navigation";
import {useFormBuilder} from "@/ui/components/builder/form-builder/form-builder-provider";

export default function FormRegister({regType}) {
    const { login } = useSession();
    const [terms, setTerms] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl');
    const formClient= useFormBuilder();

    const cachedForm = formClient.getDataFormKey("check-user-exist")

    const schema = yup.object({
        fullName: yup.string().required("O nome completo é obrigatório").test(
            "words",
            "Insira seu nome e sobrenome",
            value => value.split(" ").length >= 2
        ),
        phone: yup.string().required("O telefone é obrigatório").matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, "Telefone inválido"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], "As senhas devem corresponder"),
        birthDate: yup.string().required('Data é obrigatório'),
        gender: yup.string().required("O gênero é obrigatório"),
        cpf: yup.string().required("O CPF é obrigatório")
    }).required();


    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cpf: cachedForm?.watch?.cpf || ""
        },
    });
    const token = useRef();

    const getToken = () => {
        getMessagingTokenService((currentToken) => {
            token.current = currentToken;
        })
    }
    const onSubmit = async data => {

        if(!terms) {
            toast('Você precisa concordar com os termos para se cadastrar')
            return
        }

        const params = new URLSearchParams(window.location.search);
        let redirect_url = '';
        let switchParam = params.get('reg_type') || regType;

        let payload = {...data};
        payload.first_name = data.fullName?.substring(0, data.fullName.indexOf(' '));
        payload.last_name = data.fullName?.substring(data.fullName.indexOf(' ') + 1);
        payload.cellphone_number = '+55' + data.phone.replace(/\D/ig, '');
        payload.birthday = moment(data.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        payload.cpf = data.cpf.replace(/\D/ig, '');
        payload.application_name = process.env.NEXT_PUBLIC_APPLICATION_ALIAS;
        payload.fcm_token = token.current || 'undefinedToken';

        switch (switchParam) {
            case 'club_partner':
                payload.is_club_admin =  true;
                redirect_url = '/painel/empresa/criar-empresa';
                break;
            case 'formal_worker':
                redirect_url = '/register-formal';
                break;
            case 'informal_worker':
                redirect_url = '/register-informal';
                break;
            default:
                payload.club_customer = true;
                redirect_url = null;
        }

        if (callbackUrl) {
            redirect_url = callbackUrl
        }


        try {
            const res = await api.post("/api/register", payload, {isNext:true})

            await login({data: res.data, redirectTo: redirect_url});

        } catch (e) {

        }
    };


    useEffect(() => {
        getToken();
        if (cachedForm) return () => formClient.clear("check-user-exist")
    },[])

    return (
        <form className="form row g-4 text-start" onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}
              noValidate>

            <div className="col-12">
                <Controller
                    control={control}
                    name="fullName"
                    render={({field}) => (
                        <>
                            <label htmlFor={field.name} className="form-label">Nome
                                completo</label>
                            <input {...field}
                                   id={field.name}
                                   className={`form-control  ${errors.fullName ? 'is-invalid' : ''}`}
                                   placeholder="Nome Completo"
                                   type={"text"}
                            />
                            {errors[field.name] && <div
                                className="invalid-feedback">{errors[field.name].message}</div>}
                        </>
                    )}
                />
            </div>
            <div className="">

                <Controller
                    control={control}
                    name="cpf"
                    render={({field}) => {
                        return (
                            <>
                                <label htmlFor={field.name} className="form-label">CPF</label>
                                <NumberFormat format={'###.###.###-##'}
                                              getInputRef={field.ref}
                                              onValueChange={(values) => field.onChange(values.value)}
                                              id={field.name}
                                              value={field.value}
                                              className={`form-control  ${errors.cpf ? 'is-invalid' : ''}`}
                                              placeholder="Seu CPF"

                                />
                                {errors[field.name] && <div
                                    className="invalid-feedback">{errors[field.name].message}</div>}
                            </>
                        )
                    }}
                />
            </div>
            <div className="col-12 col-md-6 ">

                <Controller control={control}
                            name="birthDate"
                            render={({field}) => (
                                <>
                                    <label htmlFor={field.name} className="form-label">Data de
                                        nascimento</label>

                                    <NumberFormat getInputRef={field.ref}
                                                  onValueChange={(values) => field.onChange(values.value)}
                                                  id={field.name}
                                                  value={field.value}
                                                  className={`form-control  ${errors.birthDate ? 'is-invalid' : ''}`}
                                                  format="##/##/####"
                                                  placeholder="Dia/Mês/Ano"
                                    />
                                    {errors[field.name] && <div
                                        className="invalid-feedback">{errors[field.name].message}</div>}
                                </>
                            )}
                />

            </div>

            <div className="col-12 col-md-6 ">

                <Controller name="gender"
                            control={control}
                            render={(controller) => (
                                <>
                                    <label htmlFor="" className="form-label">Gênero</label>
                                    <MySelect options={genders}
                                              fieldController={controller}
                                              placeholder={"Selecione uma opção..."}
                                    />
                                    {errors[controller.field.name] && <div
                                        className="invalid-feedback">{errors[controller.field.name].message}</div>}

                                </>
                            )}
                />
            </div>
            <div className="col-12 col-md-6">
                <Controller
                    control={control}
                    name="email"
                    render={({field}) => (
                        <>
                            <label htmlFor={field.name} className="form-label">Email</label>
                            <input {...field}
                                   id={field.name}
                                   className={`form-control  ${errors.email ? 'is-invalid' : ''}`}
                                   placeholder="Seu Email"
                                   autoComplete={"none"}
                                   type={"email"}
                            />
                            {errors[field.name] && <div
                                className="invalid-feedback">{errors[field.name].message}</div>}

                        </>
                    )}
                />
            </div>

            <div className="col-12 col-md-6">

                <Controller
                    control={control}
                    name="phone"
                    render={({field}) => (
                        <>
                            <label htmlFor={field.name} className="form-label">Telefone</label>

                            <NumberFormat format={'(##) #####-####'}
                                          getInputRef={field.ref}
                                          onValueChange={(values) => field.onChange(values.value)}
                                          id={field.name}
                                          value={field.value}
                                          className={`form-control  ${errors.cpf ? 'is-invalid' : ''}`}
                                          placeholder="Telefone"

                            />
                            {errors[field.name] && <div
                                className="invalid-feedback">{errors[field.name].message}</div>}

                        </>
                    )}
                />
            </div>


            <div className="col-12 col-md-6">

                <Controller
                    control={control}
                    name="password"
                    render={({field}) => (

                        <>
                            <label htmlFor={field.name} className="form-label">Senha</label>

                            <input type="password"
                                   id={field.name}
                                   {...field}
                                   className={`form-control  ${errors.password ? 'is-invalid' : ''}`}
                                   placeholder="Senha"
                                   autoComplete={"new-password"}
                            />
                            {errors[field.name] && <div
                                className="invalid-feedback">{errors[field.name].message}</div>}
                        </>
                    )}
                />

            </div>

            <div className="col-12 col-md-6">


                <Controller
                    control={control}
                    name="confirm_password"
                    render={({field}) => (
                        <>
                            <label htmlFor={field.name} className="form-label">Confirme sua
                                senha</label>

                            <input
                                type="password"
                                {...field}
                                id={field.name}
                                className={`form-control  ${errors[field.name] ? 'is-invalid' : ''}`}
                                placeholder="Confirmar Senha"
                            />
                            {errors[field.name] && <div
                                className="invalid-feedback">{errors[field.name].message}</div>}
                        </>
                    )}
                />

            </div>

            <div className="col-12 py-3">
                <label className="form-check">
                    <input type="checkbox" checked={terms} onChange={() => setTerms(!terms)}
                           className="form-check-input"/>
                    <span className="form-check-label">
                                                Aceito os <Link href="/termos" target={'_blank'}
                                                                className="link-primary">Termos e Condições</Link>
                                              </span>
                </label>
            </div>

            <div className="d-flex flex-center mb-5">
                <button type="submit" className="btn btn-primary col-10"
                        disabled={isSubmitting || !terms}>
                    {isSubmitting ?
                        <span className="indicator-label">Cadastrando...</span> :
                        <span className="indicator-label">Cadastre-se</span>
                    }
                </button>
            </div>


            <div className="text-gray-500 text-center fw-semibold fs-6">
                Já possui uma conta? <Link href="/login"
                                           className="link-primary fw-semibold">Login</Link>
            </div>
        </form>
    )
}
