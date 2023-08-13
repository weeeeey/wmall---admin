import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        billboardId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
        const body = await req.json();
        const { label, imageUrl } = body;
        const { billboardId, storeId } = params;
        if (label.legnth === 0 || imageUrl.legnth === 0) {
            return new NextResponse('Invalid data', { status: 401 });
        }
        if (!billboardId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const updatedBliibaords = await client.billboard.update({
            where: {
                storeId,
                id: billboardId,
            },
            data: {
                label,
                imageUrl,
            },
        });

        return NextResponse.json(updatedBliibaords);
    } catch (error) {
        console.log('[BILLBOARDS_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { billboardId, storeId } = params;
        console.log(billboardId);
        if (!billboardId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const deletedBillboards = await client.billboard.delete({
            where: {
                id: billboardId,
                storeId,
            },
        });
        return NextResponse.json(deletedBillboards);
    } catch (error) {
        console.log('[BILLBOARDS_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
