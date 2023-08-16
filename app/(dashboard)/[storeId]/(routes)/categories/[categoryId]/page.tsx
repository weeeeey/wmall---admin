import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import client from '@/lib/prismadb';
import UpdateCategoryForm from './components/update-form';

const UpdateSizePage = async ({
    params,
}: {
    params: { storeId: string; categoryId: string };
}) => {
    const { storeId, categoryId } = params;
    if (!storeId) {
        redirect('/');
    }
    const category = await client.category.findFirst({
        where: {
            id: categoryId,
            storeId,
        },
        include: {
            billboard: true,
        },
    });
    const billboards = await client.billboard.findMany({
        where: {
            storeId,
        },
    });
    if (!category || !billboards) {
        toast.error('It is a invalid data');
        redirect(`/${storeId}/categories`);
    }

    return (
        <div className="flex flex-col space-y-4 px-8 py-6">
            <Heading title="Edit category" description="Edit a category" />
            <Separator />
            <UpdateCategoryForm
                storeId={storeId}
                category={category}
                billboards={billboards}
            />
        </div>
    );
};

export default UpdateSizePage;
