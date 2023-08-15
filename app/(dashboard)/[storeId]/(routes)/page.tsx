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
    const graphRevenue = await getGraphRevenue(storeId);
    const salesCount = await getSalesCount(storeId);
    const stockCount = await getStockCount(storeId);
    const totalRevenue = await getTotalRevenue(storeId);
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <DashboardForm
                    graphRevenue={graphRevenue}
                    salesCount={salesCount}
                    stockCount={stockCount}
                    totalRevenue={totalRevenue}
                />
            </div>
        </div>
    );
};

export default DashbaordPage;
