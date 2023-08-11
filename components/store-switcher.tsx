'use client';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Store, PlusCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Record<string, any>[];
}

export default function StoreSwitcher({
    className,
    items = [],
}: StoreSwitcherProps) {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useStoreModal();

    const frameworks = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const currentStore = frameworks.find(
        (work) => work.value === params.storeId
    );

    const onStoreSelect = (store: { value: string; label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn('w-[200px] justify-between', className)}
                >
                    <Store className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 ">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {frameworks.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm cursor-pointer"
                                >
                                    <Store className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            currentStore?.value === store.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                className="cursor-pointer"
                                onSelect={() => {
                                    setOpen(false);
                                    onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
