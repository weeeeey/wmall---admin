import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        categoryId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
        const body = await req.json();
        const { label, imageUrl } = body;
        const { categoryId, storeId } = params;
        if (label.legnth === 0 || imageUrl.legnth === 0) {
            return new NextResponse('Invalid data', { status: 401 });
        }
        if (!categoryId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const updatedBliibaords = await client.billboard.update({
            where: {
                storeId,
                id: categoryId,
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
        const { categoryId, storeId } = params;
        if (!categoryId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const deletedCategory = await client.category.delete({
            where: {
                id: categoryId,
                storeId,
            },
        });
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log('[CATEGORY_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}