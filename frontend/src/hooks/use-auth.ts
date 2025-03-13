import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

type UseAuthReturn = {};

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth should be used within AuthContext.Provider");
    }
    return {};
}
