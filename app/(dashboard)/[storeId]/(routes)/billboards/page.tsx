import client from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import BillboardForm from './components/billboard-form';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }
    const { storeId } = params;
    const initialBillboards = await client.billboard.findMany({
        where: {
            storeId,
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialBillboards={initialBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
