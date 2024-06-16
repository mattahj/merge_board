import { useContext } from "react";

export function useRequiredContext<T>(context: React.Context<T>) {
    const ctx = useContext(context);
    if (ctx === null) {
        throw new Error("Required context not available");
    }
    return ctx;
}
