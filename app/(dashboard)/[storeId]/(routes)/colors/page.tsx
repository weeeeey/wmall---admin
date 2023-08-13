import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import SizeClient from './components/client';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialSizes = await client.size.findMany({
        where: {
            storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient
                    params={params}
                    columns={columns}
                    data={initialSizes}
                />
                {/* data-table */}
            </div>
        </div>
    );
};

export default SizesPage;
