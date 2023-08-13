import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import ProductClient from './components/client';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    const initialProducts = await client.product.findMany({
        where: {
            storeId,
        },
        include: {
            color: true,
            size: true,
            category: true,
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient
                    params={params}
                    columns={columns}
                    data={initialProducts}
                />
                {/* data-table */}
            </div>
        </div>
    );
};

export default ProductsPage;
