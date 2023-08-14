import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        sizeId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
        const body = await req.json();
        const { name, value } = body;
        const { sizeId, storeId } = params;
        if (name.legnth === 0 || value.legnth === 0) {
            return new NextResponse('Invalid data', { status: 401 });
        }
        if (!sizeId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const updatedSize = await client.size.update({
            where: {
                storeId,
                id: sizeId,
            },
            data: {
                name,
                value,
            },
        });

        return NextResponse.json(updatedSize);
    } catch (error) {
        console.log('[SIZES_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { sizeId, storeId } = params;
        if (!sizeId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const deletedSize = await client.size.delete({
            where: {
                id: sizeId,
                storeId,
            },
        });
        return NextResponse.json(deletedSize);
    } catch (error) {
        console.log('[SIZES_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
