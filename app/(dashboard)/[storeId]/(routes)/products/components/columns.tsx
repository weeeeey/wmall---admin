'use client';

import { Category, Color, Product, Size } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import CellAction from './cell-action';

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
            const price: number = row.getValue('price');
            return (
                <div className="font-medium">{`$${(price / 100).toFixed(
                    2
                )}`}</div>
            );
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
            return <div className="font-medium">{color.name}</div>;
        },
    },

    {
        accessorKey: 'updatedAt',
        header: 'Date',
        cell: ({ row }) => {
            const formattedDate = format(row.getValue('updatedAt'), 'PPP');
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];

// August 12th, 2023   PPP
