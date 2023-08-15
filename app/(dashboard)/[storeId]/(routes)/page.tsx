import getGraphRevenue from '@/actions/get-graph-revenue';
import getSalesCount from '@/actions/get-sales-count';
import getStockCount from '@/actions/get-stock-count';
import getTotalRevenue from '@/actions/get-total-revenue';
import DashboardForm from '@/components/dashboard';
import prisma from '@/lib/prismadb';
import { Order, OrderItem, Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';

interface DashboardProps {
    params: {
        storeId: string;
    };
}
interface PP {
    orderItem: OrderItem & { product: Product };
}
interface SafeOrder {
    order: Order;
    orderItems: PP[];
}

const DashbaordPage = async ({ params }: DashboardProps) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const orders = await prisma.order.findMany({
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
    const a = await getGraphRevenue(storeId);
    console.log(a);
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <DashboardForm orders={orders} />
            </div>
        </div>
    );
};

export default DashbaordPage;
