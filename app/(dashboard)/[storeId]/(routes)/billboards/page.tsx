import client from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import BillboardClient from './components/client';
import { columns } from './components/columns';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialBillboards = await client.billboard.findMany({
        where: {
            storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient
                    params={params}
                    columns={columns}
                    data={initialBillboards}
                />
                {/* data-table */}
            </div>
        </div>
    );
};

export default BillboardsPage;
