"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button,  } from 'react-bootstrap';
import {api} from "@/hooks/axios";

const schema = yup.object().shape({
    old_password: yup.string().required('Senha atual é obrigatória'),
    password: yup.string().required('Nova senha é obrigatória').min(8, "A senha deve conter no mínimo 8 caracteres"),
    new_confirm_password: yup
        .string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
});

const FormChangePassword = ({ onSuccess }) => {
    const { register, handleSubmit, watch,
        formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const { old_password, password, new_confirm_password } = data;
       try {
           const payload = {
               password,
               old_password,
           }
           await api.post("/api/change-password", payload, {isNext:true})
           if (onSuccess) onSuccess();

       } catch (e) {

       }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-5 mt-10'>
            <div>
                <label htmlFor="old_password" className="form-label">Senha Atual</label>
                <input
                    id="old_password"
                    {...register('old_password')}
                    className={`form-control ${errors.old_password ? 'is-invalid' : ''}`}
                    placeholder="Sua senha atual"
                    type="password"
                />
                {errors.old_password && <span className="invalid-feedback mt-2">{errors.old_password.message}</span>}
            </div>

            <div className='separator my-2'/>

            <div>
                <label htmlFor="password" className="form-label">Nova senha</label>
                <input
                    id="password"
                    {...register('password')}
                    className={`form-control  ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Insira sua nova senha"
                    type="password"
                />
                {errors.password && <span className="invalid-feedback mt-2">{errors.password.message}</span>}
            </div>

            <div>
                <label htmlFor="new_confirm_password" className="form-label">Confirme a senha</label>
                <input
                    id="new_confirm_password"
                    {...register('new_confirm_password')}
                    className={`form-control ${errors.new_confirm_password ? 'is-invalid' : ''}`}
                    placeholder="Confirme sua nova senha"
                    type="password"
                />
                {errors.new_confirm_password &&
                    <span className="invalid-feedback mt-2">{errors.new_confirm_password.message}</span>}
            </div>

            <div className="w-100 text-center ">
                <Button disabled={isSubmitting} type="submit" variant="primary">Alterar senha</Button>
            </div>
        </form>
    );
};

export default FormChangePassword;