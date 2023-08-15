'use client';

import { Order, OrderItem, Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'products',
        header: 'Products',
        cell: ({ row }) => {
            const orderItems: OrderItem[] = row.getValue('orderItems');
            const products = orderItems.map((oi) => oi.productId);
        },
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'orderItems',
        header: 'Total Price',
    },
    {
        accessorKey: 'isPaid',
        header: 'Paid',
    },
];

// August 12th, 2023   PPP
