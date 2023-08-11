'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import client from '@/lib/prismadb';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsForm {
    initialStore: Store;
}

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Write a name you wanna change' })
        .max(50),
});

const SettingsForm = ({ initialStore }: SettingsForm) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialStore.name,
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const res = await axios.patch(
                `/api/stores/${initialStore.id}`,
                values
            );
            toast.success('Store Update');
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 pt-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-sm">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="h-10 w-[293px] "
                                    placeholder={field.name}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    Save changes
                </Button>
            </form>
        </Form>
    );
};

export default SettingsForm;
