'use client';

import React from 'react';

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Billboard } from '@prisma/client';

const formSchema = z.object({
    name: z.string().min(2, { message: 'write at least two characters. ' }),
    billboard: z.string({
        required_error: 'Please select billboard.',
    }),
});

interface CategoryAddFormProps {
    storeId: string;
    billboards: Billboard[];
}

const CategoryAddForm = ({ storeId, billboards }: CategoryAddFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            billboard: '',
        },
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await axios.post(`/api/stores/${storeId}/categories`, values);

            toast.success('Success add');

            router.refresh();
            router.push(`/${storeId}/categories`);
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
                    <div className="flex space-x-4 justify-start items-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-72" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-72">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {billboards.map((b) => (
                                                    <SelectItem
                                                        key={b.id}
                                                        value={b.id}
                                                    >
                                                        {b.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
        </>
    );
};

export default CategoryAddForm;
