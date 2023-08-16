import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import UpdateBillboardForm from './components/update-form';
import client from '@/lib/prismadb';

const UpdateBillboardPage = async ({
    params,
}: {
    params: { storeId: string; billboardId: string };
}) => {
    const { storeId, billboardId } = params;
    if (!storeId) {
        redirect('/');
    }
    const billboard = await client.billboard.findFirst({
        where: {
            id: billboardId,
            storeId,
        },
    });
    if (!billboard) {
        toast.error('It is a invalid billboards');
        redirect(`/${storeId}/billboards`);
    }

    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Edit billboard" description="Edit a billboard" />
            <Separator />
            <UpdateBillboardForm storeId={storeId} billboard={billboard} />
        </div>
    );
};

export default UpdateBillboardPage;
