import React from 'react';
import Heading from './heading';
import { Separator } from './separator';
import { ApiAlert } from './api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { redirect, useParams } from 'next/navigation';

// entityName="billboards" entityIdName="billboardId"
interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

const ApiList = ({ entityIdName, entityName }: ApiListProps) => {
    const origin = useOrigin();
    const params = useParams();
    const { storeId } = params;
    if (!storeId) {
        redirect('/');
    }
    return (
        <div className="flex flex-col space-y-4">
            <Heading title="API" description="API Calls for Billboards" />
            <Separator />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${origin}/api/${storeId}/${entityName}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${origin}/api/${storeId}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${origin}/api/${storeId}/${entityName}`}
            />
            <ApiAlert
                title="PATCH"
                variant="admin"
                description={`${origin}/api/${storeId}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${origin}/api/${storeId}/${entityName}/{${entityIdName}}`}
            />
        </div>
    );
};

export default ApiList;
