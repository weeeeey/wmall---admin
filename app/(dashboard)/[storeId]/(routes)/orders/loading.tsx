import Loader from '@/components/ui/loader';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Loader />
        </div>
    );
};

export default Loading;
