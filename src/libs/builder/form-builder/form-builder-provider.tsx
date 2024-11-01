import * as React from "react";
import { useEffect, useState, ReactNode, Context } from "react";

interface FormBuilderProps {
    saveInCache: (formKey: string, values: any) => void;
    getDataFormKey: (formKey: string) => any;
    clear: (formKey: string) => void;
}

export const FormBuilderContext: Context<FormBuilderProps | undefined> = React.createContext<FormBuilderProps | undefined>(undefined);

export const useFormBuilder = (): FormBuilderProps | undefined => {
    const client = React.useContext(FormBuilderContext);
    return client;
};

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