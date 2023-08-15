import client from '@/lib/prismadb';
import React from 'react';
import { columns } from './components/columns';
import OrderClient from './components/client';
import { redirect } from 'next/navigation';
import { Order, OrderItem, Prisma, Product } from '@prisma/client';

interface SafeOrderProps {
    order: Order & {
        orderItems: (OrderItem & {
            prodcut: Product;
        })[];
    };
}
const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const initialOrders: SafeOrderProps[] = await client.order.findMany({
        where: {
            storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
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
