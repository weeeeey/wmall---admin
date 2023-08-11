import Heading from '@/components/ui/heading';
import React from 'react';

import { Trash } from 'lucide-react';
import client from '@/lib/prismadb';
import SettingsForm from './components/settings-form';

interface IParams {
    params: {
        storeId: string;
    };
}

const SettingsPage = async ({ params }: IParams) => {
    const store = await client.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    if (!store) {
        return <></>;
    }

    return (
        <div className="p-8 pt-6">
            <Heading
                icon={Trash}
                title="Store settings"
                description="Manage store preferences"
                action={() => {}}
            />
            <SettingsForm initialStore={store} />
        </div>
    );
};

export default SettingsPage;
