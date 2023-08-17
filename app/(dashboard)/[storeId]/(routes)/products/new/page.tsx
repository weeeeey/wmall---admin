import { redirect } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import client from '@/lib/prismadb';
import ProductAddForm from './components/product-add-form';

const AddCategory = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const store = await client.store.findFirst({
        where: {
            id: storeId,
        },
        include: {
            colors: true,
            sizes: true,
            categories: true,
        },
    });
    if (!store) {
        redirect('/');
    }
    return (
        <div className="flex  flex-col space-y-4 px-8 py-6">
            <Heading title="Create product" description="Add a new product" />
            <Separator />
            <ProductAddForm storeId={storeId} store={store} />
        </div>
    );
};

export default AddCategory;
