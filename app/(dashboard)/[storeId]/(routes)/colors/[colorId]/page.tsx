import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import client from '@/lib/prismadb';
import UpdateColorForm from './components/update-form';

const UpdateColorPage = async ({
    params,
}: {
    params: { storeId: string; colorId: string };
}) => {
    const { storeId, colorId } = params;
    if (!storeId) {
        redirect('/');
    }
    const color = await client.color.findFirst({
        where: {
            id: colorId,
            storeId,
        },
    });
    if (!color) {
        toast.error('It is a invalid color');
        redirect(`/${storeId}/colors`);
    }

    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Edit color" description="Edit a color" />
            <Separator />
            <UpdateColorForm storeId={storeId} color={color} />
        </div>
    );
};

export default UpdateColorPage;
