import {useContext} from "react";
import {ContextUser} from "@/components/layout/providers-component";

export const useSession = () => {
    return {
        session: useContext(ContextUser).user,
        update: useContext(ContextUser).updateUser,
        refetch: useContext(ContextUser).refetchUser,
        logout: useContext(ContextUser).logout,
        login: useContext(ContextUser).login
    }
};