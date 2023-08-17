import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import client from '@/lib/prismadb';
import UpdateProductForm from './components/update-form';

const UpdateSizePage = async ({
    params,
}: {
    params: { storeId: string; productId: string };
}) => {
    const { storeId, productId } = params;
    if (!storeId) {
        redirect('/');
    }
    const product = await client.product.findFirst({
        where: {
            id: productId,
            storeId,
        },
        include: {
            color: true,
            category: true,
            images: true,
            size: true,
        },
    });
    const store = await client.store.findFirst({
        where: {
            id: storeId,
        },
        include: {
            colors: {
                select: {
                    id: true,
                    name: true,
                    value: true,
                },
            },
            sizes: {
                select: {
                    id: true,
                    name: true,
                },
            },
            categories: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!product || !store) {
        toast.error('it is a invalid product ');
        redirect(`${storeId}/products`);
    }

    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Edit product" description="Edit a product" />
            <Separator />
            <UpdateProductForm
                storeId={storeId}
                product={product}
                store={store}
            />
        </div>
    );
};

export default UpdateSizePage;
