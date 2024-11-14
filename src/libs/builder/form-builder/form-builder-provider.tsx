import * as React from "react";
import {useState, ReactNode, Context, useCallback} from "react";
import { FormBuilderProps } from "./hooks/useFormBuilder";

export const FormBuilderContext: Context<FormBuilderProps | undefined> = React.createContext<FormBuilderProps | undefined>(undefined);


export default function FormBuilderProvider({ children }: {children: ReactNode;}) {
    const [cachedForms, setCachedForms] = useState<{ [key: string]: any }>({});

    const _registerForm = useCallback((id: string, values: any): void => {
        setCachedForms((prevForms) => ({ ...prevForms, [id]: values }));
    },[]);

    const memoizedForm = React.useMemo(() => cachedForms, [cachedForms]);

    const contextValue = { _registerForm, form: memoizedForm };

    return (
        <FormBuilderContext.Provider value={contextValue}>
            {children}
        </FormBuilderContext.Provider>
    );
}