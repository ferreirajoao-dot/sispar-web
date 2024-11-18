"use client";

import * as React from "react";
import { FormBuilderContext} from "../form-builder-provider";
import { useEffect, useState } from "react";
import {
    FieldValues,
    UseFormSetValue,
    UseFormReset,
    UseFormWatch,
    FieldErrorsImpl,
} from "react-hook-form";

export interface FormBuilderProps {
    _registerForm?: (id: string, values: any) => void;
    form: Record<string, UseFormBuilderReturn<any>>;
}

export interface UseFormBuilderReturn<T extends FieldValues = FieldValues> {
    watch: any;
    reset: UseFormReset<T>;
    errors: FieldErrorsImpl<T>;
    onValidateForm: (isReturnValue?: boolean) => Promise<T>;
    setValue: UseFormSetValue<T>;
}


export const useFormBuilder = <T extends FieldValues>(id: string): Partial<UseFormBuilderReturn<T>> | null => {
    const client = React.useContext(FormBuilderContext);

    if (!client) {
        throw new Error("useFormBuilder must be used within a FormBuilderProvider");
    }

    if (!id) {
        throw new Error("ID is required");
    }

    const [watch, setWatch] = useState<UseFormWatch<T> | null>(null);
    // @ts-ignore
    const _activeForm = client.form[id]

    useEffect(() => {
        if (_activeForm) {
            const subscription = _activeForm.watch((formValues: T) => {
                return setWatch(formValues as any);
            });
            return () => subscription.unsubscribe();
        }
    }, [_activeForm]);

    if (!_activeForm) return {};

    const {
        reset,
        errors,
        setValue,
        onValidateForm
    } = _activeForm;

    return {
        watch,
        reset,
        errors,
        onValidateForm,
        setValue,
    };
};
