import { AuthContext, type AuthContextType } from "@/contexts/auth-context";
import { useContext } from "react";

type UseAuthReturn = Pick<
    AuthContextType,
    "isLoaded" | "isLoggedIn" | "user" | "signIn"
>;

export function useAuth(): UseAuthReturn {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth should be used within AuthContext.Provider");
    }
    const { isLoaded, signIn, isLoggedIn, user } = authContext;
    return {
        isLoaded,
        isLoggedIn,
        signIn,
        user,
    };
}
