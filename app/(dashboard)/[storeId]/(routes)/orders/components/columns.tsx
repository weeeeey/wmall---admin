'use client';

import { Button } from '@/components/ui/button';
import { Order, OrderItem, Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface SafeOrderProps extends Order {
    orderItems: (OrderItem & {
        product: Product;
    })[];
}

export const columns: ColumnDef<SafeOrderProps>[] = [
    {
        accessorKey: 'orderItems',
        header: 'Products',
        cell: ({ row }) => {
            const orderItems: (OrderItem & { product: Product })[] =
                row.getValue('orderItems');
            const productNames = orderItems.map((oi) => oi.product.name);
            return (
                <div className="flex flex-col items-start justify-center">
                    {productNames.map((productName: string) => (
                        <div key={productName}>{productName},</div>
                    ))}
                </div>
            );
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Total Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const orderItems: (OrderItem & { product: Product })[] =
                row.getValue('orderItems');
            let p = 0;
            const totalPrice = orderItems.reduce(
                (acc, current) => acc + current.product.price,
                p
            );
            return <div>{totalPrice}</div>;
        },
    },
    {
        accessorKey: 'isPaid',
        header: 'Paid',
    },
];

// August 12th, 2023   PPP
