import {useContext} from "react";
import {ContextApplication} from "@/ui/layout/providers-component";

export const useApplication = () => useContext(ContextApplication);
