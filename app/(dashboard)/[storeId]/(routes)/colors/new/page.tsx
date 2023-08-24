'use client';

import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
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

const formSchema = z.object({
    name: z.string().min(1, { message: 'write at least two characters. ' }),
    value: z
        .string()
        .min(4, { message: 'String must contain at least 4 character(s)' })
        .regex(/^#([0-9A-Fa-f]){4,}$/, {
            message: 'String must be a valid hex code',
        }),
});

const AddBillboards = ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            value: '',
        },
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await axios.post(`/api/stores/${storeId}/colors`, values);

            toast.success('Success add');
            router.refresh();
            router.push(`/${storeId}/colors`);
        } catch (error) {
            toast.error('Someting went wrong');
        } finally {
            setLoading(false);
        }
    }
    const colorValue = form.watch('value');
    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Create color" description="Add a new color" />
            <Separator />
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
                                            placeholder="Color name"
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
                                                placeholder="Color value"
                                                className="w-96"
                                            />
                                            <div
                                                className={`rounded-full w-8 h-8 border-[1px]`}
                                                style={{
                                                    backgroundColor: colorValue,
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddBillboards;
