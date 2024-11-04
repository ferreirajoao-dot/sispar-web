"use client";

import * as React from "react";
import {FormBuilderContext} from "@/libs/builder/form-builder/form-builder-provider";

export interface FormBuilderProps {
    saveInCache: (formKey: string, values: any) => void;
    getDataFormKey: (formKey: string) => any;
    clear: (formKey: string) => void;
}

export const useFormBuilder = (): FormBuilderProps | undefined => {
    const client = React.useContext(FormBuilderContext);
    return client;
};