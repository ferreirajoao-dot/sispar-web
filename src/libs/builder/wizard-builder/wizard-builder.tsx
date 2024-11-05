"use client"

import React, { useState } from "react";
import {KTIcon} from "@/libs/KTIcon/KTIcon";

interface MetaProps {
    title?: string;
    description?: string;
    element: (props: any) => React.ReactNode;
}

interface WizardBuilderProps {
    meta: MetaProps[];
    enableClickStep?: boolean;
    step?: number;
}

interface CachedDataType {
    [key: string]: any;
}
export default function WizardBuilder(props: WizardBuilderProps) {
    const { meta, enableClickStep } = props;
    const [activeStep, setActiveStep] = useState<number>(props.step || 1);
    const [cachedData, setCachedData] = useState<CachedDataType>({});

    const verifyStep = (step: number) => {
        if (activeStep === step) {
            return "current"
        } else if (activeStep > step) {
            return "completed"
        } else {
            return "pending"
        }
    }

    const onChangeStep = (type: ("next" | "previous" | null) ,step: number) => {
        if (type !== null && window.innerWidth < 767) {
            const element = document.querySelector("#step-" + step)!;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });

            }
        }
        setActiveStep(step);
    }

    const onChangeData = (data: any) => {
        setCachedData({...cachedData, ...data})
    }

    const joinData = () => {
        const values = Object.values(cachedData);
        let aux = {}

        if (values.length > 0) {
            values.forEach((value: any) => {
                aux = {...aux, ...value }
            })
        }

        return aux
    }

    return (
        <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid gap-10">
            <div
                className="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px">
                <div>
                    <div className="card-body py-10 mb-n5">
                        <ul className="stepper-nav nav flex-nowrap flex-md-wrap flex-row flex-md-column overflow-x-auto scroll-none gap-5 gap-md-0 pb-5 pb-md-0">
                            {meta.map((item, key) => {
                                const lastPosition = meta.length - 1;
                                const step = (key + 1)

                                return (
                                    <li key={key} className={"flex-column-fluid"} id={`step-${step}`}>
                                        <div data-kt-stepper-element={"nav"}
                                             className={`stepper-item ${verifyStep(key + 1)} flex-row flex-md-column align-items-center align-items-md-start justify-content-between gap-4 gap-md-0`}>
                                            <div className="stepper-wrapper">
                                                <button onClick={() => onChangeStep(null, step)}
                                                    disabled={enableClickStep ? false : (activeStep < (step + 1))}
                                                        // disabled={true}
                                                        className="stepper-icon w-40px h-40px"
                                                >
                                                    <i className="stepper-check ki-duotone ki-check fs-2"/>
                                                    <span className="stepper-number">
                                                        {step}
                                                    </span>
                                                </button>
                                                <div className="stepper-label">
                                                    <h3 className="stepper-title">
                                                        {item.title}
                                                    </h3>
                                                    <div className="stepper-desc fw-semibold">
                                                        {item.description}
                                                    </div>
                                                </div>
                                            </div>
                                            {(lastPosition !== key) &&
                                                <>
                                                    <div className="stepper-line d-none d-md-block h-40px"/>
                                                    <KTIcon name={"right"} className={"d-md-none"} type={"solid"}/>
                                                </>
                                            }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {meta.map((item, key) => {
                const lastPosition = meta.length - 1;
                const step = key + 1

                if (activeStep === step) return (
                    <div key={key} data-kt-stepper-element={"content"} className={verifyStep(step) + " w-100"}>
                        {item.element(
                            {
                                total: meta.length,
                                step: step,
                                data_step: cachedData[step] || {},
                                data_all_steps: cachedData,
                                actions: {
                                    saveData: (data: any) => onChangeData({[step]: data}),
                                    next: () => onChangeStep("next", activeStep + 1),
                                    previous: () => onChangeStep("previous", activeStep - 1),
                                    joinData: joinData
                                }
                            })
                        }
                    </div>
                )

            })}
        </div>

    )
}