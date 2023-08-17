'use client';

import { Color } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import CellAction from './cell-action';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-start space-x-2">
                    <div>{row.original.value}</div>
                    <div
                        className="w-6 h-6 border-[1px] rounded-full"
                        style={{ backgroundColor: row.original.value }}
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
