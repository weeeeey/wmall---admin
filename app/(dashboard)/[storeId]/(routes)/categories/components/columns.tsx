'use client';

import { Billboard } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import CellAction from './cell-action';

export const columns: ColumnDef<Billboard>[] = [
    {
        accessorKey: 'label',
        header: 'Label',
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
