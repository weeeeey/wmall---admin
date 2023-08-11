import Heading from '@/components/ui/heading';

import { Trash } from 'lucide-react';
import client from '@/lib/prismadb';
import SettingsForm from './components/settings-form';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

interface IParams {
    params: {
        storeId: string;
    };
}

const SettingsPage = async ({ params }: IParams) => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const store = await client.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    if (!store) {
        redirect('/');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialStore={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
