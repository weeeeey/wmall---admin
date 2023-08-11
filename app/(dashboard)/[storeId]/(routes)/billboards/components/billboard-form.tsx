'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';

interface BillboardFormProps {
    initialBillboards: Billboard[];
}

const BillboardForm = ({ initialBillboards }: BillboardFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${initialBillboards.length})`}
                    description="Manage billboards for your store"
                />
                <Button className="bg-black text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <Command className="space-y-4 w-full border-[1px] ">
                <CommandInput placeholder="Search" />
                <CommandList>
                    <CommandGroup
                        heading="Label"
                        className="border-[1px] text-sm"
                    >
                        {initialBillboards.map((bill) => (
                            <CommandItem key={bill.id}>
                                {bill.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    );
};

export default BillboardForm;
