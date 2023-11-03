'use client';

import { StoreModal } from "@/components/ui/modals/store-modal";
import { useEffect, useState } from "react";

// this is to avoid the hydration error on the client side

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }
    
    return (
        <>
            <StoreModal />
        </>
    )
};