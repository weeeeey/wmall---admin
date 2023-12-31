import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import ColorClient from './components/client';

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialColors = await client.color.findMany({
        where: {
            storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient
                    params={params}
                    columns={columns}
                    data={initialColors}
                />
            </div>
        </div>
    );
};

export default ColorsPage;
