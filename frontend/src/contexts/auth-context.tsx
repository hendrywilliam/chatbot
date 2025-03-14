"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "@/types/user";

type AuthContextType = {
    user: User | null;
    signIn: () => void;
    getUserProfile: () => Promise<void>;
    isLoaded: boolean;
    isLoggedIn: boolean;
};

type UserProfileResult = {
    message: string;
    data: User;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const signIn = function (): void {
        if (!window) return;
        window.location.replace(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/oauth-login`
        );
    };
    const getUserProfile = async function (): Promise<void> {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user`,
                { method: "GET", credentials: "include" }
            );
            if (!response.ok) {
                return;
            }
            const data = (await response.json()) as UserProfileResult;
            setUser(data.data);
            setIsLoggedIn(true);
            return;
        } catch (error: unknown) {}
    };
    useEffect(() => {
        getUserProfile();
    }, [isLoaded]);

    return (
        <AuthContext.Provider
            value={{
                getUserProfile,
                isLoaded,
                signIn,
                isLoggedIn,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
