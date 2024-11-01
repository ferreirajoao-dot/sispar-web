import Select, {Props as SelectProps,} from "react-select";

import {useGetData} from "@/hooks/useGetData";
import {SetStateAction, useEffect, useMemo, useState} from "react";
import {
    ControllerRenderProps,
    ControllerFieldState,
    UseFormStateReturn,
    FieldValues,
} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import {useQueryClient} from "@tanstack/react-query";
import AsyncCreatableSelect from "react-select/async-creatable";
import api from "@/services/api";
import {debounce, isObject} from "lodash";

import AsyncSelect from "react-select/async";

import dynamic from 'next/dynamic';


// const AsyncSelect = dynamic(({onChange}) => import('react-select/async'), {
//     ssr: false,
//     loading: () => <div className="skeleton h-40px w-100"></div>
// });


interface OptionType {
    label: string;
    value: string | number;
}

interface FieldControllerProps<TFieldValues extends FieldValues = FieldValues> {
    field: ControllerRenderProps<TFieldValues>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
}

type LabelValuePair = [label: string, value: string];

interface SelectBuilderProps {
    options?: OptionType[];
    onChange?: (value: OptionType | null) => void;
    error?: any;
    accessorEdit?: string;
    url?: string;
    fieldController?: FieldControllerProps;
    keys?: LabelValuePair;
    isCreatable?: boolean;
    isClub?: boolean;
    isAsyncCreatable?: boolean;
    isAsync?: boolean;
    disableInitialSearch?: boolean;
    disableSearchQuery?: boolean;
    defaultValuesForm?: any;
    onClickOption?: (value: OptionType) => OptionType | Promise<OptionType>;
}

const isValidLabelValuePair = (pair: LabelValuePair): boolean => {
    const [label, value] = pair;
    return label.trim() !== "" && value.trim() !== "";
};

