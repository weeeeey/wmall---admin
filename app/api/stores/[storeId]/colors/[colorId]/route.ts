import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        colorId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
        const body = await req.json();
        const { name, value } = body;
        const { colorId, storeId } = params;
        if (name.legnth === 0 || value.legnth === 0) {
            return new NextResponse('Invalid data', { status: 401 });
        }
        if (!colorId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const updatedColor = await client.color.update({
            where: {
                storeId,
                id: colorId,
            },
            data: {
                name,
                value,
            },
        });

        return NextResponse.json(updatedColor);
    } catch (error) {
        console.log('[COLOR_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { colorId, storeId } = params;
        if (!colorId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const deletedColor = await client.color.delete({
            where: {
                id: colorId,
                storeId,
            },
        });
        return NextResponse.json(deletedColor);
    } catch (error) {
        console.log('[COLORS_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
