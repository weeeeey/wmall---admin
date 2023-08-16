import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import client from '@/lib/prismadb';
import UpdateSizeForm from './components/update-form';

const UpdateSizePage = async ({
    params,
}: {
    params: { storeId: string; sizeId: string };
}) => {
    const { storeId, sizeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const size = await client.size.findFirst({
        where: {
            id: sizeId,
            storeId,
        },
    });
    if (!size) {
        toast.error('It is a invalid size');
        redirect(`/${storeId}/sizes`);
    }

    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Edit size" description="Edit a size" />
            <Separator />
            <UpdateSizeForm storeId={storeId} size={size} />
        </div>
    );
};

export default UpdateSizePage;
