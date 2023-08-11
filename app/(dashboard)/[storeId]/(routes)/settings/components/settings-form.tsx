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
import { useParams, useRouter } from 'next/navigation';
import { useOrigin } from '@/hooks/use-origin';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/ui/heading';
import { Trash } from 'lucide-react';
import AlertModal from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';

interface SettingsForm {
    initialStore: Store;
}

const formSchema = z.object({
    name: z.string().min(2, { message: 'Write a name least 2characters' }),
});

const SettingsForm = ({ initialStore }: SettingsForm) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            await axios.patch(`/api/stores/${initialStore.id}`, values);
            router.refresh();
            toast.success('Store updated');
        } catch (error: any) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }
    async function onDelete() {
        try {
            setIsLoading(true);
            await axios.delete(`/api/stores/${initialStore.id}`);

            router.refresh();
            router.push('/');
            toast.success('Store deleted');
        } catch (error) {
            toast.error(
                'Make sure you removed all products and categories first.'
            );
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                loading={isLoading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                description="This store will be deleted permanently"
            />
            <div className="flex justify-between items-center">
                <Heading
                    title="Store settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={isLoading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="ml-auto"
                        disabled={isLoading}
                    >
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                description={`${origin}/api/${params.storeId}`}
                title="NEXT_PUBLIC_API_URL"
                variant="public"
            />
        </>
    );
};

export default SettingsForm;
