"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create a store in seconds"
            description="Add new store to manage products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Create Store
        </Modal>
    )
}