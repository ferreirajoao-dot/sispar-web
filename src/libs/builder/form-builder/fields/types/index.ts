import React from "react"

export interface FieldProps {
    onChange: (value: any) => void;
    onBlur: () => void;
    value: unknown;
    name: string;
    ref: React.Ref<any>;
}

export interface Config {
    label: string | JSX.Element;
    helperLabel: string | JSX.Element;
    type: string;
    accessor: string;
}