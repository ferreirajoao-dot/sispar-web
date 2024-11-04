import * as React from "react";
import { useEffect, useState, ReactNode, Context } from "react";

import {FormBuilderProps} from "./hooks/useFormBuilder";

export const FormBuilderContext: Context<FormBuilderProps | undefined> = React.createContext<FormBuilderProps | undefined>(undefined);

interface FormBuilderProviderProps {
    children: ReactNode;
}

export default function FormBuilderProvider({ children }: FormBuilderProviderProps) {
    const [cachedForms, setCachedForms] = useState<{ [key: string]: any }>({});

    const getDataFormKey = (formKey: string): any => {
        if (formKey) {
            if (cachedForms[formKey]) {
                return cachedForms[formKey];
            }
        }
        return {};
    };

    const saveInCache = (formKey: string, values: any): void => {
        setCachedForms((prevForms) => ({ ...prevForms, [formKey]: values }));
    };

    const clear = (formKey: string): void => {
        if (formKey) {
            setCachedForms((prevForms) => {
                const updatedForms = { ...prevForms };
                if (updatedForms[formKey]) {
                    delete updatedForms[formKey];
                }
                return updatedForms;
            });
        }
    };

    return (
        <FormBuilderContext.Provider value={{ saveInCache, getDataFormKey, clear }}>
            {children}
        </FormBuilderContext.Provider>
    );
}