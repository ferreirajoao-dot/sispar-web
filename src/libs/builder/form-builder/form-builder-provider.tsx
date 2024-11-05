import * as React from "react";
import { useEffect, useState, ReactNode, Context } from "react";

import {FormBuilderProps} from "./hooks/useFormBuilder";

export const FormBuilderContext: Context<FormBuilderProps | undefined> = React.createContext<FormBuilderProps | undefined>(undefined);

interface FormBuilderProviderProps {
    children: ReactNode;
}

export default function FormBuilderProvider({ children }: FormBuilderProviderProps) {
    const [cachedForms, setCachedForms] = useState<{ [key: string]: any }>({});

    const getFormId = (id: string): any => {
        if (id) {
            if (cachedForms[id]) {
                return cachedForms[id];
            }
        }
        return null;
    };

    const onSaveInCache = (id: string, values: any): void => {
        setCachedForms((prevForms) => ({ ...prevForms, [id]: values }));
    };

    const onClearCache = (id: string): void => {
        if (id) {
            setCachedForms((prevForms) => {
                const updatedForms = { ...prevForms };
                if (updatedForms[id]) {
                    delete updatedForms[id];
                }
                return updatedForms;
            });
        }
    };

    return (
        <FormBuilderContext.Provider value={{ onSaveInCache, onClearCache, getFormId }}>
            {children}
        </FormBuilderContext.Provider>
    );
}