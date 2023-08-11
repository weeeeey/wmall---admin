import { Copy } from 'lucide-react';
import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
    title: string;
    variant: 'public' | 'admin';
    description: string;
}

const ApiAlert = ({ description, title, variant }: ApiAlertProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleCopy = () => {
        toast.success('API Route copied to clipboard.');
    };

    return (
        <div className="border-[1px] p-4 pl-11 relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 absolute top-4 left-4"
            >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                <line x1="6" x2="6.01" y1="6" y2="6"></line>
                <line x1="6" x2="6.01" y1="18" y2="18"></line>
            </svg>
            <div className="flex items-center gap-x-2 mb-1">
                <h5 className="font-semibold">{title}</h5>
                <p>{variant}</p>
            </div>
            <div className="flex  items-center justify-between">
                <div className="bg-muted-foreground rounded-lg p-1 font-semibold text-sm ">
                    {description}
                </div>
                <CopyToClipboard text={description} onCopy={handleCopy}>
                    <Copy className="h-10 w-10 border-[1px] px-3 py-2  rounded-lg hover:bg-black/10 hover:ring-1 cursor-pointer" />
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default ApiAlert;
// return (
// <div>
//     <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//     />
//     <CopyToClipboard text={inputValue} onCopy={handleCopy}>
//         <Copy />
//     </CopyToClipboard>
// </div>
// );
