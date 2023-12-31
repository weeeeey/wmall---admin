import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import CategoryClient from './components/client';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialCategories = await client.category.findMany({
        where: {
            storeId,
        },
        include: {
            billboard: true,
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient
                    params={params}
                    columns={columns}
                    data={initialCategories}
                />
                {/* data-table */}
            </div>
        </div>
    );
};

export default CategoriesPage;
