import Navbar from '@/components/navbar';
import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import React from 'react';

interface DashProps {
    children: React.ReactNode;
    params: {
        storeId: string;
    };
}

const DashboardLayout = async ({ children, params }: DashProps) => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }
    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });
    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default DashboardLayout;
