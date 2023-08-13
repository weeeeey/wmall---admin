'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { Button } from './button';

import { useEffect, useState } from 'react';
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
    disabled?: boolean;
    value: string[];
    onChange: (url: string) => void;
    onRemove: (url: string) => void;
}

const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value,
}: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (res: any) => {
        onChange(res.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="fvnz4v1k">
                {({ open }) => {
                    function handleClick(e: React.MouseEvent) {
                        open();
                    }
                    return (
                        <Button
                            disabled={disabled}
                            type="button"
                            variant="secondary"
                            onClick={handleClick}
                        >
                            <ImagePlus className="w-4 h-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
