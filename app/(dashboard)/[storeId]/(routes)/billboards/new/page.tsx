'use client';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as z from 'zod';
import { ImagePlus } from 'lucide-react';

const formSchema = z.object({
    label: z.string().min(2, { message: 'write at least two characters. ' }),
    imageUrl: z.string().min(1, { message: 'upload a image' }),
});

const AddBillboards = ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: '',
            imageUrl: '',
        },
    });
    const [loading, setLoading] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await axios.post(`/api/stores/${storeId}/billboards`, values);

            toast.success('Success add');
            redirect(`/${storeId}/billboards`);
        } catch (error) {
            toast.error('Someting went wrong');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col space-y-4 px-6 py-8">
            <Heading
                title="Create billboards"
                description="Add a new billboard"
            />
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel>Background Image</FormLabel>
                                <FormControl className="flex space-x-4">
                                    <Button
                                        size="sm"
                                        disabled={loading}
                                        {...field}
                                        className="text-black bg-muted flex items-center justify-center"
                                    >
                                        <ImagePlus className="w-4 h-4" />
                                        <p>Upload an Image</p>
                                    </Button>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Billboard label"
                                        className="w-72"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    );
};

export default AddBillboards;
