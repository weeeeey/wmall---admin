'use client';

import { Order } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'products',
        header: 'Products',
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
