'use client';

import { useStoreModal } from '@/hooks/use-modal';
import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const SetupPage = () => {
    const { isOpen, onOpen } = useStoreModal();

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div className="p-4">
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default SetupPage;
