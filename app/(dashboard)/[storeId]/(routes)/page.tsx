import prisma from '@/lib/prismadb';
import React from 'react';

interface DashboardProps {
    params: {
        storeId: string;
    };
}

const DashbaordPage = async ({ params }: DashboardProps) => {
    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    return <div>{store?.name}</div>;
};

export default DashbaordPage;