const SelectBuilder = (props: SelectBuilderProps & SelectProps<OptionType>) => {
    const queryClient = useQueryClient();
    const [options, setOptions] = useState<OptionType[]>(props.options || []);
    const [disableInitialSearch, setDisableInitialSearch] = useState<boolean>(props.disableInitialSearch || false);

    const {isClub = true} = props
    if (props?.keys && !isValidLabelValuePair(props?.keys)) {
        throw new Error("A prop 'keys' deve ser uma tupla válida contendo um 'label' e um 'value' não vazios.");
    }

    const { isLoading} = useGetData({
        queryKey: [`${props.url}/select`],
        url: props.url ?? "",
        onSuccess: (response) => {
            if (response && props.keys) {
                return filterOptions(response);
            }
        },
        enabled: !disableInitialSearch && (!!props.url && !queryClient.getQueryData([`${props.url}/select`])),
    });

    const filterOptions = (value: any) => {
        const aux: OptionType[] = [];
        if (value?.object?.data) {
            value?.object?.data.forEach((item: any) => {
                if (props.keys) {
                    aux.push({
                        label: item[props.keys[0]],
                        value: item[props.keys[1]],
                    });
                }
            });
        } else {
            value?.object?.forEach((item: any) => {
                if (props.keys) {
                    aux.push({
                        label: item[props.keys[0]],
                        value: item[props.keys[1]],
                    });
                }
            });
        }
        setOptions(aux)
        return aux;
    };

    const searchQuery = async (query: string) => {
        try {
            let params = {
                search_global: query,
            }
            let result = await api.get(`${props.url}`, params, {isClub: isClub})

            setDisableInitialSearch(false)
            return filterOptions(result)
        } catch (e) {

        }
    }

    const memoizedOptions = useMemo(() => {
        const cachedData = (queryClient.getQueryData([`${props.url}/select`]) || []) as OptionType[];

        if (props.defaultValuesForm && props?.accessorEdit) {
            if (isObject(props?.defaultValuesForm[props?.accessorEdit]) && props.keys?.length) {
                let aux: OptionType = {
                    label: props?.defaultValuesForm[props?.accessorEdit][props.keys[0]],
                    value: props?.defaultValuesForm[props?.accessorEdit][props.keys[1]]
                }

                let existingOption = cachedData.find((c) => {
                    return c.value === props?.fieldController?.field.value;
                })
                if (!existingOption) {
                    cachedData.unshift(aux)
                }
            }
        }

        if (options.length === 0 && cachedData.length > 0) {

            return cachedData;
        }

        return options;
    }, [options, queryClient, props.defaultValuesForm, props]);

    const handleCreate = async (inputValue: string) => {
        const aux: OptionType[] = memoizedOptions;
        const newOption: OptionType = {label: inputValue, value: inputValue};
        let result;
        try {
            if (props?.onClickOption) {
                result = await props?.onClickOption(newOption);
            }
            if (result) {
                aux.unshift(result);
                handleChange(result);
            } else {
                aux.unshift(newOption);
                handleChange(newOption);
            }
            updateOptions(aux);
        } catch (e) {

        }

    };

    const updateOptions = (newOptions: SetStateAction<OptionType[]>) => {
        setOptions(newOptions);
    };

    const handleChange = (val: OptionType | null) => {
        if (props?.fieldController) {
            props?.fieldController.field.onChange(val ? val.value : null);
            if (props.onChange) props.onChange(val);

        }
    };

    const updateCachedData = async (results: any) => {
        let filterBy = [`${props.url}/select`]

        await queryClient.setQueryData(filterBy, () => {
            let newValue = [...results]

            results = newValue
            return newValue

        })
    }


    const debouncedSearch = debounce(async (query: string, callback: (options: OptionType[]) => void) => {
        if (props.disableSearchQuery) {
            const results = memoizedOptions.filter((i) =>
                i.label.toLowerCase().includes(query.toLowerCase())
            )

            callback(results)
        } else {
            let results: any = await searchQuery(query);
            await updateCachedData(results);
            callback(results);
        }


        // if (disableInitialSearch) {
        //     setDisableInitialSearch(false)
        // }


    }, 1000);

    const loadOptions = (query: string, callback: (options: OptionType[]) => void) => {
        debouncedSearch(query, callback);
    };


    const commonProps = {
        className: "react-select-styled",
        classNamePrefix: "react-select",
        classNames: {
            control: () =>
                props.fieldController?.formState.errors[props?.fieldController?.field?.name]
                    ? "border-danger"
                    : "",
            input: () => "min-w-100px",
        },
        noOptionsMessage: () => disableInitialSearch ? "Digite para buscar" : "Nenhum resultado",
        placeholder: "Selecione...",
        value: (memoizedOptions.find((c) => c.value === props?.fieldController?.field.value) || null),
        options: memoizedOptions,
        ref: props.fieldController?.field.ref || null,
        ...props
    }

    if (props.url && isLoading) {
        return <div className="skeleton h-40px w-100"></div>;
    }


    if (props?.isAsyncCreatable) {
        return (
            <>
                <AsyncCreatableSelect defaultOptions={memoizedOptions}
                                      loadOptions={loadOptions}
                                      onChange={(val) => handleChange(val as unknown as OptionType)}
                                      formatCreateLabel={(userInput) => <div
                                          className={"da-flex gap-2 text-hover-primary"}>
                                          {/*<KTIcon iconType={"solid"} iconName={"plus"}/><span>Criar:  <strong>{userInput}</strong></span>*/}
                                      </div>}
                                      onCreateOption={handleCreate}
                                      loadingMessage={() => "Buscando..."}
                                      {...commonProps}
                />
            </>
        )
    }

    if (props?.isAsync) {
        return <AsyncSelect defaultOptions={memoizedOptions}
                            loadOptions={loadOptions}
                            onChange={(val) => handleChange(val as unknown as OptionType)}
                            loadingMessage={() => "Buscando..."}
                            {...commonProps}
        />
    }

    if (props?.isCreatable) {
        return (
            <CreatableSelect
                onChange={(val) => handleChange(val as unknown as OptionType)}
                formatCreateLabel={(userInput) => `Criar "${userInput}"`}
                onCreateOption={handleCreate}
                {...commonProps}

            />
        );
    }

    return (
        <Select
            onChange={(val) => props.fieldController && props?.fieldController.field.onChange(val ? (val as OptionType).value : null)}
            {...commonProps}
        />
    );
}

export default SelectBuilder;