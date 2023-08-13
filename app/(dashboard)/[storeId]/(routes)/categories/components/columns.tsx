'use client';

import { Billboard, Category } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import CellAction from './cell-action';

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'billboard',
        header: 'Billboard',
        cell: ({ row }) => {
            const billboard: Billboard = row.getValue('billboard');
            return <div className="font-medium">{billboard.label}</div>;
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
