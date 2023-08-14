import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import OrderClient from './components/client';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialOrders = await client.order.findMany({
        where: {
            storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient
                    params={params}
                    columns={columns}
                    data={initialOrders}
                />
                {/* data-table */}
            </div>
        </div>
    );
};

export default SizesPage;
