'use client';

import { Category, Color, Product, Size } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import CellAction from './cell-action';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'isArchived',
        header: 'Archived',
    },
    {
        accessorKey: 'isFeatured',
        header: 'Featured',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            let USDollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            const price: number = row.getValue('price');

            return <div className="font-medium">{USDollar.format(price)}</div>;
        },
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const category: Category = row.getValue('category');
            return <div className="font-medium">{category.name}</div>;
        },
    },
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => {
            const size: Size = row.getValue('size');
            return <div className="font-medium">{size.name}</div>;
        },
    },
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
            const color: Color = row.getValue('color');
            return (
                <div className="font-medium flex items-center space-x-2">
                    <div>{color.name}</div>
                    <div
                        className="h-6 w-6 border-[1px] rounded-full"
                        style={{
                            backgroundColor: color.value,
                        }}
                    />
                </div>
            );
        },
    },

    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const formattedDate = format(row.getValue('createdAt'), 'PPP');
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];

// August 12th, 2023   PPP
