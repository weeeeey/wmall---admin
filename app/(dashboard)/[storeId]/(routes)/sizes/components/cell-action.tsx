'use client';

import { Size } from '@prisma/client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal, PenLine, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alert-modal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface CellActionProps {
    data: Size;
}

const CellAction = ({ data }: CellActionProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/stores/${params.storeId}/sizes/${data.id}`
            );
            toast.success('deleted the size');
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
            setOpen(false);
            router.refresh();
        }
    };
    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => {
                    setOpen(false);
                }}
                onConfirm={onDelete}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(data.id);
                            toast.success('Copied Size ID');
                        }}
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        <div>Copy ID</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            router.push(`${window.location.href}/${data.id}`);
                        }}
                    >
                        <PenLine className="w-4 h-4 mr-2" />
                        <div>Update</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        <div>Delete</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;
