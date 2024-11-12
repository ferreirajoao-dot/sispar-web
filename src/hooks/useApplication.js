import {useContext} from "react";
import {ContextApplication} from "@/components/layout/providers-component";

export const useApplication = () => useContext(ContextApplication);
