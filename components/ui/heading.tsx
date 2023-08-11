import { LucideIcon } from 'lucide-react';
import React from 'react';

interface HeadingProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    action: () => void;
}

const Heading = ({ title, action, icon: Icon, description }: HeadingProps) => {
    return (
        <div className="flex justify-between items-center pb-4 border-b-[1px] ">
            <div className="flex flex-col space-y-1">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Icon className="h-9 w-9 rounded-lg text-white bg-[#EF4444] p-2" />
        </div>
    );
};

export default Heading;
