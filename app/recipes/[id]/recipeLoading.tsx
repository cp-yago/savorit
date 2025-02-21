"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RecipePolling = () => {
    const router = useRouter();

    useEffect(() => {
        // Poll every 3 seconds by triggering a refresh of the server component
        const interval = setInterval(() => {
            router.refresh();
        }, 3000);
        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p>Aguardando atualização da receita...</p>
            {/* Spinner opcional poderia ser adicionado aqui */}
        </div>
    );
};

export default RecipePolling;
