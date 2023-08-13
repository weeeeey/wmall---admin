import { redirect } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CategoryAddForm from './components/category-add-form';
import client from '@/lib/prismadb';

const AddCategory = async ({ params }: { params: { storeId: string } }) => {
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    const billboards = await client.billboard.findMany({
        where: {
            storeId,
        },
    });

    return (
        <div className="flex  flex-col space-y-4 px-8 py-6">
            <Heading title="Create category" description="Add a new category" />
            <Separator />
            <CategoryAddForm storeId={storeId} billboards={billboards} />
        </div>
    );
};

export default AddCategory;
