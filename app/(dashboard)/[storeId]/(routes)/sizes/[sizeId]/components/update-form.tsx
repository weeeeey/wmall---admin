'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as z from 'zod';
import { Size } from '@prisma/client';

const formSchema = z.object({
    name: z.string().min(1, { message: 'write at least 1 characters. ' }),
    value: z
        .string()
        .min(1, { message: 'String must contain at least 1 character(s)' }),
});

interface UpdateSizeProps {
    size: Size;
    storeId: string;
}

const UpdateSizeForm = ({ size, storeId }: UpdateSizeProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: size.name,
            value: size.value,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await axios.patch(
                `/api/stores/${storeId}/sizes/${size.id}`,
                values
            );

            toast.success('Success add');
            router.refresh();
            router.push(`/${storeId}/sizes`);
        } catch (error) {
            toast.error('Someting went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="flex justify-start items-center space-x-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="size name"
                                            className="w-96"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-center space-x-4">
                                            <Input
                                                {...field}
                                                placeholder="size value"
                                                className="w-96"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        Update
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default UpdateSizeForm;
