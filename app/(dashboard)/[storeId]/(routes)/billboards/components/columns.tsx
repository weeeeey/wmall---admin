'use client';

import { Billboard } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal, PenLine, Trash } from 'lucide-react';

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
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            <div>Copy ID</div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <PenLine className="w-4 h-4 mr-2" />
                            <div>Update</div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className="w-4 h-4 mr-2" />
                            <div>Delete</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// August 12th, 2023   PPP
