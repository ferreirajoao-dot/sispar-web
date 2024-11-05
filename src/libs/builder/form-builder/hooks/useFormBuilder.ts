"use client";
import * as React from "react";
import { FormBuilderContext } from "../form-builder-provider";

export interface FormBuilderProps {
    onSaveInCache?: (id: string, values: any) => void;
    onClearCache?: (id: string) => void;
    getFormId?: (id: string) => any;
}

export const useFormBuilder = (id?: string): FormBuilderProps  => {
    const client = React.useContext(FormBuilderContext);
    if (!client) {
        throw new Error("useFormBuilder must be used within a FormBuilderProvider");
    }
    return client;
};